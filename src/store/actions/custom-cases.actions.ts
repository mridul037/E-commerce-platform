import { Action } from "@ngrx/store";

export enum CustomCaseActionTypes {
	CurrentOffersLoad = "[CUSTOM] Current Offers Load",
	CurrentOffersSuccess = "[CUSTOM] Current Offers Success",
	CurrentOffersFail = "[CUSTOM] Current Offers Fail",
}

export class CurrentOffersLoadAction implements Action {
	readonly type = CustomCaseActionTypes.CurrentOffersLoad;

	constructor(public payload: object) {}
}

export class CurrentOffersSuccessAction implements Action {
	readonly type = CustomCaseActionTypes.CurrentOffersSuccess;

	constructor(public payload: object) {}
}

export class CurrentOffersFailAction implements Action {
	readonly type = CustomCaseActionTypes.CurrentOffersFail;

	constructor(public payload: object = {}) {}
}

export type CustomCaseActions =
	| CurrentOffersLoadAction
	| CurrentOffersSuccessAction
	| CurrentOffersFailAction;
