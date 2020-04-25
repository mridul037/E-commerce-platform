import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, concatMap, exhaustMap, filter, map } from "rxjs/operators";
import { ProductListingApiClientService } from "../../../product-listing/product-listing-api-client.service";
import { Category } from "../../../product-listing/product-listing.enum";
import * as productListingActions from "../actions/product-listing.actions";

@Injectable()
export class ProductListingEffects {
	constructor(
		private actions$: Actions,
		public productListingApiClientService: ProductListingApiClientService
	) {}

	/**
	 * Product Feed Effect
	 */
	@Effect()
	loadProductFeed$: Observable<Action> = this.actions$.pipe(
		ofType(productListingActions.ProductListingActionTypes.ProductFeedLoad),
		map((action: productListingActions.ProductFeedLoad) => action.payload),
		exhaustMap(state => {
			return this.productListingApiClientService.productFeed(state).pipe(
				filter(productFeed => typeof productFeed !== "undefined"),
				concatMap((productFeed: object) => {
					return [
						new productListingActions.ProductFeedSuccess(productFeed["feed"]),
						new productListingActions.StoreFirstProduct(
							productFeed["firstProduct"]
						),
						new productListingActions.StoreTotalProductCount(
							productFeed["totalProductCount"]
						),
					];
				}),
				catchError(error => of(new productListingActions.ProductFeedFail()))
			);
		})
	);

	/**
	 * Models Effect
	 */
	@Effect()
	loadModels$: Observable<Action> = this.actions$.pipe(
		ofType(productListingActions.ProductListingActionTypes.ModelLoad),
		map((action: productListingActions.ModelLoad) => action.payload),
		exhaustMap(state => {
			return this.productListingApiClientService.productModels(state).pipe(
				filter(response => typeof response !== "undefined"),
				map(modelResponse => {
					return new productListingActions.ModelSuccess(modelResponse);
				}),
				catchError(error => of(new productListingActions.ModelFail()))
			);
		})
	);

	/**
	 * Category Effect
	 */
	@Effect()
	loadCategory$: Observable<Action> = this.actions$.pipe(
		ofType(
			productListingActions.ProductListingActionTypes.BrandsLoad,
			productListingActions.ProductListingActionTypes
				.CategoriesForTabletSleevesLoad
		),
		map((action: productListingActions.BrandsLoad) => action.payload),
		exhaustMap(state => {
			return this.productListingApiClientService.categoryBrands(state).pipe(
				filter(response => typeof response !== "undefined"),
				map(brandsResponse => {
					if (brandsResponse["slug"] === Category.BAGS_AND_SLEEVES) {
						return new productListingActions.CategoriesForTabletSleevesSuccess(
							brandsResponse["brands"]
						);
					} else {
						return new productListingActions.BrandsSuccess(
							brandsResponse["brands"]
						);
					}
				}),
				catchError(error => of(new productListingActions.BrandsFail()))
			);
		})
	);

	/**
	 * Offer Effect
	 */
	@Effect()
	loadOffer$: Observable<Action> = this.actions$.pipe(
		ofType(productListingActions.ProductListingActionTypes.OfferLoad),
		map((action: productListingActions.OfferLoad) => action.payload),
		exhaustMap(state => {
			return this.productListingApiClientService.productOffer(state).pipe(
				map(offerResponse => {
					return new productListingActions.OfferSuccess(offerResponse);
				}),
				catchError(error => of(new productListingActions.OfferFail()))
			);
		})
	);

	/**
	 * Listing Footer Content Effect
	 */
	@Effect()
	loadListingContent$: Observable<Action> = this.actions$.pipe(
		ofType(
			productListingActions.ProductListingActionTypes.ListingFooterContent
		),
		map(
			(action: productListingActions.ListingFooterContentAction) =>
				action.payload
		),
		exhaustMap(state => {
			return this.productListingApiClientService.getListingContent(state).pipe(
				filter(listingContentResponse => {
					return typeof listingContentResponse !== "undefined";
				}),
				map(listingContentResponse => {
					return new productListingActions.ListingFooterContentSuccessAction(
						listingContentResponse
					);
				}),
				catchError(error =>
					of(new productListingActions.ListingFooterContentFailAction())
				)
			);
		})
	);

	/**
	 * Collection Content Effect
	 */
	@Effect()
	loadCollection$: Observable<Action> = this.actions$.pipe(
		ofType(productListingActions.ProductListingActionTypes.CollectionLoad),
		map((action: productListingActions.CollectionlLoad) => action.payload),
		exhaustMap(state => {
			return this.productListingApiClientService.getCollection(state).pipe(
				filter(response => typeof response !== "undefined"),
				map(collectionResponse => {
					return new productListingActions.CollectionSuccess(
						collectionResponse
					);
				}),
				catchError(error => of(new productListingActions.CollectionFail()))
			);
		})
	);
}
