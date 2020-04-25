import { Action } from "@ngrx/store";
import * as CartActions from "../actions/cart.actions";

export interface CartState {
	cartData: object;
	cartAccessory: object;
	cartListProducts: object;
}

export const initialState: CartState = {
	cartData: {
		cartProducts: [],
		cartTotal: {},
		cartAllData: undefined,
	},
	cartAccessory: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
	cartListProducts: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
};

export function reducer(state = initialState, action: Action): CartState {
	switch (action.type) {
		// case CartActions.CartTypes.LoadCartData: {
		// 	return {
		// 		...state,
		// 		cartData: {
		// 			loading: true,
		// 		},
		// 	};
		// }

		case CartActions.CartTypes.CartDataSuccess: {
			return handleCartDataSuccess(
				state,
				action as CartActions.CartDataSuccessAction
			);
		}

		// case CartActions.CartTypes.CartDataFail: {
		// 	return {
		// 		...state,
		// 		cartData: {
		// 			failed: true,
		// 		},
		// 	};
		// }
		case CartActions.CartTypes.LoadCartAccessory: {
			return {
				...state,
				cartAccessory: {
					loading: true,
				},
			};
		}

		case CartActions.CartTypes.CartAccessorySuccess: {
			return handleCartAccessorySuccess(
				state,
				action as CartActions.CartAccessorySuccessAction
			);
		}

		case CartActions.CartTypes.CartAccessoryFail: {
			return {
				...state,
				cartAccessory: {
					failed: true,
				},
			};
		}

		case CartActions.CartTypes.ResetCartState: {
			return {
				...state,
				cartData: {
					cartProducts: [],
					cartTotal: {},
					cartAllData: undefined,
				},
			};
		}
		case CartActions.CartTypes.LoadCartListProducts: {
			return {
				...state,
				cartListProducts: {
					loading: true,
				},
			};
		}

		case CartActions.CartTypes.CartListProductsSuccess: {
			return handleCartListProductsSuccess(
				state,
				action as CartActions.CartListProductsSuccessAction
			);
		}

		case CartActions.CartTypes.CartListProductsFail: {
			return {
				...state,
				cartListProducts: {
					failed: true,
				},
			};
		}

		default:
			return state;
	}
}
function handleCartDataSuccess(
	state: CartState,
	action: CartActions.CartDataSuccessAction
): CartState {
	if (
		typeof action.payload["products"] !== "undefined" &&
		typeof action.payload["data"] !== "undefined"
	) {
		return {
			...state,
			cartData: {
				...state.cartData,
				cartAllData: action.payload,
				cartProducts: action.payload["products"],
				cartTotal: action.payload["data"]["totals"],
			},
		};
	} else if (
		typeof action.payload["data"] !== "undefined" &&
		typeof action.payload["data"]["totals"] !== "undefined"
	) {
		return {
			...state,
			cartData: {
				...state.cartData,
				cartAllData: action.payload,
				cartTotal: action.payload["data"]["totals"],
			},
		};
	} else {
		return {
			...state,
			cartData: {
				...state.cartData,
				cartData: "",
			},
		};
	}
}

function handleCartAccessorySuccess(
	state: CartState,
	action: CartActions.CartAccessorySuccessAction
): CartState {
	return {
		...state,
		cartAccessory: action.payload,
	};
}

function handleCartListProductsSuccess(
	state: CartState,
	action: CartActions.CartListProductsSuccessAction
): CartState {
	return {
		...state,
		cartListProducts: action.payload,
	};
}
export const getCartProducts = (state: CartState) =>
	state.cartData["cartProducts"];
export const getCartTotals = (state: CartState) => state.cartData["cartTotal"];
export const getCartId = (state: CartState) => state.cartData["cartAllData"];
export const getCartDataFailed = (state: CartState) => state.cartData;
export const getCartAccessories = (state: CartState) => state.cartAccessory;
export const getCartAccessoriesFailed = (state: CartState) =>
	state.cartAccessory;
export const getCartListProducts = (state: CartState) => state.cartListProducts;
export const getCartListProductsFailed = (state: CartState) =>
	state.cartListProducts;
