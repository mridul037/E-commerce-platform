import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, filter } from "rxjs/operators";
import * as CheckoutActions from "../actions/checkout.actions";
import { CheckoutApiClientService } from "../../../checkout/checkout-api-client.service";

@Injectable()
export class CheckoutEffects {
	constructor(
		private actions$: Actions,
		public checkoutApiClient: CheckoutApiClientService
	) {}

	/**
	 * Checkout Effect
	 */
	@Effect()
	loadCheckoutCountry$: Observable<Action> = this.actions$.pipe(
		ofType(CheckoutActions.CheckoutTypes.LoadCheckoutCountry),
		map(
			(action: CheckoutActions.LoadCheckoutCountriesAction) => action.payload
		),
		switchMap(state => {
			return this.checkoutApiClient.getCheckoutCountry(state).pipe(
				map(countryData => {
					return new CheckoutActions.CheckoutCountriesSuccessAction(
						countryData
					);
				}),
				catchError(error =>
					of(new CheckoutActions.CheckoutCountriesFailAction())
				)
			);
		})
	);
	@Effect()
	loadCheckoutState$: Observable<Action> = this.actions$.pipe(
		ofType(CheckoutActions.CheckoutTypes.LoadCheckoutState),
		map((action: CheckoutActions.LoadCheckoutStatesAction) => action.payload),
		switchMap(state => {
			return this.checkoutApiClient.getCountryState(state).pipe(
				map(stateData => {
					return new CheckoutActions.CheckoutStatesSuccessAction(stateData);
				}),
				catchError(error => of(new CheckoutActions.CheckoutStatesFailAction()))
			);
		})
	);
	@Effect()
	loadCheckoutPincode$: Observable<Action> = this.actions$.pipe(
		ofType(CheckoutActions.CheckoutTypes.LoadCheckoutPincode),
		map((action: CheckoutActions.LoadCheckoutPincodesAction) => action.payload),
		switchMap(state => {
			return this.checkoutApiClient.getCheckoutPincode(state).pipe(
				map(pincodeData => {
					return new CheckoutActions.CheckoutPincodesSuccessAction(pincodeData);
				}),
				catchError(error =>
					of(new CheckoutActions.CheckoutPincodesFailAction())
				)
			);
		})
	);

	@Effect()
	addNewAddress$: Observable<Action> = this.actions$.pipe(
		ofType(CheckoutActions.CheckoutTypes.AddNewCheckoutAddress),
		map(
			(action: CheckoutActions.AddNewCheckoutAddressAction) => action.payload
		),
		switchMap(state => {
			return this.checkoutApiClient.addCheckoutNewAddress(state).pipe(
				//filter(response => typeof response !== "undefined"),
				map(addressData => {
					return new CheckoutActions.AddNewCheckoutAddressSuccessAction(
						addressData
					);
				}),
				catchError(error =>
					of(new CheckoutActions.AddNewCheckoutAddressFailAction())
				)
			);
		})
	);
	@Effect()
	loadPaymentList$: Observable<Action> = this.actions$.pipe(
		ofType(CheckoutActions.CheckoutTypes.LoadCheckoutPaymentList),
		map((action: CheckoutActions.CheckoutPaymentListAction) => action.payload),
		switchMap(state => {
			return this.checkoutApiClient.checkoutPaymentLists(state["cartId"]).pipe(
				map(paymentList => {
					return new CheckoutActions.CheckoutPaymentListSuccessAction(
						paymentList
					);
				}),
				catchError(error =>
					of(new CheckoutActions.CheckoutPaymentListFailAction())
				)
			);
		})
	);
}
