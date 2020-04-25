import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, filter } from "rxjs/operators";
import { SharedApiClientService } from "../../../shared/shared-api-client.service";
import { SharedJsonClientService } from "../../shared-json-client.service";
import * as sharedModuleActions from "../actions/shared-module.actions";

@Injectable()
export class SharedEffects {
	constructor(
		private actions$: Actions,
		public sharedApiClient: SharedApiClientService,
		public sharedJsonClient: SharedJsonClientService
	) {}

	/**
	 * Mobile Menu Effect
	 */
	@Effect()
	loadMobileMenu$: Observable<Action> = this.actions$.pipe(
		ofType(sharedModuleActions.SharedModuleActionsTypes.MobileMenuLoad),
		switchMap(() => {
			return this.sharedApiClient.getMobileMenu().pipe(
				map(mobileMenu => {
					return new sharedModuleActions.MobileMenuSuccessAction(mobileMenu);
				}),
				catchError(error => of(new sharedModuleActions.MobileMenuFailAction()))
			);
		})
	);

	/**
	 * Desktop Header Effect
	 */
	@Effect()
	loadDesktopNav$: Observable<Action> = this.actions$.pipe(
		ofType(sharedModuleActions.SharedModuleActionsTypes.DesktopNavLoad),
		switchMap(() => {
			return this.sharedJsonClient.getDesktopMenu().pipe(
				filter(desktopMenu => typeof desktopMenu !== "undefined"),
				map(desktopMenu => {
					return new sharedModuleActions.DesktopNavSuccessAction(desktopMenu);
				}),
				catchError(error => of(new sharedModuleActions.DesktopNavFailAction()))
			);
		})
	);

	/**
	 * Landing Page Effect
	 */

	@Effect()
	loadLandingPage$: Observable<Action> = this.actions$.pipe(
		ofType(sharedModuleActions.SharedModuleActionsTypes.LandingPageLoad),
		switchMap(() => {
			return this.sharedJsonClient.getLandingPage().pipe(
				filter(landingPage => typeof landingPage !== "undefined"),
				map(landingPage => {
					return new sharedModuleActions.LandingPageSuccessAction(landingPage);
				}),
				catchError(error =>
					of(new sharedModuleActions.LandingPageFailAction(error))
				)
			);
		})
	);
}
