import { Action } from "@ngrx/store";

export enum ProductListingActionTypes {
	ProductFeedLoad = "[ProductListing] Product Listing Product Feed Load",
	ProductFeedSuccess = "[ProductListing] Product Listing Product Feed Success",
	ProductFeedFail = "[ProductListing] Product Listing Product Feed Fail",
	ProductFeedReset = "[ProductListing] Product Listing Product Feed Reset",

	ModelLoad = "[ProductListing] Product Listing Model Load",
	ModelSuccess = "[ProductListing] Product Listing Model Success",
	ModelFail = "[ProductListing] Product Listing Model Fail",

	BrandsLoad = "[ProductListing] Product Listing Brands Load",
	BrandsSuccess = "[ProductListing] Product Listing Brands Success",
	BrandsFail = "[ProductListing] Product Listing Brands Fail",
	BrandsReset = "[ProductListing] Product Listing Brands Reset",

	IncrementActivePage = "[ProductListing] Increment Active Page",
	ResetActivePage = "[ProductListing] Reset Active Page",
	UpdateCollectionFilters = "[ProductListing] Update Collection Filters",
	StoreFirstProduct = "[ProductListing] Store First Product",
	StoreTotalProductCount = "[ProductListing] Store Total Product Count",

	OfferLoad = "[ProductListing] Offer Load",
	OfferSuccess = "[ProductListing] Offer Success",
	OfferFail = "[ProductListing] Offer Fail",
	OfferReset = "[ProductListing] Offer Reset",

	SetLastVisitedListing = "[ProductListing] Set Last Visited Listing",

	SetBuildOptionTabsForMobile = "[ProductListing] Set BuildOption Tabs For Mobile",
	ResetBuildOptionTabsForMobile = "[ProductListing] Reset BuildOption Tabs For Mobile",

	ListingFooterContent = "[ProductListing] ListingFooterContent Load",
	ListingFooterContentSuccess = "[ProductListing] ListingFooterContent Success",
	ListingFooterContentFail = "[ProductListing] ListingFooterContent Fail",

	CategoriesForTabletSleevesLoad = "[ProductListing] Categories For Tablet Sleeves Load",
	CategoriesForTabletSleevesSuccess = "[ProductListing] Categories For Tablet Sleeves Success",
	CategoriesForTabletSleevesFail = "[ProductListing] Catgeories For Tablet Sleeves Fail",

	ResetCategoriesForTabletSleeves = "[ProductListing] ResetCategoriesForTabletSleeves",

	CollectionLoad = "[ProductListing] Product Listing Collection Load",
	CollectionSuccess = "[ProductListing] Product Listing Collection Success",
	CollectionFail = "[ProductListing] Product Listing Collection Fail",
}

/**
 * Product Feed Actions
 */
export class ProductFeedLoad implements Action {
	readonly type = ProductListingActionTypes.ProductFeedLoad;

	constructor(public payload: object) {}
}

export class ProductFeedSuccess implements Action {
	readonly type = ProductListingActionTypes.ProductFeedSuccess;

	constructor(public payload: object[]) {}
}

export class ProductFeedFail implements Action {
	readonly type = ProductListingActionTypes.ProductFeedFail;

	constructor(public payload: object = {}) {}
}

export class ProductFeedReset implements Action {
	readonly type = ProductListingActionTypes.ProductFeedReset;
}

/**
 * Product Models Actions
 */
export class ModelLoad implements Action {
	readonly type = ProductListingActionTypes.ModelLoad;

	constructor(public payload: object) {}
}

export class ModelSuccess implements Action {
	readonly type = ProductListingActionTypes.ModelSuccess;

	constructor(public payload: object) {}
}

export class ModelFail implements Action {
	readonly type = ProductListingActionTypes.ModelFail;

	constructor(public payload: object = {}) {}
}

/**
 * Product Brands Actions
 */
export class BrandsLoad implements Action {
	readonly type = ProductListingActionTypes.BrandsLoad;

	constructor(public payload: object) {}
}

export class BrandsSuccess implements Action {
	readonly type = ProductListingActionTypes.BrandsSuccess;

	constructor(public payload: object) {}
}

export class BrandsFail implements Action {
	readonly type = ProductListingActionTypes.BrandsFail;

	constructor(public payload: object = {}) {}
}

export class BrandsReset implements Action {
	readonly type = ProductListingActionTypes.BrandsReset;

	constructor(public payload: object = {}) {}
}

/**
 * Pagination Actions
 */
export class IncrementActivePage implements Action {
	readonly type = ProductListingActionTypes.IncrementActivePage;
}
export class ResetActivePage implements Action {
	readonly type = ProductListingActionTypes.ResetActivePage;
}

/**
 * Tags Actions
 */
export class UpdateCollectionFilters implements Action {
	readonly type = ProductListingActionTypes.UpdateCollectionFilters;

	constructor(public payload: object[]) {}
}

/**
 * Save First Product From Product Feed
 */
export class StoreFirstProduct implements Action {
	readonly type = ProductListingActionTypes.StoreFirstProduct;

	constructor(public payload: object) {}
}

/**
 * Save Total Product Count of Product Feed
 */
export class StoreTotalProductCount implements Action {
	readonly type = ProductListingActionTypes.StoreTotalProductCount;

	constructor(public payload: number) {}
}

/**
 * Offer Actions
 */
export class OfferLoad implements Action {
	readonly type = ProductListingActionTypes.OfferLoad;

	constructor(public payload: object) {}
}

export class OfferSuccess implements Action {
	readonly type = ProductListingActionTypes.OfferSuccess;

	constructor(public payload: object) {}
}

export class OfferFail implements Action {
	readonly type = ProductListingActionTypes.OfferFail;

	constructor(public payload: object = {}) {}
}

export class OfferReset implements Action {
	readonly type = ProductListingActionTypes.OfferReset;
}

export class SetLastVisitedListing implements Action {
	readonly type = ProductListingActionTypes.SetLastVisitedListing;

	constructor(public payload: string) {}
}

export class SetBuildOptionTabsForMobile implements Action {
	readonly type = ProductListingActionTypes.SetBuildOptionTabsForMobile;

	constructor(public payload: object[]) {}
}

export class ResetBuildOptionTabsForMobile implements Action {
	readonly type = ProductListingActionTypes.ResetBuildOptionTabsForMobile;
}

export class ListingFooterContentAction implements Action {
	readonly type = ProductListingActionTypes.ListingFooterContent;

	constructor(public payload: object) {}
}

export class ListingFooterContentSuccessAction implements Action {
	readonly type = ProductListingActionTypes.ListingFooterContentSuccess;

	constructor(public payload: object) {}
}

export class ListingFooterContentFailAction implements Action {
	readonly type = ProductListingActionTypes.ListingFooterContentFail;
}

export class CategoriesForTabletSleevesLoad implements Action {
	readonly type = ProductListingActionTypes.CategoriesForTabletSleevesLoad;

	constructor(public payload: object) {}
}

export class CategoriesForTabletSleevesSuccess implements Action {
	readonly type = ProductListingActionTypes.CategoriesForTabletSleevesSuccess;

	constructor(public payload: object) {}
}

export class CategoriesForTabletSleevesFail implements Action {
	readonly type = ProductListingActionTypes.CategoriesForTabletSleevesFail;

	constructor(public payload: object = {}) {}
}

export class ResetCategoriesForTabletSleeves implements Action {
	readonly type = ProductListingActionTypes.ResetCategoriesForTabletSleeves;
}

/**
 * Product Models Actions
 */
export class CollectionlLoad implements Action {
	readonly type = ProductListingActionTypes.CollectionLoad;

	constructor(public payload: object) {}
}

export class CollectionSuccess implements Action {
	readonly type = ProductListingActionTypes.CollectionSuccess;

	constructor(public payload: object) {}
}

export class CollectionFail implements Action {
	readonly type = ProductListingActionTypes.CollectionFail;

	constructor(public payload: object = {}) {}
}

export type ProductListingActions =
	| ProductFeedLoad
	| ProductFeedSuccess
	| ProductFeedFail
	| ProductFeedReset
	| ModelLoad
	| ModelSuccess
	| ModelFail
	| BrandsLoad
	| BrandsSuccess
	| BrandsFail
	| BrandsReset
	| IncrementActivePage
	| UpdateCollectionFilters
	| StoreFirstProduct
	| StoreTotalProductCount
	| OfferLoad
	| OfferSuccess
	| OfferFail
	| OfferReset
	| SetLastVisitedListing
	| SetBuildOptionTabsForMobile
	| ResetBuildOptionTabsForMobile
	| ListingFooterContentAction
	| ListingFooterContentSuccessAction
	| ListingFooterContentFailAction
	| CategoriesForTabletSleevesLoad
	| CategoriesForTabletSleevesSuccess
	| CategoriesForTabletSleevesFail
	| ResetCategoriesForTabletSleeves
	| ResetActivePage
	| CollectionlLoad
	| CollectionSuccess
	| CollectionFail;
