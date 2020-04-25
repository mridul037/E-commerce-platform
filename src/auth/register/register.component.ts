import {
	Component,
	ElementRef,
	NgZone,
	OnInit,
	ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, timer } from "rxjs";
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	first,
	map,
	switchMap,
	take,
} from "rxjs/operators";
import { LogsService } from "../../core/kb-logs/kibana-logs.service";
import { GlobalVars } from "../../global.vars";
import {
	AuthMessageResponseType,
	ErrorField,
	FacebookLoginStatus,
	OAuth,
	RequestType,
	socialQueryParamType,
} from "../auth.enum";
import { AuthSandbox } from "../auth.sandbox";
import { LoaderService } from "../../core/loader.service";

const THOUSAND_MILLISECONDS = 1000;
const TIMEOUT_SECONDS = 7;
let timeoutRef = 0;

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
	@ViewChild("MobileNumberErrorField") mobileNumber: ElementRef;
	@ViewChild("OTPErrorField") otp: ElementRef;
	@ViewChild("EmailErrorField") email: ElementRef;
	@ViewChild("defaultErrorField") default: ElementRef;

	public showOTPField: boolean;
	public showSpinner: boolean;
	public showGetOTPSpinner: boolean;
	public hideGetOtpButton: boolean;
	public isOTPVerified: boolean;
	public showRegisterForm: boolean;
	public invalidOTP: boolean;
	public hideOauthOptions: boolean;

	public tempToken: string;
	public redirectUrl: string | null;
	public errorMessage: string;

	public mobileOTPForm: FormGroup;
	public registerForm: FormGroup;

	public resendOtpCountDown$: Observable<number>;
	public otpSuccess$: Observable<object>;
	public otpFailedError$: Observable<object>;
	public otpVerifiedToken$: Observable<string>;
	public verifyOtpFailedResponse$: Observable<object>;
	public registeredUserToken$: Observable<string>;
	public registerFailedError$: Observable<object>;
	public socialLoginResponse$: Observable<object>;
	public socialLoginToken$: Observable<string>;

	constructor(
		public fb: FormBuilder,
		private authSandbox: AuthSandbox,
		private router: Router,
		private snackBar: MatSnackBar,
		private ngZone: NgZone,
		public route: ActivatedRoute,
		public el: ElementRef,
		public logService: LogsService,
		public loaderService: LoaderService
	) {
		this.showOTPField = false;
		this.showSpinner = false;
		this.showGetOTPSpinner = false;
		this.hideGetOtpButton = false;
		this.isOTPVerified = false;
		this.showRegisterForm = false;
		this.invalidOTP = false;
		this.hideOauthOptions = false;

		this.tempToken = "";
		this.redirectUrl = "";
		this.errorMessage = "";

		this.mobileOTPForm = this.fb.group({
			mobile: ["", [Validators.required]],
			firstOTPDigit: ["", [Validators.required, Validators.maxLength(1)]],
			secondOTPDigit: ["", [Validators.required, Validators.maxLength(1)]],
			thirdOTPDigit: ["", [Validators.required, Validators.maxLength(1)]],
			fourthOTPDigit: ["", [Validators.required, Validators.maxLength(1)]],
		});
		this.registerForm = this.fb.group({
			email: ["", [Validators.required]],
			gender: ["", [Validators.required]],
		});

		this.otp = this.el.nativeElement;
		this.mobileNumber = this.el.nativeElement;
		this.email = this.el.nativeElement;
		this.default = this.el.nativeElement;

		this.resendOtpCountDown$ = of();
		this.otpSuccess$ = this.authSandbox.getOtpSuccess$;
		this.otpFailedError$ = this.authSandbox.getOTPFailError$;
		this.otpVerifiedToken$ = this.authSandbox.getOTPVerifiedToken$;
		this.verifyOtpFailedResponse$ = this.authSandbox.getVerifyOTPFailError$;
		this.registeredUserToken$ = this.authSandbox.getRegisteredUserToken$;
		this.registerFailedError$ = this.authSandbox.getRegisterFailError$;
		this.socialLoginResponse$ = this.authSandbox.getSocialLoginSuccessResponse$;
		this.socialLoginToken$ = this.authSandbox.getSocialLoginToken$;
	}

	ngOnInit() {
		this.redirectUrl = this.route.snapshot.queryParamMap.get("r");
		this.loaderService.hide();
		this.checkIsSocialLoginActive();
	}

	private checkIsSocialLoginActive() {
		const queryType = this.route.snapshot.queryParamMap.get("t");
		if (
			queryType !== null &&
			(queryType === socialQueryParamType.SOCIAL_FACEBOOK ||
				queryType === socialQueryParamType.SOCIAL_GOOGLE)
		) {
			this.hideOauthOptions = true;
		}
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
		if (this.mobileOTPForm.value.firstOTPDigit !== null) {
			return this.mobileOTPForm.value.firstOTPDigit
				.toString()
				.concat(
					this.mobileOTPForm.value.secondOTPDigit,
					this.mobileOTPForm.value.thirdOTPDigit,
					this.mobileOTPForm.value.fourthOTPDigit
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
		if (!error["display"]) {
			return;
		}

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
			case ErrorField.EMAIL: {
				this.email.nativeElement.innerHTML = error["message"];
				elem = this.otp;

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
				this.hideGetOtpButton = true;
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
			case AuthMessageResponseType.EMAIL_ALREADY_IN_USE:
			case AuthMessageResponseType.NUMBER_ALREADY_IN_USE:
			case AuthMessageResponseType.UNAUTHORIZED_USER: {
				this.setErrorMessage(error);
				break;
			}
			default: {
				this.setErrorMessage(error);
				this.logService.debugLog(
					"error",
					`[Register-${logType}] ${JSON.stringify(error)}`
				);
				break;
			}
		}
	}

	private verifyOTP(otp: string) {
		this.showSpinner = true;
		this.authSandbox.resetVerifyOTPState();

		const queryType = this.route.snapshot.queryParamMap.get("t");
		const queryMid = this.route.snapshot.queryParamMap.get("mid");
		this.authSandbox.verifyOTP({
			mobileNumber: this.mobileOTPForm.controls.mobile.value,
			otp: otp,
			type:
				queryType !== null &&
				(queryType === socialQueryParamType.SOCIAL_FACEBOOK ||
					queryType === socialQueryParamType.SOCIAL_GOOGLE)
					? RequestType.SOCIAL_LOGIN
					: RequestType.REGISTER,
			...(queryMid !== null && { _id: queryMid }),
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
				const queryParam = this.route.snapshot.queryParamMap.get("t");
				let logType;
				if (queryParam !== null) {
					logType = `Verify-OTP-${queryParam}`;
				} else {
					logType = `Verify-OTP`;
				}
				this.throwError(err, logType);
			});

		this.otpVerifiedToken$
			.pipe(
				filter(response => typeof response !== "undefined" && response !== ""),
				debounceTime(THOUSAND_MILLISECONDS),
				distinctUntilChanged(),
				first()
			)
			.subscribe(response => {
				if (
					typeof response["type"] !== "undefined" &&
					response["type"] === RequestType.SOCIAL_LOGIN
				) {
					this.showSpinner = false;
					localStorage.setItem(
						GlobalVars.storageKeys.DO_TOKEN,
						response["token"]
					);
					this.authSandbox.setCurrentUser();
					this.authSandbox.resetCartState();
					this.showSnackbar("Logged In Successfully");
					this.redirectToReferrer();
				} else {
					this.invalidOTP = false;
					this.showSpinner = false;
					this.isOTPVerified = true;
					this.mobileOTPForm.controls.firstOTPDigit.disable();
					this.mobileOTPForm.controls.secondOTPDigit.disable();
					this.mobileOTPForm.controls.thirdOTPDigit.disable();
					this.mobileOTPForm.controls.fourthOTPDigit.disable();
					this.tempToken = response;
				}
			});
	}

	getOTP() {
		if (
			this.mobileOTPForm.controls.mobile.valid ||
			this.mobileOTPForm.controls.mobile.disabled
		) {
			const queryType = this.route.snapshot.queryParamMap.get("t");
			const queryMid = this.route.snapshot.queryParamMap.get("mid");
			const getOTPPayload = {
				mobileNumber: this.mobileOTPForm.controls.mobile.value,
				type:
					queryType !== null &&
					(queryType === socialQueryParamType.SOCIAL_FACEBOOK ||
						queryType === socialQueryParamType.SOCIAL_GOOGLE)
						? RequestType.SOCIAL_LOGIN
						: RequestType.REGISTER,
				...(queryMid !== null && { _id: queryMid }),
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
					const queryParam = this.route.snapshot.queryParamMap.get("t");
					let logType;
					if (queryParam !== null) {
						logType = `Send-OTP-${queryParam}`;
					} else {
						logType = `Send-OTP`;
					}
					this.throwError(err, logType);
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
					this.mobileOTPForm.controls.mobile.disable();
					this.hideOauthOptions = true;
					this.showSpinner = false;
					this.showGetOTPSpinner = false;
					this.showOTPField = true;
					this.hideGetOtpButton = true;
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

	register() {
		if (this.registerForm.valid) {
			this.showSpinner = true;
			const registerPayload = {
				mobileNumber: this.mobileOTPForm.controls.mobile.value,
				email: this.registerForm.controls.email.value,
				gender: this.registerForm.controls.gender.value,
				tempToken: this.tempToken,
			};

			this.authSandbox.resetRegisterState();
			this.authSandbox.register(registerPayload);

			this.registerFailedError$
				.pipe(
					filter(err => typeof err !== "undefined"),
					debounceTime(THOUSAND_MILLISECONDS),
					distinctUntilChanged(),
					first()
				)
				.subscribe(err => {
					this.showSpinner = false;
					this.throwError(err, "Info");
				});

			this.registeredUserToken$
				.pipe(
					filter(token => typeof token !== "undefined"),
					debounceTime(THOUSAND_MILLISECONDS),
					distinctUntilChanged(),
					first()
				)
				.subscribe(token => {
					this.showSpinner = false;
					localStorage.setItem(GlobalVars.storageKeys.DO_TOKEN, token);
					this.authSandbox.setCurrentUser();
					this.authSandbox.resetCartState();
					this.redirectToReferrer();
				});
		} else {
			if (this.registerForm.controls.email.value === "") {
				this.registerForm.controls.email.markAsTouched();
			} else {
				this.registerForm.controls.gender.markAsTouched();
			}
		}
	}

	private facebookLogin(response: object) {
		// Logged into your app and Facebook.
		const token = response["authResponse"]["accessToken"];
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
							} else {
								this.logService.debugLog(
									"error",
									`Facebook Login Status : ${response["status"]}`
								);
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
						this.hideOauthOptions = true;
						this.router.navigate(["auth", "register"], {
							queryParams: {
								t: `social-${socialLoginResponse["type"]}`,
								mid: socialLoginResponse["mongoId"],
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

	goToLogin() {
		if (this.redirectUrl !== null) {
			this.router.navigate(["", "auth", "login"], {
				queryParams: {
					r: this.redirectUrl,
				},
			});
		} else {
			this.router.navigate(["", "auth", "login"]);
		}
	}
}
