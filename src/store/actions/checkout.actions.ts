import { Action } from "@ngrx/store";

export enum CheckoutTypes {
	LoadCheckoutCountry = "[Checkout] CheckoutCountry Load",
	CheckoutCountrySuccess = "[Checkout] CheckoutCountry Success",
	CheckoutCountryFail = "[Checkout] CheckoutCountry Fail",
	LoadCheckoutState = "[Checkout] CheckoutState Load",
	CheckoutStateSuccess = "[Checkout] CheckoutState Success",
	CheckoutStateFail = "[Checkout] CheckoutState Fail",
	LoadCheckoutPincode = "[Checkout] CheckoutPincode Load",
	CheckoutPincodeSuccess = "[Checkout] CheckoutPincode Success",
	CheckoutPincodeFail = "[Checkout] CheckoutPincode Fail",
	AddNewCheckoutAddress = "[Checkout] Adding User Address",
	AddNewCheckoutAddressSuccess = "[Checkout] Adding User Address Success",
	AddNewCheckoutAddressFail = "[Checkout] Adding User Address Fail",
	LoadCheckoutPaymentList = "[Checkout] PaymentList Load",
	CheckoutPaymentListSuccess = "[Checkout] PaymentList Success",
	CheckoutPaymentListFail = "[Checkout] PaymentList Fail",
}

export class LoadCheckoutCountriesAction implements Action {
	readonly type = CheckoutTypes.LoadCheckoutCountry;

	constructor(public payload: object) {}
}

export class CheckoutCountriesSuccessAction implements Action {
	readonly type = CheckoutTypes.CheckoutCountrySuccess;

	constructor(public payload: object) {}
}

export class CheckoutCountriesFailAction implements Action {
	readonly type = CheckoutTypes.CheckoutCountryFail;

	constructor() {}
}
export class LoadCheckoutStatesAction implements Action {
	readonly type = CheckoutTypes.LoadCheckoutState;

	constructor(public payload: object) {}
}

export class CheckoutStatesSuccessAction implements Action {
	readonly type = CheckoutTypes.CheckoutStateSuccess;

	constructor(public payload: object) {}
}

export class CheckoutStatesFailAction implements Action {
	readonly type = CheckoutTypes.CheckoutStateFail;

	constructor() {}
}
export class LoadCheckoutPincodesAction implements Action {
	readonly type = CheckoutTypes.LoadCheckoutPincode;

	constructor(public payload: string) {}
}

export class CheckoutPincodesSuccessAction implements Action {
	readonly type = CheckoutTypes.CheckoutPincodeSuccess;

	constructor(public payload: object) {}
}

export class CheckoutPincodesFailAction implements Action {
	readonly type = CheckoutTypes.CheckoutPincodeFail;

	constructor() {}
}
export class AddNewCheckoutAddressAction implements Action {
	readonly type = CheckoutTypes.AddNewCheckoutAddress;

	constructor(public payload: object) {}
}

export class AddNewCheckoutAddressSuccessAction implements Action {
	readonly type = CheckoutTypes.AddNewCheckoutAddressSuccess;

	constructor(public payload: object) {}
}

export class AddNewCheckoutAddressFailAction implements Action {
	readonly type = CheckoutTypes.AddNewCheckoutAddressFail;

	constructor() {}
}
export class CheckoutPaymentListAction implements Action {
	readonly type = CheckoutTypes.LoadCheckoutPaymentList;

	constructor(public payload: object) {}
}

export class CheckoutPaymentListSuccessAction implements Action {
	readonly type = CheckoutTypes.CheckoutPaymentListSuccess;

	constructor(public payload: object) {}
}

export class CheckoutPaymentListFailAction implements Action {
	readonly type = CheckoutTypes.CheckoutPaymentListFail;

	constructor() {}
}
export type LoadCheckoutActions =
	| LoadCheckoutCountriesAction
	| CheckoutCountriesSuccessAction
	| CheckoutCountriesFailAction
	| LoadCheckoutStatesAction
	| CheckoutStatesSuccessAction
	| CheckoutStatesFailAction
	| LoadCheckoutPincodesAction
	| CheckoutPincodesSuccessAction
	| CheckoutPincodesFailAction
	| AddNewCheckoutAddressAction
	| AddNewCheckoutAddressSuccessAction
	| AddNewCheckoutAddressFailAction
	| CheckoutPaymentListAction
	| CheckoutPaymentListSuccessAction
	| CheckoutPaymentListFailAction;
