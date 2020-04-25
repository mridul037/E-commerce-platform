import { Action } from "@ngrx/store";
import * as CheckoutActions from "../actions/checkout.actions";

export interface CheckoutState {
	checkoutCountry: object;
	checkoutState: object;
	checkoutPincode: object;
	checkoutNewAddress: object;
	checkoutPaymentList: object;
}

export const initialState: CheckoutState = {
	checkoutCountry: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
	checkoutState: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
	checkoutPincode: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
	checkoutNewAddress: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
	checkoutPaymentList: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
};

export function reducer(state = initialState, action: Action): CheckoutState {
	switch (action.type) {
		case CheckoutActions.CheckoutTypes.LoadCheckoutCountry: {
			return {
				...state,
				checkoutCountry: {
					loading: true,
				},
			};
		}

		case CheckoutActions.CheckoutTypes.CheckoutCountrySuccess: {
			return handleCheckoutCountrySuccess(
				state,
				action as CheckoutActions.CheckoutCountriesSuccessAction
			);
		}

		case CheckoutActions.CheckoutTypes.CheckoutCountryFail: {
			return {
				...state,
				checkoutCountry: {
					failed: true,
				},
			};
		}
		case CheckoutActions.CheckoutTypes.LoadCheckoutState: {
			return {
				...state,
				checkoutState: {
					loading: true,
				},
			};
		}

		case CheckoutActions.CheckoutTypes.CheckoutStateSuccess: {
			return handleCheckoutStateSuccess(
				state,
				action as CheckoutActions.CheckoutStatesSuccessAction
			);
		}

		case CheckoutActions.CheckoutTypes.CheckoutStateFail: {
			return {
				...state,
				checkoutState: {
					failed: true,
				},
			};
		}
		case CheckoutActions.CheckoutTypes.LoadCheckoutPincode: {
			return {
				...state,
				checkoutPincode: {
					loading: true,
				},
			};
		}

		case CheckoutActions.CheckoutTypes.CheckoutPincodeSuccess: {
			return handleCheckoutPincodeSuccess(
				state,
				action as CheckoutActions.CheckoutPincodesSuccessAction
			);
		}

		case CheckoutActions.CheckoutTypes.CheckoutPincodeFail: {
			return {
				...state,
				checkoutPincode: {
					failed: true,
				},
			};
		}
		case CheckoutActions.CheckoutTypes.AddNewCheckoutAddress: {
			return {
				...state,
				checkoutNewAddress: {
					loading: true,
				},
			};
		}

		case CheckoutActions.CheckoutTypes.AddNewCheckoutAddressSuccess: {
			return handleCheckoutNewAddressSuccess(
				state,
				action as CheckoutActions.AddNewCheckoutAddressSuccessAction
			);
		}

		case CheckoutActions.CheckoutTypes.AddNewCheckoutAddressFail: {
			return {
				...state,
				checkoutNewAddress: {
					failed: true,
				},
			};
		}
		case CheckoutActions.CheckoutTypes.LoadCheckoutPaymentList: {
			return {
				...state,
				checkoutPaymentList: {
					loading: true,
				},
			};
		}

		case CheckoutActions.CheckoutTypes.CheckoutPaymentListSuccess: {
			return handleCheckoutPaymentListSuccess(
				state,
				action as CheckoutActions.CheckoutPaymentListSuccessAction
			);
		}

		case CheckoutActions.CheckoutTypes.CheckoutPaymentListFail: {
			return {
				...state,
				checkoutPaymentList: {
					failed: true,
				},
			};
		}
		default:
			return state;
	}
}

function handleCheckoutCountrySuccess(
	state: CheckoutState,
	action: CheckoutActions.CheckoutCountriesSuccessAction
): CheckoutState {
	return {
		...state,
		checkoutCountry: action.payload,
	};
}
function handleCheckoutStateSuccess(
	state: CheckoutState,
	action: CheckoutActions.CheckoutStatesSuccessAction
): CheckoutState {
	return {
		...state,
		checkoutState: action.payload,
	};
}
function handleCheckoutPincodeSuccess(
	state: CheckoutState,
	action: CheckoutActions.CheckoutPincodesSuccessAction
): CheckoutState {
	return {
		...state,
		checkoutPincode: {
			success: true,
			response: action.payload,
		},
	};
}

function handleCheckoutNewAddressSuccess(
	state: CheckoutState,
	action: CheckoutActions.AddNewCheckoutAddressSuccessAction
): CheckoutState {
	return {
		...state,
		checkoutNewAddress: {
			success: true,
			response: action.payload,
		},
	};
}
function handleCheckoutPaymentListSuccess(
	state: CheckoutState,
	action: CheckoutActions.CheckoutPaymentListSuccessAction
): CheckoutState {
	return {
		...state,
		checkoutPaymentList: {
			success: true,
			response: action.payload,
		},
	};
}
export const getCheckoutCountry = (state: CheckoutState) =>
	state.checkoutCountry;
export const getCheckoutCountryFailed = (state: CheckoutState) =>
	state.checkoutCountry;
export const getCountryState = (state: CheckoutState) => state.checkoutState;
export const getCheckoutStateFailed = (state: CheckoutState) =>
	state.checkoutState;
export const getCheckoutPincode = (state: CheckoutState) =>
	state.checkoutPincode;
export const getCheckoutPincodeFailed = (state: CheckoutState) =>
	state.checkoutPincode;

export const addCheckoutNewAddress = (state: CheckoutState) =>
	state.checkoutNewAddress;
export const addCheckoutNewAddressFailed = (state: CheckoutState) =>
	state.checkoutNewAddress;
export const checkoutPaymentLists = (state: CheckoutState) =>
	state.checkoutPaymentList;
export const checkoutPaymentListsFailed = (state: CheckoutState) =>
	state.checkoutPaymentList;
