import { Action } from "@ngrx/store";
import { MobileHomeLayout } from "../../models/home/mobile-home-layout.model";

export enum HomeActionTypes {
	LoadCurrentOffers = "[Home] Current Offers Load",
	CurrentOffersSuccess = "[Home] Current Offers Success",
	CurrentOffersFail = "[Home] Current Offers Fail",

	ResetCurrentOffer = "[Home] Reset Current Offer",

	DealsOfTheDayLoadAction = "[Home] Deals Of The Day Load",
	DealsOfTheDaySuccessAction = "[Home] Deals Of The Day Success",
	DealsOfTheDayFailAction = "[Home] Deals Of The Day Fail",

	CategoryListingLoadAction = "[Home] Category Listing Load",
	CategoryListingSuccessAction = "[Home] Category Listing Success",
	CategoryListingFailAction = "[Home] Category Listing Fail",

	MobileFeedLoadAction = "[Home] Mobile Feed Load",
	MobileFeedSuccessAction = "[Home] Mobile Feed Success",
	MobileFeedFailAction = "[Home] Mobile Feed Fail",

	CampaignRelatedLoad = "[Home] Campaign Related Popup Load",
	CampaignRelatedSuccess = "[Home] Campaign Related Popup Success",
	CampaignRelatedFail = "[Home] Campaign Related Popup Fail",
}

/**
 * Current offer actions
 */
export class LoadCurrentOffersAction implements Action {
	readonly type = HomeActionTypes.LoadCurrentOffers;

	constructor(public payload: string | object) {}
}

export class CurrentOffersSuccessAction implements Action {
	readonly type = HomeActionTypes.CurrentOffersSuccess;

	constructor(public payload: object) {}
}

export class CurrentOffersFailAction implements Action {
	readonly type = HomeActionTypes.CurrentOffersFail;

	constructor(public payload: object = {}) {}
}

export class ResetCurrentOfferAction implements Action {
	readonly type = HomeActionTypes.ResetCurrentOffer;
}

/**
 * Deals of the day actions
 */

export class DealsOfTheDayLoadAction implements Action {
	readonly type = HomeActionTypes.DealsOfTheDayLoadAction;

	constructor(public payload: object) {}
}

export class DealsOfTheDaySuccessAction implements Action {
	readonly type = HomeActionTypes.DealsOfTheDaySuccessAction;

	constructor(public payload: object) {}
}

export class DealsOfTheDayFailAction implements Action {
	readonly type = HomeActionTypes.DealsOfTheDayFailAction;

	constructor(public payload: object) {}
}

/**
 * Category listing actions
 */

export class CategoryListingLoadAction implements Action {
	readonly type = HomeActionTypes.CategoryListingLoadAction;
}

export class CategoryListingSuccessAction implements Action {
	readonly type = HomeActionTypes.CategoryListingSuccessAction;

	constructor(public payload: object) {}
}

export class CategoryListingFailAction implements Action {
	readonly type = HomeActionTypes.CategoryListingFailAction;
}

/**
 * Mobile feed actions
 */

export class MobileFeedLoadAction implements Action {
	readonly type = HomeActionTypes.MobileFeedLoadAction;
}

export class MobileFeedSuccessAction implements Action {
	readonly type = HomeActionTypes.MobileFeedSuccessAction;

	constructor(public payload: MobileHomeLayout) {}
}

export class MobileFeedFailAction implements Action {
	readonly type = HomeActionTypes.MobileFeedFailAction;
}
export class CampaignRelatedLoadAction implements Action {
	readonly type = HomeActionTypes.CampaignRelatedLoad;
	constructor(public payload: object) {}
}

export class CampaignRelatedSuccessAction implements Action {
	readonly type = HomeActionTypes.CampaignRelatedSuccess;

	constructor(public payload: object) {}
}

export class CampaignRelatedFailAction implements Action {
	readonly type = HomeActionTypes.CampaignRelatedFail;
	constructor() {}
}

export type LoadCurrentOfferActions =
	| LoadCurrentOffersAction
	| CurrentOffersSuccessAction
	| CurrentOffersFailAction
	| ResetCurrentOfferAction
	| DealsOfTheDayLoadAction
	| DealsOfTheDaySuccessAction
	| DealsOfTheDayFailAction
	| CategoryListingLoadAction
	| CategoryListingSuccessAction
	| CategoryListingFailAction
	| MobileFeedLoadAction
	| MobileFeedSuccessAction
	| MobileFeedFailAction
	| CampaignRelatedLoadAction
	| CampaignRelatedSuccessAction
	| CampaignRelatedFailAction;
