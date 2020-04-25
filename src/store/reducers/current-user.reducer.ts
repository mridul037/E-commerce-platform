import { Action } from "@ngrx/store";
import * as currentUserActions from "../actions/current-user.actions";

export interface CurrentUserState {
	currentUser: object;
}

export const initialState: CurrentUserState = {
	currentUser: {
		loading: false,
		loaded: false,
		failed: false,
		user: undefined,
	},
};

export function reducer(
	state: CurrentUserState = initialState,
	action: Action
): CurrentUserState {
	switch (action.type) {
		case currentUserActions.CurrentUserActionTypes.GetCurrentUser: {
			return {
				...state,
				currentUser: {
					...state.currentUser,
					loading: true,
				},
			};
		}

		case currentUserActions.CurrentUserActionTypes.GetCurrentUserSuccess: {
			return handleCurrentUserSuccess(
				state,
				action as currentUserActions.GetCurrentUserSuccessAction
			);
		}

		case currentUserActions.CurrentUserActionTypes.GetCurrentUserFail: {
			return handleCurrentUserFail(
				state,
				action as currentUserActions.GetCurrentUserFailAction
			);
		}

		case currentUserActions.CurrentUserActionTypes.UpdateCurrentUser: {
			return handleCurrentUserSuccess(
				state,
				action as currentUserActions.UpdateCurrentUser
			);
		}

		case currentUserActions.CurrentUserActionTypes.ResetCurrentUser: {
			return {
				...state,
				currentUser: {
					loading: false,
					loaded: false,
					failed: false,
					user: undefined,
				},
			};
		}

		default: {
			return state;
		}
	}
}

function handleCurrentUserSuccess(
	state: CurrentUserState,
	action:
		| currentUserActions.GetCurrentUserSuccessAction
		| currentUserActions.UpdateCurrentUser
): CurrentUserState {
	return {
		...state,
		currentUser: {
			user: action.payload,
		},
	};
}

function handleCurrentUserFail(
	state: CurrentUserState,
	action: currentUserActions.GetCurrentUserFailAction
): CurrentUserState {
	return {
		...state,
		currentUser: {
			failed: true,
			error: action.payload,
		},
	};
}

export const getCurrentUser = (state: CurrentUserState) =>
	state.currentUser["user"];
export const getCurrentUserLoading = (state: CurrentUserState) =>
	state.currentUser["loading"];
export const getCurrentUserFailed = (state: CurrentUserState) =>
	state.currentUser["error"];
