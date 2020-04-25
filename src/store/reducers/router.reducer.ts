import { Action } from "@ngrx/store";
import * as routerActions from "../actions/router.actions";

export interface RouterState {
	previousUrl: string;
	currentUrl: string;
}

export const initialState: RouterState = {
	previousUrl: "",
	currentUrl: "",
};

export function reducer(
	state: RouterState = initialState,
	action: Action
): RouterState {
	if (action.type === routerActions.RouterActionTypes.SetRouterState) {
		return handleSetRouterState(state, action as routerActions.SetRouterState);
	} else {
		return state;
	}
}

function handleSetRouterState(
	state: RouterState,
	action: routerActions.SetRouterState
): RouterState {
	return {
		...state,
		previousUrl: action.payload["previousUrl"],
		currentUrl: action.payload["currentUrl"],
	};
}

export const getPreviousUrl = (state: RouterState) => state.previousUrl;
export const getCurrentUrl = (state: RouterState) => state.currentUrl;
export const getActiveRouterState = (state: RouterState) => ({
	previousUrl: state.previousUrl,
	currentUrl: state.currentUrl,
});
