import { Action } from "@ngrx/store";

export enum BrandSpecificCasesActionsTypes {
	GetIntermediateDataLoad = "[BrandSpecificCases] Get Intermediate Data Load",
	GetIntermediateDataSuccess = "[BrandSpecificCases] Get Intermediate Data Success",
	GetIntermediateDataFail = "[BrandSpecificCases] Get Intermediate Data Fail",

	BrandPageFooterContent = "[BrandPage] BrandPageFooterContent Load",
	BrandPageFooterContentSuccess = "[BrandPage] BrandPageFooterContent Success",
	BrandPageFooterContentFail = "[BrandPage] BrandPageFooterContent Fail",
}
export class GetIntermediateDataLoadAction implements Action {
	readonly type = BrandSpecificCasesActionsTypes.GetIntermediateDataLoad;

	constructor(public payload: object) {}
}

export class GetIntermediateDataSuccessAction implements Action {
	readonly type = BrandSpecificCasesActionsTypes.GetIntermediateDataSuccess;

	constructor(public payload: object) {}
}

export class GetIntermediateDataFailAction implements Action {
	readonly type = BrandSpecificCasesActionsTypes.GetIntermediateDataFail;

	constructor(public payload: object = {}) {}
}
export class BrandPageFooterContentAction implements Action {
	readonly type = BrandSpecificCasesActionsTypes.BrandPageFooterContent;

	constructor(public payload: object) {}
}

export class BrandPageFooterContentSuccessAction implements Action {
	readonly type = BrandSpecificCasesActionsTypes.BrandPageFooterContentSuccess;

	constructor(public payload: object) {}
}

export class BrandPageFooterContentFailAction implements Action {
	readonly type = BrandSpecificCasesActionsTypes.BrandPageFooterContentFail;
}
export type BrandSpecificCasesActions =
	| GetIntermediateDataLoadAction
	| GetIntermediateDataSuccessAction
	| GetIntermediateDataFailAction
	| BrandPageFooterContentAction
	| BrandPageFooterContentSuccessAction
	| BrandPageFooterContentFailAction;
