import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, filter, map, switchMap, exhaustMap } from "rxjs/operators";
import { BrandSpecificCasesApiClientService } from "../brand-specific-cases-api-client.service";
import * as BrandSpecificCaseActions from "./brand-specific-cases.action";

@Injectable()
export class BrandSpecificCasesEffect {
	constructor(
		private actions$: Actions,
		public brandSpecificCasesApiClientService: BrandSpecificCasesApiClientService
	) {}
	/**Brand  Data Effect */
	@Effect()
	intermediateData$: Observable<Action> = this.actions$.pipe(
		ofType(
			BrandSpecificCaseActions.BrandSpecificCasesActionsTypes
				.GetIntermediateDataLoad
		),
		map(
			(action: BrandSpecificCaseActions.GetIntermediateDataLoadAction) =>
				action.payload
		),
		switchMap((queryParams: object) => {
			return this.brandSpecificCasesApiClientService
				.getBrandSpecificCases(queryParams)
				.pipe(
					filter(cases => typeof cases !== "undefined"),
					map(productList => {
						return new BrandSpecificCaseActions.GetIntermediateDataSuccessAction(
							productList
						);
					}),
					catchError(error =>
						of(new BrandSpecificCaseActions.GetIntermediateDataFailAction())
					)
				);
		})
	);
	/**
	 * Listing Footer Content Effect
	 */
	@Effect()
	loadListingContent$: Observable<Action> = this.actions$.pipe(
		ofType(
			BrandSpecificCaseActions.BrandSpecificCasesActionsTypes
				.BrandPageFooterContent
		),
		map(
			(action: BrandSpecificCaseActions.BrandPageFooterContentAction) =>
				action.payload
		),
		exhaustMap(state => {
			return this.brandSpecificCasesApiClientService
				.getListingContent(state)
				.pipe(
					filter(brandContentResponse => {
						return typeof brandContentResponse !== "undefined";
					}),
					map(brandContentResponse => {
						return new BrandSpecificCaseActions.BrandPageFooterContentSuccessAction(
							brandContentResponse
						);
					}),
					catchError(error =>
						of(new BrandSpecificCaseActions.BrandPageFooterContentFailAction())
					)
				);
		})
	);
}
