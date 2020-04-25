import { Action } from "@ngrx/store";

export enum AuthActionTypes {
	GetOTP = "[Auth] Get OTP",
	GetOTPSuccess = "[Auth] Get OTP Success",
	GetOTPFail = "[Auth] Get OTP Fail",
	ResetGetOTPFailState = "[Auth] Reset Get OTP Fail State",

	VerifyOTP = "[Auth] Verify OTP",
	VerifyOTPSuccess = "[Auth] Verify OTP Success",
	VerifyOTPFail = "[Auth] Verify OTP Fail",
	ResetVerifyOTPFailState = "[Auth] Reset Verify OTP State",

	Register = "[Auth] Register User",
	RegisterSuccess = "[Auth] Register User Success",
	RegisterFail = "[Auth] Register User Fail",
	ResetRegisterState = "[Auth] Reset Register State",

	SocialLogin = "[Auth] Social Login Load",
	SocialLoginSuccess = "[Auth] Social Login Success",
	SocialLoginFail = "[Auth] Social Login Fail",
	ResetSocialAuthState = "[Auth] Reset Social Auth State",

	DoLoginAction = "[Auth] DO Login Action",

	ForgetPassword = "[Auth] DO Forget Password Action",
	ForgetPasswordSuccess = "[Auth] DO Forget Password Success Action",
	ForgetPasswordFail = "[Auth] DO Forget Password Fail Action",
}

/**
 * Get OTP Actions
 */
export class GetOTPAction implements Action {
	readonly type = AuthActionTypes.GetOTP;

	constructor(public payload: object) {}
}

export class GetOTPSuccess implements Action {
	readonly type = AuthActionTypes.GetOTPSuccess;

	constructor(public payload: object) {}
}
export class GetOTPFail implements Action {
	readonly type = AuthActionTypes.GetOTPFail;

	constructor(public payload: object = {}) {}
}
export class ResetGetOTPFailState implements Action {
	readonly type = AuthActionTypes.ResetGetOTPFailState;
}

/**
 * Verify OTP Actions
 */
export class VerifyOTPAction implements Action {
	readonly type = AuthActionTypes.VerifyOTP;

	constructor(public payload: object) {}
}
export class VerifyOTPSuccess implements Action {
	readonly type = AuthActionTypes.VerifyOTPSuccess;

	constructor(public payload: object) {}
}
export class VerifyOTPFail implements Action {
	readonly type = AuthActionTypes.VerifyOTPFail;

	constructor(public payload: object = {}) {}
}
export class ResetVerifyOTPFailState implements Action {
	readonly type = AuthActionTypes.ResetVerifyOTPFailState;
}

/**
 * Register Actions
 */
export class RegisterAction implements Action {
	readonly type = AuthActionTypes.Register;

	constructor(public payload: object) {}
}
export class RegisterSuccess implements Action {
	readonly type = AuthActionTypes.RegisterSuccess;

	constructor(public payload: object) {}
}
export class RegisterFail implements Action {
	readonly type = AuthActionTypes.RegisterFail;

	constructor(public payload: object = {}) {}
}
export class ResetRegisterState implements Action {
	readonly type = AuthActionTypes.ResetRegisterState;
}

/**
 * Social Login Actions
 */
export class SocialLogin implements Action {
	readonly type = AuthActionTypes.SocialLogin;

	constructor(public payload: object) {}
}
export class SocialLoginSuccess implements Action {
	readonly type = AuthActionTypes.SocialLoginSuccess;

	constructor(public payload: object) {}
}
export class SocialLoginFail implements Action {
	readonly type = AuthActionTypes.SocialLoginFail;

	constructor(public payload: object = {}) {}
}
export class ResetSocialAuthState implements Action {
	readonly type = AuthActionTypes.ResetSocialAuthState;
}

export class DoLoginAction implements Action {
	readonly type = AuthActionTypes.DoLoginAction;

	constructor(public payload: object) {}
}
export class ForgetPasswordAction implements Action {
	readonly type = AuthActionTypes.ForgetPassword;

	constructor(public payload: object) {}
}
export class ForgetPasswordSuccessAction implements Action {
	readonly type = AuthActionTypes.ForgetPasswordSuccess;

	constructor(public payload: object) {}
}
export class ForgetPasswordFailAction implements Action {
	readonly type = AuthActionTypes.ForgetPasswordFail;

	constructor(public payload: object = {}) {}
}

export type AuthActions =
	| GetOTPAction
	| GetOTPSuccess
	| GetOTPFail
	| ResetGetOTPFailState
	| VerifyOTPAction
	| VerifyOTPSuccess
	| VerifyOTPFail
	| ResetVerifyOTPFailState
	| RegisterAction
	| RegisterSuccess
	| RegisterFail
	| ResetRegisterState
	| SocialLogin
	| SocialLoginSuccess
	| SocialLoginFail
	| ResetSocialAuthState
	| DoLoginAction
	| ForgetPasswordAction
	| ForgetPasswordSuccessAction
	| ForgetPasswordFailAction;
