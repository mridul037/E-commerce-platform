import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, filter } from "rxjs/operators";
import * as DesignerCasesActions from "../actions/designer-cases.actions";
import { DesignerCasesApiClientService } from "../../../designer-cases/designer-cases-api-client.service";

@Injectable()
export class DesignerCasesEffects {
	constructor(
		private actions$: Actions,
		public designerCasesApiClient: DesignerCasesApiClientService
	) {}
	@Effect()
	loadDesignerCasesCategory$: Observable<Action> = this.actions$.pipe(
		ofType(DesignerCasesActions.DesignerCasesTypes.LoadDesignerCasesCategory),
		map(
			(action: DesignerCasesActions.LoadDesignerCasesCategoryAction) =>
				action.payload
		),
		switchMap(state => {
			return this.designerCasesApiClient.getDesignerCasesCategory(state).pipe(
				filter(categoryRes => typeof categoryRes !== "undefined"),
				map(categoryRes => {
					return new DesignerCasesActions.DesignerCasesCategorySuccessAction(
						categoryRes
					);
				}),
				catchError(error =>
					of(new DesignerCasesActions.DesignerCasesCategoryFailAction())
				)
			);
		})
	);
}
