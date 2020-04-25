import { Action } from "@ngrx/store";
import * as osActions from "../actions/os.actions";

export interface OsState {
	android?: boolean;
	ios?: boolean;
	otherOs?: boolean;
}

export const initialState: OsState = {
	android: undefined,
	ios: undefined,
	otherOs: undefined,
};

export function reducer(
	state: OsState = initialState,
	action: Action
): OsState {
	if (action.type === osActions.OsActionTypes.SetOs) {
		return handleSetOs(state, action as osActions.SetOs);
	} else {
		return state;
	}
}

function handleSetOs(state: OsState, action: osActions.SetOs): OsState {
	return {
		...action.payload,
	};
}

export const getIsAndroid = (state: OsState) => state.android;
export const getIsIos = (state: OsState) => state.ios;
export const getIsOtherOs = (state: OsState) => state.otherOs;
