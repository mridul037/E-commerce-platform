import { Action } from "@ngrx/store";
import * as BrandSpecificCaseActions from "./brand-specific-cases.action";

export interface BrandSpecificCaseModuleState {
	intermediateData: object;
	brandContent: object;
}

export const initialState: BrandSpecificCaseModuleState = {
	intermediateData: {
		loading: false,
		success: false,
		failed: false,
		response: [],
	},
	brandContent: {
		loading: false,
		loaded: false,
		failed: false,
		response: undefined,
	},
};
export function reducer(
	state = initialState,
	action: Action
): BrandSpecificCaseModuleState {
	switch (action.type) {
		case BrandSpecificCaseActions.BrandSpecificCasesActionsTypes
			.GetIntermediateDataLoad: {
			return {
				...state,
				intermediateData: {
					loading: true,
				},
			};
		}

		case BrandSpecificCaseActions.BrandSpecificCasesActionsTypes
			.GetIntermediateDataSuccess: {
			return handleIntermediateDataSuccess(
				state,
				action as BrandSpecificCaseActions.GetIntermediateDataSuccessAction
			);
		}

		case BrandSpecificCaseActions.BrandSpecificCasesActionsTypes
			.GetIntermediateDataFail: {
			return {
				...state,
				intermediateData: {
					failed: true,
				},
			};
		}
		case BrandSpecificCaseActions.BrandSpecificCasesActionsTypes
			.BrandPageFooterContent: {
			return {
				...state,
				brandContent: {
					loading: true,
				},
			};
		}
		case BrandSpecificCaseActions.BrandSpecificCasesActionsTypes
			.BrandPageFooterContentSuccess: {
			return handleListingFooterContentSuccess(
				state,
				action as BrandSpecificCaseActions.BrandPageFooterContentSuccessAction
			);
		}
		case BrandSpecificCaseActions.BrandSpecificCasesActionsTypes
			.BrandPageFooterContentFail: {
			return {
				...state,
				brandContent: {
					failed: true,
				},
			};
		}

		default:
			return state;
	}
}
function handleIntermediateDataSuccess(
	state: BrandSpecificCaseModuleState,
	action: BrandSpecificCaseActions.GetIntermediateDataSuccessAction
): BrandSpecificCaseModuleState {
	return {
		...state,
		intermediateData: {
			success: true,
			response: action.payload,
		},
	};
}
function handleListingFooterContentSuccess(
	state: BrandSpecificCaseModuleState,
	action: BrandSpecificCaseActions.BrandPageFooterContentSuccessAction
): BrandSpecificCaseModuleState {
	return {
		...state,
		brandContent: {
			response: action.payload,
		},
	};
}
export const getBrandSpecificCases = (state: BrandSpecificCaseModuleState) => {
	return state.intermediateData["response"];
};
export const brandContent = (state: BrandSpecificCaseModuleState) =>
	state.brandContent["response"];
export const brandContentFailed = (state: BrandSpecificCaseModuleState) =>
	state.brandContent["error"];
