import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, Subject } from "rxjs";
import { filter, switchMap, takeUntil } from "rxjs/operators";
import { AuthSandbox } from "../auth.sandbox";

@Component({
	selector: "app-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
	forgetPassword$: Observable<object>;
	forgetPasswordError$: Observable<object>;
	slug: string | null;
	confirmPassword: object;
	forgetResponse: object;
	forgetPasswordRequestPayload: object | null;
	public redirectUrl: string | null;
	dailyObjects: object;
	destroy$: Subject<boolean>;

	public showSpinner: boolean;
	constructor(
		private authSandbox: AuthSandbox,
		public fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar
	) {
		this.confirmPassword = {
			confirmPassword: "",
		};
		this.dailyObjects = {
			password: "",
		};
		this.forgetResponse = {};
		this.forgetPasswordRequestPayload = {};
		this.slug = "";
		this.forgetPassword$ = this.authSandbox.forgetPassword$;
		this.forgetPasswordError$ = this.authSandbox.forgetPasswordError$;
		this.showSpinner = false;
		this.redirectUrl = "";
		this.destroy$ = new Subject();
	}

	ngOnInit() {
		this.forgetPassword$
			.pipe(
				filter(value => typeof value !== "undefined"),
				takeUntil(this.destroy$)
			)
			.subscribe(valueResponse => {
				this.forgetResponse = valueResponse;
				if (this.forgetResponse["success"] === true) {
					this.showSnackbar("Your password is successfully reset");
				} else if (this.forgetResponse["success"] === false) {
					this.showSnackbar(this.forgetResponse["message"]);
				}
			});
	}
	resetPassword() {
		this.slug = this.route.snapshot.paramMap.get("token");

		const routeParam$ = this.route.paramMap.pipe(
			switchMap(param => {
				return of(param.get("token"));
			})
		);

		routeParam$.subscribe(value => {
			this.forgetPasswordRequestPayload = {
				token: value,
				dailyObjects: {
					dailyObjects: this.dailyObjects,
				},
			};

			if (this.forgetPasswordRequestPayload !== null)
				if (
					this.dailyObjects["password"] !==
					this.confirmPassword["confirmPassword"]
				) {
					this.showSnackbar(
						"Your password and confirmation password do not match"
					);
				} else if (
					this.dailyObjects["password"] ===
					this.confirmPassword["confirmPassword"]
				) {
					this.authSandbox.forgetPassword(this.forgetPasswordRequestPayload);
				}
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
	private showSnackbar(message: string) {
		this.snackBar.open(message, "Clear", {
			panelClass: "forgot-password",
			duration: 2000,
		});
	}
	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
