import { Action } from "@ngrx/store";

export enum DesignerCasesTypes {
	LoadDesignerCasesCategory = "[DesignerCases] DesignerCases Category Load",
	DesignerCasesCategorySuccess = "[DesignerCases] DesignerCases Category Success",
	DesignerCasesCategoryFail = "[DesignerCases] DesignerCases Category Fail",
}

export class LoadDesignerCasesCategoryAction implements Action {
	readonly type = DesignerCasesTypes.LoadDesignerCasesCategory;

	constructor(public payload: object) {}
}

export class DesignerCasesCategorySuccessAction implements Action {
	readonly type = DesignerCasesTypes.DesignerCasesCategorySuccess;

	constructor(public payload: object) {}
}

export class DesignerCasesCategoryFailAction implements Action {
	readonly type = DesignerCasesTypes.DesignerCasesCategoryFail;

	constructor() {}
}
export type LoadDesignerCasesActions =
	| LoadDesignerCasesCategoryAction
	| DesignerCasesCategorySuccessAction
	| DesignerCasesCategoryFailAction;
