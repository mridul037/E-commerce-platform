import { Action } from "@ngrx/store";
import * as PaymentSuccessActions from "../actions/payment-success.actions";

export interface PaymentSuccessState {
	paymentData: object;
	googleConversionStatusChangeData: object;
}

export const initialState: PaymentSuccessState = {
	paymentData: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
	googleConversionStatusChangeData: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
};

export function reducer(
	state = initialState,
	action: Action
): PaymentSuccessState {
	switch (action.type) {
		case PaymentSuccessActions.PaymentSuccessTypes.LoadPaymentSuccessData: {
			return {
				...state,
				paymentData: {
					loading: true,
				},
			};
		}
		case PaymentSuccessActions.PaymentSuccessTypes.PaymentSuccessDataSuccess: {
			return handlePaymentSuccessDataSuccess(
				state,
				action as PaymentSuccessActions.PaymentSuccessDataSuccessAction
			);
		}
		case PaymentSuccessActions.PaymentSuccessTypes.PaymentSuccessDataFail: {
			return {
				...state,
				paymentData: {
					failed: true,
				},
			};
		}
		case PaymentSuccessActions.PaymentSuccessTypes
			.LoadGoogleConversionStatusChange: {
			return {
				...state,
				googleConversionStatusChangeData: {
					loading: true,
				},
			};
		}
		case PaymentSuccessActions.PaymentSuccessTypes
			.GoogleConversionStatusChangeSuccess: {
			return handleGoogleConversionStatusChangeSuccess(
				state,
				action as PaymentSuccessActions.GoogleConversionStatusChangeSuccessAction
			);
		}
		case PaymentSuccessActions.PaymentSuccessTypes
			.GoogleConversionStatusChangeFail: {
			return {
				...state,
				googleConversionStatusChangeData: {
					failed: true,
				},
			};
		}
		default:
			return state;
	}
}

function handlePaymentSuccessDataSuccess(
	state: PaymentSuccessState,
	action: PaymentSuccessActions.PaymentSuccessDataSuccessAction
): PaymentSuccessState {
	return {
		...state,
		paymentData: action.payload,
	};
}

function handleGoogleConversionStatusChangeSuccess(
	state: PaymentSuccessState,
	action: PaymentSuccessActions.GoogleConversionStatusChangeSuccessAction
): PaymentSuccessState {
	return {
		...state,
		googleConversionStatusChangeData: action.payload,
	};
}
export const getPaymentSuccessData = (state: PaymentSuccessState) =>
	state.paymentData;
export const getPaymentSuccessDataFailed = (state: PaymentSuccessState) =>
	state.paymentData;

export const getGoogleConversionStatusChange = (state: PaymentSuccessState) =>
	state.googleConversionStatusChangeData;
export const getGoogleConversionStatusChangeFailed = (
	state: PaymentSuccessState
) => state.googleConversionStatusChangeData;
