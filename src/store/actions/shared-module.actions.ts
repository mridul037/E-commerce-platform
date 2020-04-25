import { Action } from "@ngrx/store";

export enum SharedModuleActionsTypes {
	MobileMenuLoad = "[SHARED] Mobile Menu Load",
	MobileMenuSuccess = "[SHARED] Mobile Menu Success",
	MobileMenuFail = "[SHARED] Mobile Menu Fail",

	DesktopNavLoad = "[SHARED] Desktop Nav Load",
	DesktopNavSuccess = "[SHARED] Desktop Nav Success",
	DesktopNavFail = "[SHARED] Desktop Nav Fail",

	LandingPageLoad = "[SHARED] Landing Page Load",
	LandingPageSuccess = "[SHARED] Landing Page Success",
	LandingPageFail = "[SHARED] Landing Page Fail",
}

export class MobileMenuLoadAction implements Action {
	readonly type = SharedModuleActionsTypes.MobileMenuLoad;
}

export class MobileMenuSuccessAction implements Action {
	readonly type = SharedModuleActionsTypes.MobileMenuSuccess;

	constructor(public payload: object) {}
}

export class MobileMenuFailAction implements Action {
	readonly type = SharedModuleActionsTypes.MobileMenuFail;

	constructor(public payload: object = {}) {}
}

export class DesktopNavLoadAction implements Action {
	readonly type = SharedModuleActionsTypes.DesktopNavLoad;
}

export class DesktopNavSuccessAction implements Action {
	readonly type = SharedModuleActionsTypes.DesktopNavSuccess;

	constructor(public payload: object) {}
}

export class DesktopNavFailAction implements Action {
	readonly type = SharedModuleActionsTypes.DesktopNavFail;

	constructor(public payload: object = {}) {}
}
export class LandingPageLoadAction implements Action {
	readonly type = SharedModuleActionsTypes.LandingPageLoad;
}

export class LandingPageSuccessAction implements Action {
	readonly type = SharedModuleActionsTypes.LandingPageSuccess;

	constructor(public payload: object) {}
}

export class LandingPageFailAction implements Action {
	readonly type = SharedModuleActionsTypes.LandingPageFail;

	constructor(public payload: object = {}) {}
}

export type SharedModuleActions =
	| MobileMenuLoadAction
	| MobileMenuSuccessAction
	| MobileMenuFailAction
	| DesktopNavLoadAction
	| DesktopNavSuccessAction
	| DesktopNavFailAction
	| LandingPageLoadAction
	| LandingPageSuccessAction
	| LandingPageFailAction;
