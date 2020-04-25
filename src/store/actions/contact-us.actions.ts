import { Action } from "@ngrx/store";

export enum ContactUsTypes {
	LoadContactUsOptions = "[ContactUs] ContactUsOptions Load",
	ContactUsOptionsSuccess = "[ContactUs] ContactUsOptions Success",
	ContactUsOptionsFail = "[ContactUs] ContactUsOptions Fail",

	LoadContactUsEmails = "[ContactUs] ContactUsOrder Load",
	ContactUsEmailsSuccess = "[ContactUs] ContactUsOrder Success",
	ContactUsEmailsFail = "[ContactUs] ContactUsOrder Fail",

	LoadContactUsOrders = "[ContactUs] ContactUsOrder Load",
	ContactUsOrdersSuccess = "[ContactUs] ContactUsOrder Success",
	ContactUsOrdersFail = "[ContactUs] ContactUsOrder Fail",

	SubmitContactUsForm = "[ContactUs] Submit ContactUsForm",
	SubmitContactUsFormSuccess = "[ContactUs] ContactUsForm Success",
	SubmitContactUsFormFail = "[ContactUs] ContactUsForm Fail",

	ResetContactUsFormState = "[ContactUs] Reset Contact-Us Form State",
}

export class LoadContactUsOptionsAction implements Action {
	readonly type = ContactUsTypes.LoadContactUsOptions;

	constructor(public payload: string | object) {}
}

export class ContactUsOptionsSuccessAction implements Action {
	readonly type = ContactUsTypes.ContactUsOptionsSuccess;

	constructor(public payload: object) {}
}

export class ContactUsOptionsFailAction implements Action {
	readonly type = ContactUsTypes.ContactUsOptionsFail;

	constructor() {}
}

export class LoadContactUsEmailsAction implements Action {
	readonly type = ContactUsTypes.LoadContactUsEmails;

	constructor(public payload: object) {}
}

export class ContactUsEmailsSuccessAction implements Action {
	readonly type = ContactUsTypes.ContactUsEmailsSuccess;

	constructor(public payload: object) {}
}

export class ContactUsEmailsFailAction implements Action {
	readonly type = ContactUsTypes.ContactUsEmailsFail;

	constructor() {}
}
export class LoadContactUsOrdersAction implements Action {
	readonly type = ContactUsTypes.LoadContactUsOrders;

	constructor(public payload: object) {}
}

export class ContactUsOrdersSuccessAction implements Action {
	readonly type = ContactUsTypes.ContactUsOrdersSuccess;

	constructor(public payload: object) {}
}

export class ContactUsOrdersFailAction implements Action {
	readonly type = ContactUsTypes.ContactUsOrdersFail;

	constructor() {}
}
export class SubmitContactUsFormAction implements Action {
	readonly type = ContactUsTypes.SubmitContactUsForm;

	constructor(public payload: object) {}
}

export class SubmitContactUsFormSuccessAction implements Action {
	readonly type = ContactUsTypes.SubmitContactUsFormSuccess;

	constructor(public payload: object) {}
}

export class SubmitContactUsFormFailAction implements Action {
	readonly type = ContactUsTypes.SubmitContactUsFormFail;

	constructor() {}
}

export class ResetContactUsFormStateAction implements Action {
	readonly type = ContactUsTypes.ResetContactUsFormState;
}

export type LoadContactUsActions =
	| LoadContactUsOptionsAction
	| ContactUsOptionsSuccessAction
	| ContactUsOptionsFailAction
	| LoadContactUsEmailsAction
	| ContactUsEmailsSuccessAction
	| ContactUsEmailsFailAction
	| LoadContactUsOrdersAction
	| ContactUsOrdersSuccessAction
	| ContactUsOrdersFailAction
	| SubmitContactUsFormAction
	| SubmitContactUsFormSuccessAction
	| SubmitContactUsFormFailAction
	| ResetContactUsFormStateAction;
