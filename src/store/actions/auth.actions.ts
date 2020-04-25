import { Action } from "@ngrx/store";

export enum AuthActionTypes {
	DoLogin = "[Auth] Do Login",
	DoLoginSuccess = "[Auth] Do Login Success",
	DoLoginFail = "[Auth] Do Login Fail",
}

/**
 * Login Actions
 */
export class DoLoginAction implements Action {
	readonly type = AuthActionTypes.DoLogin;

	constructor(public payload: object) {}
}

export class DoLoginSuccessAction implements Action {
	readonly type = AuthActionTypes.DoLoginSuccess;

	constructor(public payload: object) {}
}

export class DoLoginFailAction implements Action {
	readonly type = AuthActionTypes.DoLoginFail;

	constructor(public payload: object = {}) {}
}
export type AuthActions =
	| DoLoginAction
	| DoLoginFailAction
	| DoLoginSuccessAction;
