import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthApiClientService } from "../auth-api-client.service";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { map, switchMap, filter, catchError } from "rxjs/operators";
import * as authActions from "../store/auth.actions";

@Injectable()
export class AuthEffects {
	constructor(
		private actions$: Actions,
		public authApiClient: AuthApiClientService
	) {}

	@Effect()
	getOTP$: Observable<Action> = this.actions$.pipe(
		ofType(authActions.AuthActionTypes.GetOTP),
		map((action: authActions.GetOTPAction) => action.payload),
		switchMap(payload => {
			return this.authApiClient.getOTP(payload).pipe(
				filter(response => {
					return typeof response !== "undefined";
				}),
				map(response => {
					return new authActions.GetOTPSuccess(response);
				}),
				catchError(responseError => {
					return of(new authActions.GetOTPFail(responseError["error"]));
				})
			);
		})
	);

	@Effect()
	verifyOTP$: Observable<Action> = this.actions$.pipe(
		ofType(authActions.AuthActionTypes.VerifyOTP),
		map((action: authActions.VerifyOTPAction) => action.payload),
		switchMap(payload => {
			return this.authApiClient.verifyOTP(payload).pipe(
				filter(response => typeof response !== "undefined"),
				map(response => {
					return new authActions.VerifyOTPSuccess(response);
				}),
				catchError(responseError => {
					return of(new authActions.VerifyOTPFail(responseError["error"]));
				})
			);
		})
	);

	@Effect()
	register$: Observable<Action> = this.actions$.pipe(
		ofType(authActions.AuthActionTypes.Register),
		map((action: authActions.RegisterAction) => action.payload),
		switchMap(payload => {
			return this.authApiClient.register(payload).pipe(
				filter(response => typeof response !== "undefined"),
				map(response => {
					return new authActions.RegisterSuccess(response);
				}),
				catchError(responseError => {
					return of(new authActions.RegisterFail(responseError["error"]));
				})
			);
		})
	);

	@Effect()
	socialLogin$: Observable<Action> = this.actions$.pipe(
		ofType(authActions.AuthActionTypes.SocialLogin),
		map((action: authActions.SocialLogin) => action.payload),
		switchMap(socialLoginPayload => {
			let socialLoginResponse$;

			if (socialLoginPayload["type"] === "facebook") {
				socialLoginResponse$ = this.authApiClient.facebookLogin(
					socialLoginPayload["payload"]
				);
			} else {
				socialLoginResponse$ = this.authApiClient.googleLogin(
					socialLoginPayload["payload"]
				);
			}

			return socialLoginResponse$.pipe(
				filter(response => {
					return typeof response !== "undefined";
				}),
				map((response: object) => {
					if (
						typeof response["data"]["registered"] !== "undefined" &&
						!response["data"]["registered"]
					) {
						return new authActions.SocialLoginSuccess({
							...response["data"],
							type: socialLoginPayload["type"],
						});
					} else {
						return new authActions.DoLoginAction(response["data"]);
					}
				}),
				catchError(error => of(new authActions.SocialLoginFail()))
			);
		})
	);

	@Effect()
	forgetPassword$: Observable<Action> = this.actions$.pipe(
		ofType(authActions.AuthActionTypes.ForgetPassword),
		map((action: authActions.ForgetPasswordAction) => action.payload),
		switchMap(payload => {
			return this.authApiClient
				.forgetPassword(payload["token"], payload["dailyObjects"])
				.pipe(
					filter(response => typeof response !== "undefined"),
					map(response => {
						return new authActions.ForgetPasswordSuccessAction(response);
					}),
					catchError(responseError => {
						return of(
							new authActions.ForgetPasswordFailAction(responseError["error"])
						);
					})
				);
		})
	);
}
