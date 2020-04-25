import { Action } from "@ngrx/store";

export enum CurrentUserActionTypes {
	GetCurrentUser = "[CurrentUser] Get Current User",
	GetCurrentUserSuccess = "[CurrentUser] Get Current User Success",
	GetCurrentUserFail = "[CurrentUser] Get Current User Fail",

	UpdateCurrentUser = "[CurrentUser] Update Current User",
	ResetCurrentUser = "[CurrentUser] Reset Current User",
}

export class GetCurrentUserAction implements Action {
	readonly type = CurrentUserActionTypes.GetCurrentUser;
}

export class GetCurrentUserSuccessAction implements Action {
	readonly type = CurrentUserActionTypes.GetCurrentUserSuccess;

	constructor(public payload: object) {}
}

export class GetCurrentUserFailAction implements Action {
	readonly type = CurrentUserActionTypes.GetCurrentUserFail;

	constructor(public payload: object = {}) {}
}

export class UpdateCurrentUser implements Action {
	readonly type = CurrentUserActionTypes.UpdateCurrentUser;

	constructor(public payload: object) {}
}

export class ResetCurrentUser implements Action {
	readonly type = CurrentUserActionTypes.ResetCurrentUser;
}

export type CurrentUserActions =
	| GetCurrentUserAction
	| GetCurrentUserSuccessAction
	| GetCurrentUserFailAction
	| UpdateCurrentUser
	| ResetCurrentUser;
