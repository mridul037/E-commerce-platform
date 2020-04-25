import * as screenActions from "../actions/screen.actions";
import { Action } from "@ngrx/store";

export interface ScreenState {
	mobile?: boolean;
	tablet?: boolean;
	desktop?: boolean;
}

export const initialState: ScreenState = {
	mobile: undefined,
	tablet: undefined,
	desktop: undefined,
};

export function reducer(
	state: ScreenState = initialState,
	action: Action
): ScreenState {
	if (action.type === screenActions.ScreenActionTypes.SetScreen) {
		return handleSetScreen(state, action as screenActions.SetScreen);
	} else {
		return state;
	}
}

function handleSetScreen(
	state: ScreenState,
	action: screenActions.SetScreen
): ScreenState {
	return {
		...action.payload,
	};
}

export const getIsMobile = (state: ScreenState) => state.mobile;
export const getIsTablet = (state: ScreenState) => state.tablet;
export const getIsDesktop = (state: ScreenState) => state.desktop;
