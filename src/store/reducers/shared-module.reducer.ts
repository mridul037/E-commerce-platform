import { Action } from "@ngrx/store";
import * as sharedActions from "../actions/shared-module.actions";

export interface SharedModuleState {
	mobileMenu: object;
	desktopMenu: object;
	landingPageJson: object;
}

export const initialState: SharedModuleState = {
	mobileMenu: {
		loading: false,
		success: false,
		failed: false,
		response: Object,
	},
	desktopMenu: {
		loading: false,
		success: false,
		failed: false,
		response: Object,
	},
	landingPageJson: {
		loading: false,
		success: false,
		failed: false,
		response: Object,
	},
};

export function reducer(
	state = initialState,
	action: Action
): SharedModuleState {
	switch (action.type) {
		case sharedActions.SharedModuleActionsTypes.MobileMenuLoad: {
			return {
				...state,
				mobileMenu: {
					loading: true,
				},
			};
		}

		case sharedActions.SharedModuleActionsTypes.MobileMenuSuccess: {
			return handleMobileMenuSuccess(
				state,
				action as sharedActions.MobileMenuSuccessAction
			);
		}

		case sharedActions.SharedModuleActionsTypes.MobileMenuFail: {
			return {
				...state,
				mobileMenu: {
					failed: true,
				},
			};
		}

		case sharedActions.SharedModuleActionsTypes.DesktopNavLoad: {
			return {
				...state,
				desktopMenu: {
					loading: true,
				},
			};
		}

		case sharedActions.SharedModuleActionsTypes.DesktopNavSuccess: {
			return handleDesktopMenuSuccess(
				state,
				action as sharedActions.DesktopNavSuccessAction
			);
		}

		case sharedActions.SharedModuleActionsTypes.DesktopNavFail: {
			return {
				...state,
				desktopMenu: {
					failed: true,
				},
			};
		}
		case sharedActions.SharedModuleActionsTypes.LandingPageLoad: {
			return {
				...state,
				landingPageJson: {
					loading: true,
				},
			};
		}

		case sharedActions.SharedModuleActionsTypes.LandingPageSuccess: {
			return handleLandingPageSuccess(
				state,
				action as sharedActions.LandingPageSuccessAction
			);
		}

		case sharedActions.SharedModuleActionsTypes.LandingPageFail: {
			return {
				...state,
				landingPageJson: {
					failed: true,
				},
			};
		}

		default:
			return state;
	}
}

function handleMobileMenuSuccess(
	state: SharedModuleState,
	action: sharedActions.MobileMenuSuccessAction
): SharedModuleState {
	return {
		...state,
		mobileMenu: {
			success: true,
			response: action.payload,
		},
	};
}

function handleDesktopMenuSuccess(
	state: SharedModuleState,
	action: sharedActions.DesktopNavSuccessAction
): SharedModuleState {
	return {
		...state,
		desktopMenu: {
			success: true,
			response: action.payload,
		},
	};
}
function handleLandingPageSuccess(
	state: SharedModuleState,
	action: sharedActions.LandingPageSuccessAction
): SharedModuleState {
	return {
		...state,
		landingPageJson: {
			success: true,
			response: action.payload,
		},
	};
}
export const getMobileMenu = (state: SharedModuleState) => state.mobileMenu;
export const getDesktopMenu = (state: SharedModuleState) =>
	state.desktopMenu["response"];
export const getLandingPageJson = (state: SharedModuleState) =>
	state.landingPageJson["response"];
