import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import {
	catchError,
	map,
	mergeMap,
	skipUntil,
	switchMap,
	filter,
} from "rxjs/operators";
import { CustomCasesApiClientService } from "../../../custom-cases-brand-model/custom-cases-api-client.service";
import * as CustomCaseActions from "../actions/custom-cases.actions";

@Injectable()
export class PdpEffects {
	constructor(
		private actions$: Actions,
		public pdpApiClient: CustomCasesApiClientService
	) {}

	/**
	 * Current Offer Effect
	 */
	@Effect()
	loadCurrentOffer$: Observable<Action> = this.actions$.pipe(
		ofType(CustomCaseActions.CustomCaseActionTypes.CurrentOffersLoad),
		filter((action: CustomCaseActions.CurrentOffersLoadAction) => {
			return typeof action["payload"] !== "undefined";
		}),
		map((action: CustomCaseActions.CurrentOffersLoadAction) => action.payload),
		switchMap(state => {
			return this.pdpApiClient.getCurrentOffer(state).pipe(
				map(currentOffer => {
					return new CustomCaseActions.CurrentOffersSuccessAction(currentOffer);
				}),
				catchError(error => of(new CustomCaseActions.CurrentOffersFailAction()))
			);
		})
	);
}
