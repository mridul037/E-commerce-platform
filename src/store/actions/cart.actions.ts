import { Action } from "@ngrx/store";

export enum CartTypes {
	LoadCartData = "[Cart] Cart Data Load",
	CartDataSuccess = "[Cart] Cart Data Success",
	CartDataFail = "[Cart] Cart Data Fail",
	LoadCartAccessory = "[Cart] CartAccessory Load",
	CartAccessorySuccess = "[Cart] CartAccessory Success",
	CartAccessoryFail = "[Cart] CartAccessory Fail",
	ResetCartState = "[Cart] Reset Cart State",
	LoadCartListProducts = "[cart] CartListProducts Load",
	CartListProductsSuccess = "[cart] CartListProducts Success",
	CartListProductsFail = "[cart] CartListProducts Fail",
}

export class LoadCartDataAction implements Action {
	readonly type = CartTypes.LoadCartData;

	constructor(public payload: object) {}
}

export class CartDataSuccessAction implements Action {
	readonly type = CartTypes.CartDataSuccess;

	constructor(public payload: object) {}
}

export class CartDataFailAction implements Action {
	readonly type = CartTypes.CartDataFail;

	constructor() {}
}
export class LoadCartAccessoryAction implements Action {
	readonly type = CartTypes.LoadCartAccessory;

	constructor(public payload: object) {}
}

export class CartAccessorySuccessAction implements Action {
	readonly type = CartTypes.CartAccessorySuccess;

	constructor(public payload: object) {}
}

export class CartAccessoryFailAction implements Action {
	readonly type = CartTypes.CartAccessoryFail;

	constructor() {}
}

export class ResetCartState implements Action {
	readonly type = CartTypes.ResetCartState;
}
export class LoadCartListProductsAction implements Action {
	readonly type = CartTypes.LoadCartListProducts;

	constructor(public payload: object) {}
}

export class CartListProductsSuccessAction implements Action {
	readonly type = CartTypes.CartListProductsSuccess;

	constructor(public payload: object) {}
}

export class CartListProductsFailAction implements Action {
	readonly type = CartTypes.CartListProductsFail;

	constructor() {}
}

export type LoadCartActions =
	| LoadCartDataAction
	| CartDataSuccessAction
	| CartDataFailAction
	| LoadCartAccessoryAction
	| CartAccessorySuccessAction
	| CartAccessoryFailAction
	| ResetCartState
	| LoadCartListProductsAction
	| CartListProductsSuccessAction
	| CartListProductsFailAction;
