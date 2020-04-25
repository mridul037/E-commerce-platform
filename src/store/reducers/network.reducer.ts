import { Action } from "@ngrx/store";
import * as networkActions from "../actions/network.actions";

export interface NetworkState {
	isOnline: boolean;
}

export const initialState: NetworkState = {
	isOnline: navigator.onLine,
};

export function reducer(
	state: NetworkState = initialState,
	action: Action
): NetworkState {
	if (action.type === networkActions.NetworkActionTypes.SetIsOnline) {
		return handleIsOnline(state, action as networkActions.SetIsOnline);
	} else {
		return state;
	}
}

function handleIsOnline(
	state: NetworkState,
	action: networkActions.SetIsOnline
): NetworkState {
	return {
		...state,
		isOnline: action.payload,
	};
}

export const getIsOnline = (state: NetworkState) => state.isOnline;
