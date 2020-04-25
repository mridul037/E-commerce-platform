import { Action } from "@ngrx/store";

export enum DailyobjectsArtistTypes {
	LoadDailyobjectsArtistData = "[Dailyobjects Artist] Dailyobjects Artist Data Load",
	DailyobjectsArtistDataSuccess = "[Dailyobjects Artist] Dailyobjects Artist Data Success",
	DailyobjectsArtistDataFail = "[Dailyobjects Artist] Dailyobjects Artist Data Fail",
}

export class LoadDailyobjectsArtistDataAction implements Action {
	readonly type = DailyobjectsArtistTypes.LoadDailyobjectsArtistData;

	constructor(public payload: object) {}
}

export class DailyobjectsArtistDataSuccessAction implements Action {
	readonly type = DailyobjectsArtistTypes.DailyobjectsArtistDataSuccess;

	constructor(public payload: object) {}
}

export class DailyobjectsArtistDataFailAction implements Action {
	readonly type = DailyobjectsArtistTypes.DailyobjectsArtistDataFail;

	constructor() {}
}

export type LoadDailyobjectsArtistActions =
	| LoadDailyobjectsArtistDataAction
	| DailyobjectsArtistDataSuccessAction
	| DailyobjectsArtistDataFailAction;
