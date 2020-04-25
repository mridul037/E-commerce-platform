export const enum RequestType {
	REGISTER = "register",
	LOGIN = "login",
	SOCIAL_LOGIN = "socialLogin",
}

export const enum AuthMessageResponseType {
	ALREADY_SENT = "alreadySent",
	INCORRECT_NUMBER = "incorrectNumber",
	UNREGISTERED_USER = "unregisteredUser",
	INVALID_OTP = "invalidOTP",
	UNAUTHORIZED_USER = "unauthorizedUser",
	UNKNOWN_ERROR = "unknownError",
	MISSING_PARAMETERS = "missingParameters",
	INVALID_REQUEST_TYPE = "invalidRequestType",
	EXCEEDED_LIMIT = "exceededLimit",
	ALREADY_REGISTERED = "alreadyRegistered",
	EMAIL_ALREADY_IN_USE = "emailAlreadyInUse",
	NUMBER_ALREADY_IN_USE = "numberAlreadyInUse",
}

export const enum ErrorField {
	OTP = "otp",
	MOBILE_NUMBER = "mobileNumber",
	EMAIL = "email",
	DEFAULT = "default",
}

export const enum FacebookLoginStatus {
	CONNECTED = "connected",
	NOT_AUTHORIZED = "not-authorized",
}

export const enum OAuth {
	FACEBOOK = "facebook",
	GOOGLE = "google",
}

export const enum socialQueryParamType {
	SOCIAL_GOOGLE = "social-google",
	SOCIAL_FACEBOOK = "social-facebook",
}

export const defaultMessage = "Something Went Wrong. Try Again Later.";
