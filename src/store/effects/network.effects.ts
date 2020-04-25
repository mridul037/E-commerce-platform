import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { fromEvent, merge, Observable, of } from "rxjs";
import { concatMap, map, mapTo } from "rxjs/operators";
import * as networkActions from "../actions/network.actions";

@Injectable()
export class NetworkEffects {
	constructor(private actions$: Actions) {}

	@Effect()
	StartOnlineOfflineCheck$: Observable<Action> = this.actions$.pipe(
		ofType(networkActions.NetworkActionTypes.StartOnlineOfflineCheck),
		concatMap(() => {
			return merge(
				of(navigator.onLine),
				fromEvent(window, "online").pipe(mapTo(true)),
				fromEvent(window, "offline").pipe(mapTo(false))
			);
		}),
		map(isOnline => {
			return new networkActions.SetIsOnline(isOnline);
		})
	);
}
