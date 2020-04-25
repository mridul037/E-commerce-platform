import { Injectable, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Device, DEVICE } from "@ngx-toolkit/device";
import { Sandbox } from "../shared/sandbox/base.sandbox";
import { GetCurrentUserAction } from "../shared/store/actions/current-user.actions";
import * as store from "../shared/store/index";
import * as authActions from "./store/auth.actions";
import { ResetCartState } from "../shared/store/actions/cart.actions";

@Injectable()
export class AuthSandbox extends Sandbox {
	public getOtpSuccess$ = this.appState$.select(store.getOTPSuccessResponse);
	public getOTPVerifiedToken$ = this.appState$.select(
		store.getOTPVerifiedToken
	);
	public getRegisteredUserToken$ = this.appState$.select(
		store.getRegisteredUserToken
	);
	public getRegisterFailError$ = this.appState$.select(
		store.getRegisterFailError
	);
	public getVerifyOTPFailError$ = this.appState$.select(
		store.getVerifyOTPFailError
	);
	public getOTPFailError$ = this.appState$.select(store.getOTPFailError);
	public getSocialLoginSuccessResponse$ = this.appState$.select(
		store.getSocialLoginSuccessResponse
	);
	public getSocialLoginToken$ = this.appState$.select(
		store.getSocialLoginToken
	);
	public forgetPassword$ = this.appState$.select(store.forgetPassword);
	public forgetPasswordError$ = this.appState$.select(
		store.forgetPasswordFailError
	);

	constructor(
		protected appState$: Store<store.AppState>,
		@Inject(DEVICE) private deviceDetector: Device
	) {
		super(appState$, deviceDetector);
	}

	public getOTP(payload: object) {
		this.appState$.dispatch(new authActions.GetOTPAction(payload));
	}

	public verifyOTP(payload: object) {
		this.appState$.dispatch(new authActions.VerifyOTPAction(payload));
	}

	public register(payload: object) {
		this.appState$.dispatch(new authActions.RegisterAction(payload));
	}

	public socialLogin(payload: object) {
		this.appState$.dispatch(new authActions.SocialLogin(payload));
	}

	public setCurrentUser() {
		this.appState$.dispatch(new GetCurrentUserAction());
	}

	public resetRegisterState() {
		this.appState$.dispatch(new authActions.ResetRegisterState());
	}

	public resetGetOTPFailState() {
		this.appState$.dispatch(new authActions.ResetGetOTPFailState());
	}

	public resetVerifyOTPState() {
		this.appState$.dispatch(new authActions.ResetVerifyOTPFailState());
	}

	public resetSocialAuthState() {
		this.appState$.dispatch(new authActions.ResetSocialAuthState());
	}

	public resetCartState() {
		this.appState$.dispatch(new ResetCartState());
	}
	public forgetPassword(payload: object) {
		this.appState$.dispatch(new authActions.ForgetPasswordAction(payload));
	}
}
