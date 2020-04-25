import { Action } from "@ngrx/store";

export enum OsActionTypes {
	SetOs = "[OS] Set OS Type",
}

export class SetOs implements Action {
	type = OsActionTypes.SetOs;
	payload = {
		android: false,
		ios: false,
		otherOs: false,
	};

	constructor(readonly osType: Object) {
		const android = true;
		const ios = false;
		this.payload = {
			android,
			ios,
			otherOs: !android && !ios,
		};
	}
}

export type OsActions = SetOs;
