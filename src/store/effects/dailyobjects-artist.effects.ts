import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as DailyobjectsArtistActions from "../actions/dailyobjects-artist.actions";
import { DailyobjectsArtistApiClientService } from "../../../dailyobjects-artist/dailyobjects-artist-api-client.service";

@Injectable()
export class DailyobjectsArtistEffects {
	constructor(
		private actions$: Actions,
		public dailyobjectsArtistApiClient: DailyobjectsArtistApiClientService
	) {}

	/**
	 * DailyobjectsArtist Effect
	 */
	@Effect()
	loadDailyobjectsArtistData$: Observable<Action> = this.actions$.pipe(
		ofType(
			DailyobjectsArtistActions.DailyobjectsArtistTypes
				.LoadDailyobjectsArtistData
		),
		map(
			(action: DailyobjectsArtistActions.LoadDailyobjectsArtistDataAction) =>
				action.payload
		),
		switchMap(state => {
			return this.dailyobjectsArtistApiClient
				.getDailyobjectsArtistSuccessData(state)
				.pipe(
					map(data => {
						return new DailyobjectsArtistActions.DailyobjectsArtistDataSuccessAction(
							data
						);
					}),
					catchError(error =>
						of(new DailyobjectsArtistActions.DailyobjectsArtistDataFailAction())
					)
				);
		})
	);
}
