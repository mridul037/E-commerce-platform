import {
	Component,
	OnInit,
	NgZone,
	ElementRef,
	ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthSandbox } from "../auth.sandbox";
import {
	RequestType,
	AuthMessageResponseType,
	OAuth,
	FacebookLoginStatus,
	ErrorField,
} from "../auth.enum";
import { Observable, of, timer } from "rxjs";
import {
	debounceTime,
	filter,
	first,
	distinctUntilChanged,
	map,
	take,
	switchMap,
} from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalVars } from "../../global.vars";
import { MatSnackBar } from "@angular/material";
import { LogsService } from "../../core/kb-logs/kibana-logs.service";
import { LoaderService } from "../../core/loader.service";

const THOUSAND_MILLISECONDS = 1000;
const TIMEOUT_SECONDS = 7;
let timeoutRef = 0;

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	@ViewChild("MobileNumberErrorField") mobileNumber: ElementRef;
	@ViewChild("OTPErrorField") otp: ElementRef;
	@ViewChild("defaultErrorField") default: ElementRef;

	public showOTPField: boolean;
	public showSpinner: boolean;
	public isOTPVerified: boolean;
	public showGetOTPSpinner: boolean;
	public invalidOTP: boolean;
	public hideOauthOptions: boolean;

	public token: string;
	public redirectUrl: string | null;
	public errorMessage: string;

	public mobileOTPForm: FormGroup;
	public otpInputForm: FormGroup;

	public resendOtpCountDown$: Observable<number>;
	public otpSuccess$: Observable<object>;
	public otpFailedError$: Observable<object>;
	public otpVerifiedToken$: Observable<string>;
	public verifyOtpFailedResponse$: Observable<object>;
	public socialLoginResponse$: Observable<object>;
	public socialLoginToken$: Observable<string>;

	constructor(
		public fb: FormBuilder,
		private authSandbox: AuthSandbox,
		private router: Router,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		private ngZone: NgZone,
		public el: ElementRef,
		public logService: LogsService,
		private loaderService: LoaderService
	) {
		this.showSpinner = false;
		this.showOTPField = false;
		this.isOTPVerified = false;
		this.showGetOTPSpinner = false;
		this.invalidOTP = false;
		this.hideOauthOptions = false;

		this.token = "";
		this.redirectUrl = "";
		this.errorMessage = "";

		this.mobileOTPForm = this.fb.group({
			mobile: ["", [Validators.required]],
		});
		this.otpInputForm = this.fb.group({
			firstOTPDigit: ["", [Validators.required, Validators.maxLength(1)]],
			secondOTPDigit: ["", [Validators.required, Validators.maxLength(1)]],
			thirdOTPDigit: ["", [Validators.required, Validators.maxLength(1)]],
			fourthOTPDigit: ["", [Validators.required, Validators.maxLength(1)]],
		});

		this.otp = this.el.nativeElement;
		this.mobileNumber = this.el.nativeElement;
		this.default = this.el.nativeElement;

		this.resendOtpCountDown$ = of();
		this.otpSuccess$ = this.authSandbox.getOtpSuccess$;
		this.otpFailedError$ = this.authSandbox.getOTPFailError$;
		this.otpVerifiedToken$ = this.authSandbox.getOTPVerifiedToken$;
		this.verifyOtpFailedResponse$ = this.authSandbox.getVerifyOTPFailError$;
		this.socialLoginResponse$ = this.authSandbox.getSocialLoginSuccessResponse$;
		this.socialLoginToken$ = this.authSandbox.getSocialLoginToken$;
	}

	ngOnInit() {
		this.redirectUrl = this.route.snapshot.queryParamMap.get("r");
		this.loaderService.hide();
	}

	private resendOtpTimer(endTimeout: Date) {
		const endTime = Math.floor(
			new Date(endTimeout).getTime() / THOUSAND_MILLISECONDS
		);
		const presentTime = Math.floor(
			new Date().getTime() / THOUSAND_MILLISECONDS
		);

		const timeGap = endTime - presentTime > 0 ? endTime - presentTime : 0;

		this.resendOtpCountDown$ = timer(0, THOUSAND_MILLISECONDS).pipe(
			map(second => timeGap - second),
			take(timeGap + 1)
		);
	}

	private combineOTPDigits(): string {
		if (this.otpInputForm.value.firstOTPDigit !== null) {
			return this.otpInputForm.value.firstOTPDigit
				.toString()
				.concat(
					this.otpInputForm.value.secondOTPDigit,
					this.otpInputForm.value.thirdOTPDigit,
					this.otpInputForm.value.fourthOTPDigit
				);
		} else {
			return "";
		}
	}

	private redirectToReferrer() {
		if (this.redirectUrl !== null) {
			this.router.navigate([this.redirectUrl]);
		} else {
			this.router.navigate([""]);
		}
	}

	private showSnackbar(message: string) {
		this.snackBar.open(message, "Clear", {
			duration: 2000,
		});
	}

	private setErrorMessage(error: object) {
		window.clearTimeout(timeoutRef);
		let elem: ElementRef;
		switch (error["field"]) {
			case ErrorField.OTP: {
				this.otp.nativeElement.innerHTML = error["message"];
				elem = this.otp;
				break;
			}
			case ErrorField.MOBILE_NUMBER: {
				this.mobileNumber.nativeElement.innerHTML = error["message"];
				elem = this.mobileNumber;
				break;
			}
			case ErrorField.DEFAULT:
			default: {
				this.default.nativeElement.innerHTML = error["message"];
				elem = this.default;
			}
		}

		timeoutRef = window.setTimeout(() => {
			elem.nativeElement.innerHTML = "";
		}, TIMEOUT_SECONDS * THOUSAND_MILLISECONDS);
	}

	private throwError(error: object, logType: string) {
		switch (error["type"]) {
			case AuthMessageResponseType.ALREADY_SENT: {
				this.setErrorMessage(error);
				this.showOTPField = true;
				this.mobileOTPForm.controls.mobile.disable();
				break;
			}
			case AuthMessageResponseType.INVALID_OTP: {
				this.setErrorMessage(error);
				this.showOTPField = true;
				this.invalidOTP = true;
				break;
			}
			case AuthMessageResponseType.INCORRECT_NUMBER:
			case AuthMessageResponseType.UNREGISTERED_USER:
			case AuthMessageResponseType.EXCEEDED_LIMIT:
			case AuthMessageResponseType.ALREADY_REGISTERED:
			case AuthMessageResponseType.UNAUTHORIZED_USER: {
				this.setErrorMessage(error);
				break;
			}
			default: {
				this.setErrorMessage(error);
				this.logService.debugLog(
					"error",
					`[Login-${logType}] ${JSON.stringify(error)}`
				);
				break;
			}
		}
	}

	private verifyOTP(otp: string) {
		this.showSpinner = true;

		this.authSandbox.resetVerifyOTPState();
		this.authSandbox.verifyOTP({
			mobileNumber: this.mobileOTPForm.controls.mobile.value,
			otp: otp,
			type: RequestType.LOGIN,
		});

		this.verifyOtpFailedResponse$
			.pipe(
				filter(err => typeof err !== "undefined"),
				debounceTime(THOUSAND_MILLISECONDS),
				distinctUntilChanged(),
				switchMap(err =>
					this.otpSuccess$.pipe(
						map(response => {
							return {
								...err,
								endTimeout: response["OTPEndTime"],
							};
						}),
						first()
					)
				),
				first()
			)
			.subscribe(err => {
				this.resendOtpTimer(err["endTimeout"]);
				this.showSpinner = false;
				this.throwError(err, "Verify-OTP");
			});

		this.otpVerifiedToken$
			.pipe(
				filter(token => typeof token !== "undefined" && token !== ""),
				debounceTime(THOUSAND_MILLISECONDS),
				distinctUntilChanged(),
				first()
			)
			.subscribe(token => {
				this.showSpinner = false;
				this.otpInputForm.controls.firstOTPDigit.disable();
				this.otpInputForm.controls.secondOTPDigit.disable();
				this.otpInputForm.controls.thirdOTPDigit.disable();
				this.otpInputForm.controls.fourthOTPDigit.disable();
				this.isOTPVerified = true;
				this.invalidOTP = false;
				this.token = token;
			});
	}

	getOTP() {
		if (
			this.mobileOTPForm.controls.mobile.valid ||
			this.mobileOTPForm.controls.mobile.disabled
		) {
			const getOTPPayload = {
				mobileNumber: this.mobileOTPForm.controls.mobile.value,
				type: RequestType.LOGIN,
			};

			this.authSandbox.resetGetOTPFailState();
			this.authSandbox.getOTP(getOTPPayload);

			this.showSpinner = true;
			this.showGetOTPSpinner = true;

			this.otpFailedError$
				.pipe(
					filter(err => typeof err !== "undefined"),
					debounceTime(THOUSAND_MILLISECONDS),
					distinctUntilChanged(),
					first()
				)
				.subscribe(err => {
					this.resendOtpTimer(err["endTimeout"]);
					this.showSpinner = false;
					this.showGetOTPSpinner = false;
					this.throwError(err, "Send-OTP");
				});

			this.otpSuccess$
				.pipe(
					filter(
						response =>
							typeof response !== "undefined" &&
							Object.keys(response).length > 0
					),
					debounceTime(THOUSAND_MILLISECONDS),
					distinctUntilChanged(),
					first()
				)
				.subscribe(response => {
					this.hideOauthOptions = true;
					this.showSpinner = false;
					this.showGetOTPSpinner = false;
					this.showOTPField = true;
					this.mobileOTPForm.disable();
					this.resendOtpTimer(response["OTPEndTime"]);
				});
		} else {
			this.mobileOTPForm.controls.mobile.markAsTouched();
		}
	}

	OnOTPKeyUp(event: KeyboardEvent) {
		const OTP_LENGTH = 4;
		if (
			event.key !== "Backspace" &&
			event.target !== null &&
			event.target["nextElementSibling"] !== null
		) {
			event.target["nextElementSibling"].focus();
		} else if (
			event.key !== "Backspace" &&
			event.target !== null &&
			event.target["nextElementSibling"] === null
		) {
			const otp = this.combineOTPDigits();
			if (otp.length === OTP_LENGTH) {
				this.verifyOTP(otp);
			}
		}

		if (
			event.key === "Backspace" &&
			event.target !== null &&
			event.target["previousElementSibling"] !== null
		) {
			event.target["previousElementSibling"].focus();
			this.invalidOTP = false;
		}
	}

	login() {
		if (this.isOTPVerified && this.token !== "undefined" && this.token !== "") {
			localStorage.setItem(GlobalVars.storageKeys.DO_TOKEN, this.token);
			this.authSandbox.setCurrentUser();
			this.authSandbox.resetCartState();
			this.redirectToReferrer();
		}
	}

	private facebookLogin(loginResponse: object) {
		const token = loginResponse["authResponse"]["accessToken"];
		const socialLoginPayload = {
			payload: { access_token: token },
			type: OAuth.FACEBOOK,
		};
		this.authSandbox.socialLogin(socialLoginPayload);
	}

	socialLogin(oAuthType: string) {
		this.authSandbox.resetSocialAuthState();

		if (oAuthType === OAuth.FACEBOOK) {
			FB.getLoginStatus((loginStatusResponse: object) => {
				if (loginStatusResponse["status"] === FacebookLoginStatus.CONNECTED) {
					this.facebookLogin(loginStatusResponse);
				} else {
					FB.login(
						(response: object) => {
							if (response["status"] === FacebookLoginStatus.CONNECTED) {
								// Logged into your app and Facebook.
								this.facebookLogin(response);
							}
						},
						{ scope: "public_profile,email" }
					);
				}
			});
		} else {
			const googleAuth = gapi.auth2.getAuthInstance();
			googleAuth
				.grantOfflineAccess()
				.then((authResponse: object) => {
					if (authResponse["code"]) {
						const socialLoginPayload = {
							payload: {
								code: authResponse["code"],
								redirectUri:
									window.location.origin ||
									window.location.protocol + "//" + window.location.host,
							},
							type: OAuth.GOOGLE,
						};
						this.authSandbox.socialLogin(socialLoginPayload);
					}
				})
				.catch((authError: object) => {});
		}

		/**
		 * when mobile number is not registered with DailyObjects
		 * then continue registering mobile number on social login
		 */
		this.socialLoginResponse$
			.pipe(
				filter(
					(socialLoginResponse: object) =>
						typeof socialLoginResponse !== "undefined"
				),
				first()
			)
			.subscribe(socialLoginResponse => {
				if (!socialLoginResponse["registered"]) {
					this.ngZone.run(() => {
						const referrer = this.route.snapshot.queryParamMap.get("r");
						this.router.navigate(["auth", "register"], {
							queryParams: {
								t: `social-${socialLoginResponse["type"]}`,
								mid: socialLoginResponse["mongoId"],
								...(referrer !== null && { r: referrer }),
							},
						});
					});
				}
			});

		/**
		 * When mobile number is registered with Dailyobjects it
		 * sets user token in local storage after social-login
		 */
		this.socialLoginToken$
			.pipe(
				filter(userToken => typeof userToken !== "undefined"),
				first()
			)
			.subscribe(userToken => {
				localStorage.setItem(GlobalVars.storageKeys.DO_TOKEN, userToken);
				this.ngZone.run(() => {
					this.showSnackbar("Logged In Successfully");
					this.redirectToReferrer();
					this.authSandbox.resetCartState();
					this.authSandbox.setCurrentUser();
				});
			});
	}

	goToRegister() {
		if (this.redirectUrl !== null) {
			this.router.navigate(["", "auth", "register"], {
				queryParams: {
					r: this.redirectUrl,
				},
			});
		} else {
			this.router.navigate(["", "auth", "register"]);
		}
	}
}
