import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { AppApiClientService } from "../../../app-api-client.service";
import * as currentUserActions from "../actions/current-user.actions";

@Injectable()
export class CurrentUserEffects {
	constructor(
		private actions$: Actions,
		public appApiClient: AppApiClientService
	) {}

	@Effect()
	getCurrentUser$: Observable<Action> = this.actions$.pipe(
		ofType(currentUserActions.CurrentUserActionTypes.GetCurrentUser),
		switchMap(state => {
			return this.appApiClient.getCurrenUser().pipe(
				filter(user => {
					return typeof user !== "undefined";
				}),
				map(user => {
					return new currentUserActions.GetCurrentUserSuccessAction(user);
				}),
				catchError(error =>
					of(new currentUserActions.GetCurrentUserFailAction(error["error"]))
				)
			);
		})
	);
}
