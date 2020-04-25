import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { CaseCollectionApiClientService } from "../case-collections-brand-model-api-client.service";
import * as CaseCollectionActions from "../store/case-collection.action";

@Injectable()
export class CaseCollectionsEffects {
	constructor(
		private actions$: Actions,
		public caseCollectionApiClient: CaseCollectionApiClientService
	) {}

	/**Case Collection Intermediate Data Effects */
	@Effect()
	intermediateData$: Observable<Action> = this.actions$.pipe(
		ofType(
			CaseCollectionActions.CaseCollectionActionsTypes.GetIntermediateDataLoad
		),
		map(
			(action: CaseCollectionActions.GetIntermediateDataLoadAction) =>
				action.payload
		),
		switchMap((queryParams: object) => {
			return this.caseCollectionApiClient.getIntermediateData(queryParams).pipe(
				filter(productList => typeof productList !== "undefined"),
				map(productList => {
					return new CaseCollectionActions.GetIntermediateDataSuccessAction(
						productList
					);
				}),
				catchError(error =>
					of(new CaseCollectionActions.GetIntermediateDataFailAction())
				)
			);
		})
	);
}
