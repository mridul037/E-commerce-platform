import { Action } from "@ngrx/store";
import * as DesignerCasesActions from "../actions/designer-cases.actions";

export interface DesignerCasesState {
	designerCasesCategory: object;
}

export const initialState: DesignerCasesState = {
	designerCasesCategory: {
		loading: false,
		sucess: false,
		failed: false,
		response: undefined,
	},
};

export function reducer(
	state = initialState,
	action: Action
): DesignerCasesState {
	switch (action.type) {
		case DesignerCasesActions.DesignerCasesTypes.LoadDesignerCasesCategory: {
			return {
				...state,
				designerCasesCategory: {
					loading: true,
				},
			};
		}

		case DesignerCasesActions.DesignerCasesTypes.DesignerCasesCategorySuccess: {
			return handleDesignerCasesCategorySuccess(
				state,
				action as DesignerCasesActions.DesignerCasesCategorySuccessAction
			);
		}

		case DesignerCasesActions.DesignerCasesTypes.DesignerCasesCategoryFail: {
			return {
				...state,
				designerCasesCategory: {
					failed: true,
				},
			};
		}
		default:
			return state;
	}
}

function handleDesignerCasesCategorySuccess(
	state: DesignerCasesState,
	action: DesignerCasesActions.DesignerCasesCategorySuccessAction
): DesignerCasesState {
	return {
		...state,
		designerCasesCategory: {
			response: action.payload,
		},
	};
}
export const getDesignerCasesCategory = (state: DesignerCasesState) =>
	state.designerCasesCategory["response"];
export const getDesignerCasesCategoryFailed = (state: DesignerCasesState) =>
	state.designerCasesCategory["failed"];
