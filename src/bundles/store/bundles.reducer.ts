import { Action } from "@ngrx/store";
import * as BundlesAction from "./bundles.action";

export interface BundleModuleState {
	intermediateData: object;
}

export const initialState: BundleModuleState = {
	intermediateData: {
		loading: false,
		success: false,
		failed: false,
		response: [],
	},
};
export function reducer(
	state = initialState,
	action: Action
): BundleModuleState {
	switch (action.type) {
		case BundlesAction.BundlesActionsTypes.GetIntermediateDataLoad: {
			return {
				...state,
				intermediateData: {
					loading: true,
				},
			};
		}

		case BundlesAction.BundlesActionsTypes.GetIntermediateDataSuccess: {
			return handleIntermediateDataSuccess(
				state,
				action as BundlesAction.GetIntermediateDataSuccessAction
			);
		}

		case BundlesAction.BundlesActionsTypes.GetIntermediateDataFail: {
			return {
				...state,
				intermediateData: {
					failed: true,
				},
			};
		}

		default:
			return state;
	}
}
function handleIntermediateDataSuccess(
	state: BundleModuleState,
	action: BundlesAction.GetIntermediateDataSuccessAction
): BundleModuleState {
	return {
		...state,
		intermediateData: {
			success: true,
			response: action.payload,
		},
	};
}
export const getIntermediateData = (state: BundleModuleState) => {
	return state.intermediateData["response"];
};
