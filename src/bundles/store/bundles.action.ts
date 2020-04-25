import { Action } from "@ngrx/store";

export enum BundlesActionsTypes {
	GetIntermediateDataLoad = "[Budles] Get Intermediate Data Load",
	GetIntermediateDataSuccess = "[Budles] Get Intermediate Data Success",
	GetIntermediateDataFail = "[Budles] Get Intermediate Data Fail",
}
export class GetIntermediateDataLoadAction implements Action {
	readonly type = BundlesActionsTypes.GetIntermediateDataLoad;

	constructor(public payload: object) {}
}

export class GetIntermediateDataSuccessAction implements Action {
	readonly type = BundlesActionsTypes.GetIntermediateDataSuccess;

	constructor(public payload: object) {}
}

export class GetIntermediateDataFailAction implements Action {
	readonly type = BundlesActionsTypes.GetIntermediateDataFail;

	constructor(public payload: object = {}) {}
}
export type BundlesActions =
	| GetIntermediateDataLoadAction
	| GetIntermediateDataSuccessAction
	| GetIntermediateDataFailAction;
