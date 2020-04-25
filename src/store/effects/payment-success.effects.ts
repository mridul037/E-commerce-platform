import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as PaymentSuccessActions from "../actions/payment-success.actions";
import { PaymentSuccessApiClientService } from "../../../payment-success/payment-success-api-client.service";

@Injectable()
export class PaymentSuccessEffects {
	constructor(
		private actions$: Actions,
		public paymentSuccessApiClient: PaymentSuccessApiClientService
	) {}

	/**
	 * Payment Success Effect
	 */
	@Effect()
	loadPaymentSuccessData$: Observable<Action> = this.actions$.pipe(
		ofType(PaymentSuccessActions.PaymentSuccessTypes.LoadPaymentSuccessData),
		map(
			(action: PaymentSuccessActions.LoadPaymentSuccessDataAction) =>
				action.payload
		),
		switchMap(state => {
			return this.paymentSuccessApiClient.getPaymentSuccessData(state).pipe(
				map(data => {
					return new PaymentSuccessActions.PaymentSuccessDataSuccessAction(
						data
					);
				}),
				catchError(error =>
					of(new PaymentSuccessActions.PaymentSuccessDataFailAction())
				)
			);
		})
	);

	/**
	 * Payment Success Ga Status Change Effect
	 */

	@Effect()
	loadGoogleConversionStatusChangeData$: Observable<
		Action
	> = this.actions$.pipe(
		ofType(
			PaymentSuccessActions.PaymentSuccessTypes.LoadGoogleConversionStatusChange
		),
		map(
			(action: PaymentSuccessActions.LoadGoogleConversionStatusChangeAction) =>
				action.payload
		),
		switchMap(state => {
			return this.paymentSuccessApiClient
				.getGoogleConversionStatusChange(state)
				.pipe(
					map(data => {
						return new PaymentSuccessActions.GoogleConversionStatusChangeSuccessAction(
							data
						);
					}),
					catchError(error =>
						of(
							new PaymentSuccessActions.GoogleConversionStatusChangeFailAction()
						)
					)
				);
		})
	);
}
