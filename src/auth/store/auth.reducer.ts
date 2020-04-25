import { Action } from "@ngrx/store";
import * as authActions from "../store/auth.actions";
import {
	RequestType,
	AuthMessageResponseType,
	defaultMessage,
} from "../auth.enum";

export interface AuthState {
	getOTP: object;
	verifyOTP: object;
	register: object;
	socialLogin: object;
	login: object;
	forgetPassword: object;
}

export const initialState: AuthState = {
	getOTP: {
		loading: false,
		loaded: false,
		failed: false,
		error: undefined,
		response: undefined,
	},
	verifyOTP: {
		loading: false,
		loaded: false,
		failed: false,
		error: undefined,
		response: undefined,
	},
	register: {
		loading: false,
		loaded: false,
		failed: false,
		error: undefined,
		response: undefined,
	},
	socialLogin: {
		loading: false,
		loaded: false,
		failed: false,
		error: undefined,
		response: undefined,
	},
	login: {
		response: undefined,
	},
	forgetPassword: {
		loading: false,
		loaded: false,
		failed: false,
		error: undefined,
		response: undefined,
	},
};

export function reducer(
	state: AuthState = initialState,
	action: Action
): AuthState {
	switch (action.type) {
		case authActions.AuthActionTypes.GetOTP: {
			return {
				...state,
				getOTP: {
					...state.getOTP,
					loading: true,
				},
			};
		}

		case authActions.AuthActionTypes.GetOTPSuccess: {
			return handleGetOTPSuccess(state, action as authActions.GetOTPSuccess);
		}
		case authActions.AuthActionTypes.GetOTPFail: {
			return handleGetOTPFail(state, action as authActions.GetOTPFail);
		}
		case authActions.AuthActionTypes.ResetGetOTPFailState: {
			return {
				...state,
				getOTP: {
					...state.getOTP,
					failed: false,
					loading: false,
					loaded: false,
					error: undefined,
					response: undefined,
				},
			};
		}

		case authActions.AuthActionTypes.VerifyOTP: {
			return {
				...state,
				verifyOTP: {
					...state.verifyOTP,
					loading: true,
				},
			};
		}

		case authActions.AuthActionTypes.VerifyOTPSuccess: {
			return handleVerifyOTPSuccess(
				state,
				action as authActions.VerifyOTPSuccess
			);
		}
		case authActions.AuthActionTypes.VerifyOTPFail: {
			return handleVerifyOTPFail(state, action as authActions.VerifyOTPFail);
		}
		case authActions.AuthActionTypes.ResetVerifyOTPFailState: {
			return {
				...state,
				verifyOTP: {
					loading: false,
					loaded: false,
					failed: false,
					error: undefined,
					response: undefined,
				},
			};
		}

		case authActions.AuthActionTypes.Register: {
			return {
				...state,
				register: {
					...state.register,
					loading: true,
				},
			};
		}

		case authActions.AuthActionTypes.RegisterSuccess: {
			return handleRegisterSuccess(
				state,
				action as authActions.RegisterSuccess
			);
		}
		case authActions.AuthActionTypes.RegisterFail: {
			return handleRegisterFail(state, action as authActions.RegisterFail);
		}
		case authActions.AuthActionTypes.ResetRegisterState: {
			return {
				...state,
				register: {
					loading: false,
					loaded: false,
					failed: false,
					error: undefined,
					response: undefined,
				},
			};
		}

		case authActions.AuthActionTypes.SocialLogin: {
			return {
				...state,
				socialLogin: {
					...state.socialLogin,
					loading: true,
				},
			};
		}

		case authActions.AuthActionTypes.SocialLoginSuccess: {
			return handleSocialLoginSuccess(
				state,
				action as authActions.SocialLoginSuccess
			);
		}

		case authActions.AuthActionTypes.ResetSocialAuthState: {
			return {
				...state,
				socialLogin: {
					loading: false,
					loaded: false,
					failed: false,
					error: undefined,
					response: undefined,
				},
				login: {
					response: undefined,
				},
			};
		}

		case authActions.AuthActionTypes.DoLoginAction: {
			return handleDoLoginAction(state, action as authActions.DoLoginAction);
		}
		case authActions.AuthActionTypes.ForgetPassword: {
			return {
				...state,
				forgetPassword: {
					...state.forgetPassword,
					loading: true,
				},
			};
		}

		case authActions.AuthActionTypes.ForgetPasswordSuccess: {
			return handleForgetPasswordSuccess(
				state,
				action as authActions.ForgetPasswordSuccessAction
			);
		}
		case authActions.AuthActionTypes.ForgetPasswordFail: {
			return {
				...state,
				forgetPassword: {
					failed: true,
				},
			};
		}

		default: {
			return state;
		}
	}
}

function handleGetOTPSuccess(
	state: AuthState,
	action: authActions.GetOTPSuccess
): AuthState {
	return {
		...state,
		getOTP: {
			...state.getOTP,
			loaded: true,
			response: {
				...action.payload["data"],
				success: action.payload["success"],
			},
		},
	};
}

function handleGetOTPFail(
	state: AuthState,
	action: authActions.GetOTPFail
): AuthState {
	if (
		typeof action.payload["error"] !== "undefined" &&
		Object.keys(action.payload["error"]).length > 0
	) {
		return {
			...state,
			getOTP: {
				failed: true,
				error: {
					message: action.payload["error"]["message"],
					type: action.payload["error"]["type"],
					field:
						typeof action.payload["error"] !== "undefined" &&
						typeof action.payload["error"]["field"] !== "undefined"
							? action.payload["error"]["field"]
							: "default",
					...(typeof action.payload["data"] !== "undefined" &&
						typeof action.payload["data"]["type"] !== "undefined" && {
							requestType: action.payload["data"]["type"],
						}),
					...(typeof action.payload["error"]["display"] !== "undefined" && {
						display: action.payload["error"]["display"],
					}),
					...(typeof action.payload["data"] !== "undefined" &&
						typeof action.payload["data"]["OTPEndTime"] !== "undefined" && {
							endTimeout: action.payload["data"]["OTPEndTime"],
						}),
				},
				response: {
					...(typeof action.payload["data"] !== "undefined" &&
						typeof action.payload["data"]["OTPEndTime"] !== "undefined" && {
							OTPEndTime: action.payload["data"]["OTPEndTime"],
						}),
				},
			},
		};
	} else {
		return {
			...state,
			getOTP: {
				failed: true,
				error: {
					message: defaultMessage,
					type: AuthMessageResponseType.UNKNOWN_ERROR,
				},
			},
		};
	}
}

function handleVerifyOTPSuccess(
	state: AuthState,
	action: authActions.VerifyOTPSuccess
): AuthState {
	if (action.payload["data"]["type"] === RequestType.REGISTER) {
		return {
			...state,
			verifyOTP: {
				...state.verifyOTP,
				loaded: true,
				response: action.payload["data"]["tempToken"],
			},
		};
	} else if (action.payload["data"]["type"] === RequestType.LOGIN) {
		return {
			...state,
			verifyOTP: {
				...state.verifyOTP,
				loaded: true,
				response: action.payload["data"]["token"],
			},
		};
	} else if (action.payload["data"]["type"] === RequestType.SOCIAL_LOGIN) {
		return {
			...state,
			verifyOTP: {
				...state.verifyOTP,
				loaded: true,
				response: {
					token: action.payload["data"]["token"],
					type: action.payload["data"]["type"],
				},
			},
		};
	} else {
		return {
			...state,
			verifyOTP: {
				...state.verifyOTP,
				loaded: true,
				response: {
					...action.payload["data"],
				},
			},
		};
	}
}

function handleVerifyOTPFail(
	state: AuthState,
	action: authActions.VerifyOTPFail
): AuthState {
	if (
		typeof action.payload["error"] !== "undefined" &&
		Object.keys(action.payload["error"]).length > 0
	) {
		return {
			...state,
			verifyOTP: {
				failed: true,
				error: {
					message: action.payload["error"]["message"],
					type: action.payload["error"]["type"],
					field:
						typeof action.payload["error"] !== "undefined" &&
						typeof action.payload["error"]["field"] !== "undefined"
							? action.payload["error"]["field"]
							: "default",
					...(typeof action.payload["data"] !== "undefined" &&
						typeof action.payload["data"]["type"] !== "undefined" && {
							requestType: action.payload["data"]["type"],
						}),
					...(typeof action.payload["error"]["display"] !== "undefined" && {
						display: action.payload["error"]["display"],
					}),
				},
			},
		};
	} else {
		return {
			...state,
			verifyOTP: {
				failed: true,
				error: {
					message: defaultMessage,
					type: AuthMessageResponseType.UNKNOWN_ERROR,
					field: "default",
				},
			},
		};
	}
}

function handleRegisterSuccess(
	state: AuthState,
	action: authActions.RegisterSuccess
): AuthState {
	return {
		...state,
		register: {
			...state.register,
			loaded: true,
			response: action.payload["data"]["token"],
		},
	};
}

function handleRegisterFail(
	state: AuthState,
	action: authActions.RegisterFail
): AuthState {
	if (
		typeof action.payload["error"] !== "undefined" &&
		Object.keys(action.payload["error"]).length > 0
	) {
		return {
			...state,
			register: {
				failed: true,
				error: {
					message: action.payload["error"]["message"],
					type: action.payload["error"]["type"],
					field:
						typeof action.payload["error"] !== "undefined" &&
						typeof action.payload["error"]["field"] !== "undefined"
							? action.payload["error"]["field"]
							: "default",
					...(typeof action.payload["data"] !== "undefined" &&
						typeof action.payload["data"]["type"] !== "undefined" && {
							requestType: action.payload["data"]["type"],
						}),
					...(typeof action.payload["error"]["display"] !== "undefined" && {
						display: action.payload["error"]["display"],
					}),
				},
			},
		};
	} else {
		return {
			...state,
			register: {
				failed: true,
				error: {
					message: defaultMessage,
					type: AuthMessageResponseType.UNKNOWN_ERROR,
					field: "default",
				},
			},
		};
	}
}

function handleSocialLoginSuccess(
	state: AuthState,
	action: authActions.SocialLoginSuccess
): AuthState {
	return {
		...state,
		socialLogin: {
			response: {
				registered: action.payload["registered"],
				mongoId: action.payload["_id"],
				type: action.payload["type"],
			},
		},
	};
}

function handleDoLoginAction(
	state: AuthState,
	action: authActions.DoLoginAction
): AuthState {
	return {
		...state,
		login: {
			response: action.payload["token"],
		},
	};
}
function handleForgetPasswordSuccess(
	state: AuthState,
	action: authActions.ForgetPasswordSuccessAction
): AuthState {
	return {
		...state,
		forgetPassword: {
			...state.forgetPassword,
			loaded: true,
			response: action.payload,
		},
	};
}
/**
 * Auth Selectors
 */
export const getOTPSuccessResponse = (state: AuthState) =>
	state.getOTP["response"];
export const getOTPFailError = (state: AuthState) => state.getOTP["error"];
export const getOTPVerifiedToken = (state: AuthState) =>
	state.verifyOTP["response"];
export const getRegisteredUserToken = (state: AuthState) =>
	state.register["response"];
export const getRegisterFailError = (state: AuthState) =>
	state.register["error"];
export const getVerifyOTPFailError = (state: AuthState) =>
	state.verifyOTP["error"];
export const getSocialLoginSuccessResponse = (state: AuthState) =>
	state.socialLogin["response"];
export const getSocialLoginToken = (state: AuthState) =>
	state.login["response"];
export const forgetPassword = (state: AuthState) =>
	state.forgetPassword["response"];
export const forgetPasswordFailError = (state: AuthState) =>
	state.forgetPassword["error"];
