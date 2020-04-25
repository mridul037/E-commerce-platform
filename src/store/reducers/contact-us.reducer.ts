import { Action } from "@ngrx/store";
import * as ContactUsActions from "../actions/contact-us.actions";

export interface ContactUsState {
	contactUsOptions: object;
	contactUsEmails: object;
	contactUsOrders: object;
	contactUsForm: object;
}

export const initialState: ContactUsState = {
	contactUsOptions: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
	contactUsEmails: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
	contactUsOrders: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
	contactUsForm: {
		loading: false,
		sucess: false,
		failed: false,
		response: Object,
	},
};

export function reducer(state = initialState, action: Action): ContactUsState {
	switch (action.type) {
		case ContactUsActions.ContactUsTypes.LoadContactUsOptions: {
			return {
				...state,
				contactUsOptions: {
					loading: true,
				},
			};
		}

		case ContactUsActions.ContactUsTypes.ContactUsOptionsSuccess: {
			return handleContactUsOptionsSuccess(
				state,
				action as ContactUsActions.ContactUsOptionsSuccessAction
			);
		}

		case ContactUsActions.ContactUsTypes.ContactUsOptionsFail: {
			return {
				...state,
				contactUsOptions: {
					failed: true,
				},
			};
		}

		case ContactUsActions.ContactUsTypes.LoadContactUsEmails: {
			return {
				...state,
				contactUsEmails: {
					loading: true,
				},
			};
		}

		case ContactUsActions.ContactUsTypes.ContactUsEmailsSuccess: {
			return handleContactUsEmailsSuccess(
				state,
				action as ContactUsActions.ContactUsEmailsSuccessAction
			);
		}

		case ContactUsActions.ContactUsTypes.ContactUsEmailsFail: {
			return {
				...state,
				contactUsEmails: {
					failed: true,
				},
			};
		}
		case ContactUsActions.ContactUsTypes.LoadContactUsOrders: {
			return {
				...state,
				contactUsOrders: {
					loading: true,
				},
			};
		}

		case ContactUsActions.ContactUsTypes.ContactUsOrdersSuccess: {
			return handleContactUsOrdersSuccess(
				state,
				action as ContactUsActions.ContactUsOrdersSuccessAction
			);
		}

		case ContactUsActions.ContactUsTypes.ContactUsOrdersFail: {
			return {
				...state,
				contactUsOrders: {
					failed: true,
				},
			};
		}
		case ContactUsActions.ContactUsTypes.SubmitContactUsForm: {
			return {
				...state,
				contactUsForm: {
					loading: true,
				},
			};
		}

		case ContactUsActions.ContactUsTypes.SubmitContactUsFormSuccess: {
			return handleContactUsSubmitFormSuccess(
				state,
				action as ContactUsActions.SubmitContactUsFormSuccessAction
			);
		}

		case ContactUsActions.ContactUsTypes.SubmitContactUsFormFail: {
			return {
				...state,
				contactUsForm: {
					failed: true,
				},
			};
		}

		case ContactUsActions.ContactUsTypes.ResetContactUsFormState: {
			return {
				...state,
				contactUsForm: {
					loading: false,
					sucess: false,
					failed: false,
					response: Object,
				},
			};
		}

		default:
			return state;
	}
}

function handleContactUsOptionsSuccess(
	state: ContactUsState,
	action: ContactUsActions.ContactUsOptionsSuccessAction
): ContactUsState {
	return {
		...state,
		contactUsOptions: action.payload,
	};
}
function handleContactUsEmailsSuccess(
	state: ContactUsState,
	action: ContactUsActions.ContactUsEmailsSuccessAction
): ContactUsState {
	return {
		...state,
		contactUsEmails: action.payload,
	};
}
function handleContactUsOrdersSuccess(
	state: ContactUsState,
	action: ContactUsActions.ContactUsOrdersSuccessAction
): ContactUsState {
	return {
		...state,
		contactUsOrders: action.payload,
	};
}
function handleContactUsSubmitFormSuccess(
	state: ContactUsState,
	action: ContactUsActions.SubmitContactUsFormSuccessAction
): ContactUsState {
	return {
		...state,
		contactUsForm: action.payload,
	};
}
export const getContactUsOptions = (state: ContactUsState) =>
	state.contactUsOptions;
export const getContactUsOptionsFailed = (state: ContactUsState) =>
	state.contactUsOptions;
export const getContactUsEmails = (state: ContactUsState) =>
	state.contactUsEmails;
export const getContactUsEmailsFailed = (state: ContactUsState) =>
	state.contactUsEmails;
export const getContactUsOrders = (state: ContactUsState) =>
	state.contactUsOrders;
export const getContactUsOrdersFailed = (state: ContactUsState) =>
	state.contactUsOrders;
export const submitContactUsForm = (state: ContactUsState) =>
	state.contactUsForm;
export const submitContactUsFormFailed = (state: ContactUsState) =>
	state.contactUsForm;
