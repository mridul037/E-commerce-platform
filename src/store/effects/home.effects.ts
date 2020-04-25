import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, filter } from "rxjs/operators";
import { HomeJsonClientService } from "../../../home/home-json-client.service";
import { HomeApiClientService } from "../../../home/home-api-client.service";
import * as homeActions from "../actions/home.actions";
import { MobileHomeLayout } from "../../models/home/mobile-home-layout.model";

@Injectable()
export class HomeEffects {
	constructor(
		private actions$: Actions,
		public homeApiClient: HomeApiClientService,
		public homeJsonClient: HomeJsonClientService
	) {}

	/**
	 * Current Offer Effects
	 */
	@Effect()
	loadCurrentOffer$: Observable<Action> = this.actions$.pipe(
		ofType(homeActions.HomeActionTypes.LoadCurrentOffers),
		map((action: homeActions.LoadCurrentOffersAction) => action.payload),
		switchMap(state => {
			return this.homeApiClient.getCurrentOffer(state).pipe(
				map(currentOffer => {
					return new homeActions.CurrentOffersSuccessAction(currentOffer);
				}),
				catchError(error => of(new homeActions.CurrentOffersFailAction()))
			);
		})
	);

	/**
	 * Deals Of The Day Effects
	 */
	@Effect()
	loadDealsOfTheDay$: Observable<Action> = this.actions$.pipe(
		ofType(homeActions.HomeActionTypes.DealsOfTheDayLoadAction),
		map((action: homeActions.DealsOfTheDayLoadAction) => action.payload),
		switchMap(state => {
			return this.homeApiClient.getDealsOfTheDay(state).pipe(
				filter(response => typeof response !== "undefined"),
				map(dealsOfTheDayRes => {
					return new homeActions.DealsOfTheDaySuccessAction(dealsOfTheDayRes);
				}),
				catchError(error => of(new homeActions.DealsOfTheDayFailAction(error)))
			);
		})
	);

	/**
	 * Category Listing Effects
	 */
	@Effect()
	loadCategoryListing$: Observable<Action> = this.actions$.pipe(
		ofType(homeActions.HomeActionTypes.CategoryListingLoadAction),
		switchMap(() => {
			return this.homeJsonClient.getCategoryListing().pipe(
				map(categoryListing => {
					return new homeActions.CategoryListingSuccessAction(categoryListing);
				}),
				catchError(error => of(new homeActions.CategoryListingFailAction()))
			);
		})
	);

	/**
	 * Mobile Feed Effects
	 */
	@Effect()
	loadMobileFeed$: Observable<Action> = this.actions$.pipe(
		ofType(homeActions.HomeActionTypes.MobileFeedLoadAction),
		switchMap(() => {
			return this.homeApiClient.getMobileFeed().pipe(
				filter(mobileFeed => {
					return typeof mobileFeed !== "undefined";
				}),
				map(mobileFeed => {
					return new homeActions.MobileFeedSuccessAction(mobileFeed);
				}),
				catchError(error => of(new homeActions.MobileFeedFailAction()))
			);
		})
	);

	@Effect()
	campaignRelatedData$: Observable<Action> = this.actions$.pipe(
		ofType(homeActions.HomeActionTypes.CampaignRelatedLoad),
		map((action: homeActions.CampaignRelatedLoadAction) => {
			return action.payload;
		}),
		switchMap(state => {
			return this.homeApiClient.campaignDataForm(state).pipe(
				filter(campaignData => {
					return typeof campaignData !== "undefined";
				}),
				map(campaignData => {
					return new homeActions.CampaignRelatedSuccessAction(campaignData);
				}),
				catchError(error => of(new homeActions.CampaignRelatedFailAction()))
			);
		})
	);
}
