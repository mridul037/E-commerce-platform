import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { BundlesApiClientService } from "../bundles-api-client.service";
import * as BundlesActions from "./bundles.action";

@Injectable()
export class BundlesEffects {
	constructor(
		private actions$: Actions,
		public bundlesApiClient: BundlesApiClientService
	) {}
	/** Intermediate Data Effect */
	@Effect()
	intermediateData$: Observable<Action> = this.actions$.pipe(
		ofType(BundlesActions.BundlesActionsTypes.GetIntermediateDataLoad),
		map(
			(action: BundlesActions.GetIntermediateDataLoadAction) => action.payload
		),
		switchMap((queryParams: object) => {
			return this.bundlesApiClient.getIntermediateData(queryParams).pipe(
				filter(productList => typeof productList !== "undefined"),
				map(productList => {
					return new BundlesActions.GetIntermediateDataSuccessAction(
						productList
					);
				}),
				catchError(error =>
					of(new BundlesActions.GetIntermediateDataFailAction())
				)
			);
		})
	);
}
