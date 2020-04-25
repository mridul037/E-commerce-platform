import { Action } from "@ngrx/store";

const MOBILE_MAX_WIDTH = 599;
const TABLET_MAX_WIDTH = 959;

export enum ScreenActionTypes {
	SetScreen = "[Screen] Set Screen",
}

export class SetScreen implements Action {
	type = ScreenActionTypes.SetScreen;
	payload = {
		mobile: false,
		tablet: false,
		desktop: false,
	};

	constructor(readonly width: Object) {
		const mobile = width <= MOBILE_MAX_WIDTH;
		const tablet = width <= TABLET_MAX_WIDTH && width > MOBILE_MAX_WIDTH;
		this.payload = {
			mobile,
			tablet,
			desktop: !mobile && !tablet,
		};
	}
}

export type ScreenActions = SetScreen;
