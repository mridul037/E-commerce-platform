import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as ContactUsActions from "../actions/contact-us.actions";
import { ContactUsApiClientService } from "../../../contact-us/contact-us-api-client.service";

@Injectable()
export class ContactUsEffects {
	constructor(
		private actions$: Actions,
		public contactUsApiClient: ContactUsApiClientService
	) {}

	/**
	 * Contact Us Effect
	 */
	@Effect()
	loadContactUsOption$: Observable<Action> = this.actions$.pipe(
		ofType(ContactUsActions.ContactUsTypes.LoadContactUsOptions),
		map(
			(action: ContactUsActions.LoadContactUsOptionsAction) => action.payload
		),
		switchMap(state => {
			return this.contactUsApiClient.getContactUsOptions().pipe(
				map(contactUsOptions => {
					return new ContactUsActions.ContactUsOptionsSuccessAction(
						contactUsOptions
					);
				}),
				catchError(error =>
					of(new ContactUsActions.ContactUsOptionsFailAction())
				)
			);
		})
	);

	@Effect()
	loadContactUsEmails$: Observable<Action> = this.actions$.pipe(
		ofType(ContactUsActions.ContactUsTypes.LoadContactUsEmails),
		map((action: ContactUsActions.LoadContactUsEmailsAction) => action.payload),
		switchMap(state => {
			return this.contactUsApiClient.getContactUsEmails(state).pipe(
				map(contactUsEmails => {
					return new ContactUsActions.ContactUsEmailsSuccessAction(
						contactUsEmails
					);
				}),
				catchError(error =>
					of(new ContactUsActions.ContactUsEmailsFailAction())
				)
			);
		})
	);
	@Effect()
	loadContactUsOrders$: Observable<Action> = this.actions$.pipe(
		ofType(ContactUsActions.ContactUsTypes.LoadContactUsOrders),
		map((action: ContactUsActions.LoadContactUsOrdersAction) => action.payload),
		switchMap(state => {
			return this.contactUsApiClient.getContactUsOrders(state).pipe(
				map(contactUsOrders => {
					return new ContactUsActions.ContactUsOrdersSuccessAction(
						contactUsOrders
					);
				}),
				catchError(error =>
					of(new ContactUsActions.ContactUsOrdersFailAction())
				)
			);
		})
	);
	@Effect()
	loadContactUsForm$: Observable<Action> = this.actions$.pipe(
		ofType(ContactUsActions.ContactUsTypes.SubmitContactUsForm),
		map((action: ContactUsActions.SubmitContactUsFormAction) => action.payload),
		switchMap(state => {
			return this.contactUsApiClient.submitContactUsForm(state).pipe(
				map(FormResponse => {
					return new ContactUsActions.SubmitContactUsFormSuccessAction(
						FormResponse
					);
				}),
				catchError(error =>
					of(new ContactUsActions.ContactUsOrdersFailAction())
				)
			);
		})
	);
}
