import { Action } from "@ngrx/store";
import * as DailyobjectsArtistActions from "../actions/dailyobjects-artist.actions";

export interface DailyobjectsArtistState {
	dailyobjectsArtistData: object;
}

export const initialState: DailyobjectsArtistState = {
	dailyobjectsArtistData: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
};

export function reducer(
	state = initialState,
	action: Action
): DailyobjectsArtistState {
	switch (action.type) {
		case DailyobjectsArtistActions.DailyobjectsArtistTypes
			.LoadDailyobjectsArtistData: {
			return {
				...state,
				dailyobjectsArtistData: {
					loading: true,
				},
			};
		}
		case DailyobjectsArtistActions.DailyobjectsArtistTypes
			.DailyobjectsArtistDataSuccess: {
			return handleDailyobjectsArtistDataSuccess(
				state,
				action as DailyobjectsArtistActions.DailyobjectsArtistDataSuccessAction
			);
		}
		case DailyobjectsArtistActions.DailyobjectsArtistTypes
			.DailyobjectsArtistDataFail: {
			return {
				...state,
				dailyobjectsArtistData: {
					failed: true,
				},
			};
		}
		default:
			return state;
	}
}

function handleDailyobjectsArtistDataSuccess(
	state: DailyobjectsArtistState,
	action: DailyobjectsArtistActions.DailyobjectsArtistDataSuccessAction
): DailyobjectsArtistState {
	return {
		...state,
		dailyobjectsArtistData: action.payload,
	};
}

export const getDailyobjectsArtistData = (state: DailyobjectsArtistState) =>
	state.dailyobjectsArtistData;
export const getDailyobjectsArtistDataFailed = (
	state: DailyobjectsArtistState
) => state.dailyobjectsArtistData;
