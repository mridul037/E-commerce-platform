import { Action } from "@ngrx/store";

export enum RouterActionTypes {
	SetRouterState = "[Router] Set Router State",
}

export class SetRouterState implements Action {
	readonly type = RouterActionTypes.SetRouterState;

	constructor(public payload: object) {}
}

export type RouterActions = SetRouterState;
