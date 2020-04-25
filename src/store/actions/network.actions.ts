import { Action } from "@ngrx/store";

export enum NetworkActionTypes {
	StartOnlineOfflineCheck = "[Network] StartOnlineOfflineCheck",
	SetIsOnline = "[Network] SetIsOnline",
}

export class StartOnlineOfflineCheck implements Action {
	readonly type = NetworkActionTypes.StartOnlineOfflineCheck;
}

export class SetIsOnline implements Action {
	readonly type = NetworkActionTypes.SetIsOnline;

	constructor(public payload: boolean) {}
}

export type NetworkActions = StartOnlineOfflineCheck | SetIsOnline;
