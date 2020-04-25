import { Action } from "@ngrx/store";

export enum PaymentSuccessTypes {
	LoadPaymentSuccessData = "[Payment Success] Payment Success Data Load",
	PaymentSuccessDataSuccess = "[Payment Success] Payment Success Data Success",
	PaymentSuccessDataFail = "[Payment Success] Payment Success Data Fail",
	LoadGoogleConversionStatusChange = "[Payment Success] GoogleConversionStatusChange Data Load",
	GoogleConversionStatusChangeSuccess = "[Payment Success] GoogleConversionStatusChange Data Success",
	GoogleConversionStatusChangeFail = "[Payment Success] GoogleConversionStatusChange Data Fail",
}

export class LoadPaymentSuccessDataAction implements Action {
	readonly type = PaymentSuccessTypes.LoadPaymentSuccessData;

	constructor(public payload: string) {}
}

export class PaymentSuccessDataSuccessAction implements Action {
	readonly type = PaymentSuccessTypes.PaymentSuccessDataSuccess;

	constructor(public payload: object) {}
}

export class PaymentSuccessDataFailAction implements Action {
	readonly type = PaymentSuccessTypes.PaymentSuccessDataFail;

	constructor() {}
}
export class LoadGoogleConversionStatusChangeAction implements Action {
	readonly type = PaymentSuccessTypes.LoadGoogleConversionStatusChange;

	constructor(public payload: object) {}
}

export class GoogleConversionStatusChangeSuccessAction implements Action {
	readonly type = PaymentSuccessTypes.GoogleConversionStatusChangeSuccess;

	constructor(public payload: object) {}
}

export class GoogleConversionStatusChangeFailAction implements Action {
	readonly type = PaymentSuccessTypes.GoogleConversionStatusChangeFail;

	constructor() {}
}

export type LoadCartActions =
	| LoadPaymentSuccessDataAction
	| PaymentSuccessDataSuccessAction
	| PaymentSuccessDataFailAction
	| LoadGoogleConversionStatusChangeAction
	| GoogleConversionStatusChangeSuccessAction
	| GoogleConversionStatusChangeFailAction;
