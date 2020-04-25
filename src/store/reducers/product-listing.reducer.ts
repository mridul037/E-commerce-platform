import { Action } from "@ngrx/store";
import * as productListingActions from "../actions/product-listing.actions";

export interface ProductListingState {
	productFeed: object;
	activePageNumber: number;
	productModels: object;
	productListingHeading: string;
	collectionFilters: object[];
	offer: object;
	productBrands: object;
	lastVisitedListing: string | null;
	buildOptionTabsForMobile?: object[];
	listingContent: object;
	categoryBrandsForTabletSleeves: object;
	collection: object;
}

export const initialState: ProductListingState = {
	productFeed: {
		loading: false,
		loaded: false,
		failed: false,
		products: [],
		firstProduct: {},
		totalProductCount: undefined,
	},
	activePageNumber: 1,
	productModels: {
		loading: false,
		loaded: false,
		failed: false,
		response: undefined,
	},
	productListingHeading: "",
	collectionFilters: [],
	offer: {
		loading: false,
		loaded: false,
		failed: false,
		response: undefined,
	},
	productBrands: {
		loading: false,
		loaded: false,
		failed: false,
		response: undefined,
	},
	lastVisitedListing: null,
	buildOptionTabsForMobile: undefined,
	listingContent: {
		loading: false,
		loaded: false,
		failed: false,
		response: undefined,
	},
	categoryBrandsForTabletSleeves: {
		loading: false,
		loaded: false,
		failed: false,
		response: undefined,
	},
	collection: {
		loading: false,
		loaded: false,
		failed: false,
		response: undefined,
	},
};

// tslint:disable-next-line:no-big-function
export function reducer(
	state = initialState,
	action: Action
): ProductListingState {
	switch (action.type) {
		/**
		 * Product Feed action cases
		 */
		case productListingActions.ProductListingActionTypes.ProductFeedLoad: {
			return {
				...state,
				productFeed: {
					...state.productFeed,
					loading: true,
				},
			};
		}
		case productListingActions.ProductListingActionTypes.ProductFeedSuccess: {
			return handleProductFeedSuccess(
				state,
				action as productListingActions.ProductFeedSuccess
			);
		}
		case productListingActions.ProductListingActionTypes.ProductFeedFail: {
			return {
				...state,
				productFeed: {
					...state.productFeed,
					failed: true,
				},
			};
		}
		case productListingActions.ProductListingActionTypes.ProductFeedReset: {
			return {
				...state,
				productFeed: {
					loading: false,
					loaded: false,
					failed: false,
					products: [],
				},
				activePageNumber: 1,
			};
		}
		/**
		 * Product Model Reducer
		 */
		case productListingActions.ProductListingActionTypes.ModelLoad: {
			return {
				...state,
				productModels: {
					loading: true,
				},
			};
		}
		case productListingActions.ProductListingActionTypes.ModelSuccess: {
			return handleProductModelSuccess(
				state,
				action as productListingActions.ModelSuccess
			);
		}
		case productListingActions.ProductListingActionTypes.ModelFail: {
			return {
				...state,
				productModels: {
					failed: true,
				},
			};
		}
		/**
		 * Product Category Reducer
		 */
		case productListingActions.ProductListingActionTypes.BrandsLoad: {
			return {
				...state,
				productBrands: {
					loading: true,
				},
			};
		}
		case productListingActions.ProductListingActionTypes.BrandsSuccess: {
			return handleProductBrandsSuccess(
				state,
				action as productListingActions.BrandsSuccess
			);
		}
		case productListingActions.ProductListingActionTypes.BrandsFail: {
			return {
				...state,
				productBrands: {
					failed: true,
				},
			};
		}
		case productListingActions.ProductListingActionTypes.BrandsReset: {
			return {
				...state,
				productBrands: {
					loading: false,
					failed: false,
					response: undefined,
				},
			};
		}
		/**
		 * Pagination Reducer
		 */
		case productListingActions.ProductListingActionTypes.IncrementActivePage: {
			return {
				...state,
				activePageNumber: state.activePageNumber + 1,
			};
		}
		case productListingActions.ProductListingActionTypes.ResetActivePage: {
			return {
				...state,
				activePageNumber: 1,
			};
		}
		/**
		 * Tags Filter Reducer
		 */
		case productListingActions.ProductListingActionTypes
			.UpdateCollectionFilters: {
			return updateCollectionFilters(
				state,
				action as productListingActions.UpdateCollectionFilters
			);
		}
		/**
		 * Store First Product From Product Feed
		 */
		case productListingActions.ProductListingActionTypes.StoreFirstProduct: {
			return storeFirstProduct(
				state,
				action as productListingActions.StoreFirstProduct
			);
		}
		case productListingActions.ProductListingActionTypes
			.StoreTotalProductCount: {
			return storeTotalProductCount(
				state,
				action as productListingActions.StoreTotalProductCount
			);
		}
		/**
		 *  Product Listing Offer Reducer
		 */
		case productListingActions.ProductListingActionTypes.OfferLoad: {
			return {
				...state,
				offer: {
					...state.offer,
					loading: true,
					loaded: false,
				},
			};
		}
		case productListingActions.ProductListingActionTypes.OfferSuccess: {
			return handleOfferSuccess(
				state,
				action as productListingActions.OfferSuccess
			);
		}
		case productListingActions.ProductListingActionTypes.OfferFail: {
			return {
				...state,
				offer: {
					...state.offer,
					failed: true,
				},
			};
		}
		case productListingActions.ProductListingActionTypes.OfferReset: {
			return {
				...state,
				offer: {
					loading: false,
					loaded: false,
					failed: false,
					response: undefined,
				},
			};
		}
		case productListingActions.ProductListingActionTypes
			.SetLastVisitedListing: {
			return handleSetLastVisitedListing(
				state,
				action as productListingActions.SetLastVisitedListing
			);
		}
		case productListingActions.ProductListingActionTypes
			.SetBuildOptionTabsForMobile: {
			return handleSetBuildOptionTabsForMobile(
				state,
				action as productListingActions.SetBuildOptionTabsForMobile
			);
		}
		case productListingActions.ProductListingActionTypes
			.ResetBuildOptionTabsForMobile: {
			return {
				...state,
				buildOptionTabsForMobile: undefined,
			};
		}

		case productListingActions.ProductListingActionTypes.ListingFooterContent: {
			return {
				...state,
				listingContent: {
					loading: true,
				},
			};
		}
		case productListingActions.ProductListingActionTypes
			.ListingFooterContentSuccess: {
			return handleListingFooterContentSuccess(
				state,
				action as productListingActions.ListingFooterContentSuccessAction
			);
		}
		case productListingActions.ProductListingActionTypes
			.ListingFooterContentFail: {
			return {
				...state,
				listingContent: {
					failed: true,
				},
			};
		}

		case productListingActions.ProductListingActionTypes
			.CategoriesForTabletSleevesLoad: {
			return {
				...state,
				categoryBrandsForTabletSleeves: {
					loading: true,
				},
			};
		}

		case productListingActions.ProductListingActionTypes
			.CategoriesForTabletSleevesSuccess: {
			return handleCategoriesForTabletSleevesSuccess(
				state,
				action as productListingActions.CategoriesForTabletSleevesSuccess
			);
		}

		case productListingActions.ProductListingActionTypes
			.CategoriesForTabletSleevesFail: {
			return {
				...state,
				categoryBrandsForTabletSleeves: {
					failed: true,
				},
			};
		}

		case productListingActions.ProductListingActionTypes
			.ResetCategoriesForTabletSleeves: {
			return {
				...state,
				categoryBrandsForTabletSleeves: {
					loading: false,
					loaded: false,
					failed: false,
					response: undefined,
				},
			};
		}

		case productListingActions.ProductListingActionTypes.CollectionLoad: {
			return {
				...state,
				collection: {
					loading: true,
				},
			};
		}
		case productListingActions.ProductListingActionTypes.CollectionSuccess: {
			return handleCollectionSuccess(
				state,
				action as productListingActions.CollectionSuccess
			);
		}
		case productListingActions.ProductListingActionTypes.CollectionFail: {
			return {
				...state,
				collection: {
					failed: true,
				},
			};
		}

		default:
			return state;
	}
}

function storeFirstProduct(
	state: ProductListingState,
	action: productListingActions.StoreFirstProduct
): ProductListingState {
	return {
		...state,
		productFeed: {
			...state.productFeed,
			firstProduct: {
				...action.payload,
			},
		},
	};
}

function storeTotalProductCount(
	state: ProductListingState,
	action: productListingActions.StoreTotalProductCount
): ProductListingState {
	return {
		...state,
		productFeed: {
			...state.productFeed,
			totalProductCount: action.payload,
		},
	};
}

function handleOfferSuccess(
	state: ProductListingState,
	action: productListingActions.OfferSuccess
): ProductListingState {
	return {
		...state,
		offer: {
			...state.offer,
			loading: false,
			loaded: true,
			response: action.payload,
		},
	};
}

function handleProductModelSuccess(
	state: ProductListingState,
	action: productListingActions.ModelSuccess
): ProductListingState {
	return {
		...state,
		productModels: {
			loading: false,
			loaded: true,
			response: action.payload,
		},
	};
}

function handleProductBrandsSuccess(
	state: ProductListingState,
	action: productListingActions.BrandsSuccess
): ProductListingState {
	return {
		...state,
		productBrands: {
			loading: false,
			loaded: true,
			response: action.payload,
		},
	};
}

function updateCollectionFilters(
	state: ProductListingState,
	action: productListingActions.UpdateCollectionFilters
): ProductListingState {
	return {
		...state,
		collectionFilters: [...action.payload],
	};
}

function handleProductFeedSuccess(
	state: ProductListingState,
	action: productListingActions.ProductFeedSuccess
): ProductListingState {
	return state.productFeed["products"] &&
		state.productFeed["products"].length > 0
		? {
				...state,
				productFeed: {
					loaded: true,
					products: [...state.productFeed["products"], ...action.payload],
				},
		  }
		: {
				...state,
				productFeed: {
					loaded: true,
					products: [...action.payload],
				},
		  };
}

function handleSetLastVisitedListing(
	state: ProductListingState,
	action: productListingActions.SetLastVisitedListing
): ProductListingState {
	return {
		...state,
		lastVisitedListing: action.payload,
	};
}

function handleSetBuildOptionTabsForMobile(
	state: ProductListingState,
	action: productListingActions.SetBuildOptionTabsForMobile
): ProductListingState {
	return {
		...state,
		buildOptionTabsForMobile: action.payload,
	};
}

function handleListingFooterContentSuccess(
	state: ProductListingState,
	action: productListingActions.ListingFooterContentSuccessAction
): ProductListingState {
	return {
		...state,
		listingContent: {
			response: action.payload,
		},
	};
}

function handleCategoriesForTabletSleevesSuccess(
	state: ProductListingState,
	action: productListingActions.CategoriesForTabletSleevesSuccess
): ProductListingState {
	return {
		...state,
		categoryBrandsForTabletSleeves: {
			response: action.payload,
		},
	};
}
function handleCollectionSuccess(
	state: ProductListingState,
	action: productListingActions.CollectionSuccess
): ProductListingState {
	return {
		...state,
		collection: {
			loading: false,
			loaded: true,
			response: action.payload,
		},
	};
}

/**
 * This function gets product feed API response from module state
 * @param state Bags And Sleeves State
 * @returns response state
 */
export const getProductFeed = (state: ProductListingState) =>
	state.productFeed["products"];

/**
 * This function gets boolean value whether feed api
 * response has been loaded into state or not
 * @param state Bags And Sleeve State
 * @return boolean value whether data is loaded or not
 */
export const productFeedLoaded = (state: ProductListingState) =>
	state.productFeed["loaded"];

export const productModels = (state: ProductListingState) =>
	state.productModels["response"];

export const productBrands = (state: ProductListingState) =>
	state.productBrands["response"];

export const getActivePage = (state: ProductListingState) =>
	state.activePageNumber;
export const resetActivePage = (state: ProductListingState) =>
	state.activePageNumber;

export const getCollectionFilters = (state: ProductListingState) =>
	state.collectionFilters;

export const getFirstProductOfFeed = (state: ProductListingState) =>
	state.productFeed["firstProduct"];

export const getTotalProductCountOfFeed = (state: ProductListingState) =>
	state.productFeed["totalProductCount"];

export const productOffer = (state: ProductListingState) =>
	state.offer["response"];
export const getlastVisitedListing = (state: ProductListingState) =>
	state.lastVisitedListing;

export const getBuildOptionTabsForMobile = (state: ProductListingState) =>
	state.buildOptionTabsForMobile;

export const listingContent = (state: ProductListingState) =>
	state.listingContent["response"];
export const listingContentFailed = (state: ProductListingState) =>
	state.listingContent["error"];

export const getCategoryBrandsForTabletSleeves = (state: ProductListingState) =>
	state.categoryBrandsForTabletSleeves["response"];
export const collection = (state: ProductListingState) =>
	state.collection["response"];
