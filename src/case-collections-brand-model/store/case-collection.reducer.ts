import { Action } from "@ngrx/store";
import * as CaseCollectionActions from "../store/case-collection.action";

export interface CaseCollectionModuleState {
	intermediateData: object;
}

export const initialState: CaseCollectionModuleState = {
	intermediateData: {
		loading: false,
		success: false,
		failed: false,
		response: undefined,
	},
};

export function reducer(
	state = initialState,
	action: Action
): CaseCollectionModuleState {
	switch (action.type) {
		case CaseCollectionActions.CaseCollectionActionsTypes
			.GetIntermediateDataLoad: {
			return {
				...state,
				intermediateData: {
					loading: true,
				},
			};
		}

		case CaseCollectionActions.CaseCollectionActionsTypes
			.GetIntermediateDataSuccess: {
			return handleIntermediateDataSuccess(
				state,
				action as CaseCollectionActions.GetIntermediateDataSuccessAction
			);
		}

		case CaseCollectionActions.CaseCollectionActionsTypes
			.GetIntermediateDataFail: {
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
	state: CaseCollectionModuleState,
	action: CaseCollectionActions.GetIntermediateDataSuccessAction
): CaseCollectionModuleState {
	return {
		...state,
		intermediateData: {
			success: true,
			response: action.payload,
		},
	};
}

export const getIntermediateData = (state: CaseCollectionModuleState) => {
	return state.intermediateData["response"];
};
