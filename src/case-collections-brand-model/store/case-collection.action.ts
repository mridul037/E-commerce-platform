import { Action } from "@ngrx/store";

export enum CaseCollectionActionsTypes {
	GetIntermediateDataLoad = "[Case-Collection] Get Intermediate Data Load",
	GetIntermediateDataSuccess = "[Case-Collection] Get Intermediate Data Success",
	GetIntermediateDataFail = "[Case-Collection] Get Intermediate Data Fail",
}

export class GetIntermediateDataLoadAction implements Action {
	readonly type = CaseCollectionActionsTypes.GetIntermediateDataLoad;

	constructor(public payload: object) {}
}

export class GetIntermediateDataSuccessAction implements Action {
	readonly type = CaseCollectionActionsTypes.GetIntermediateDataSuccess;

	constructor(public payload: object) {}
}

export class GetIntermediateDataFailAction implements Action {
	readonly type = CaseCollectionActionsTypes.GetIntermediateDataFail;

	constructor(public payload: object = {}) {}
}

export type CaseCollectionActions =
	| GetIntermediateDataLoadAction
	| GetIntermediateDataSuccessAction
	| GetIntermediateDataFailAction;
