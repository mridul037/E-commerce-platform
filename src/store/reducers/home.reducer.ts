import { Action } from "@ngrx/store";
import * as homeActions from "../actions/home.actions";

export interface HomeState {
	currentOffer: object;
	dealsOfTheDay: Object;
	categoryListing: object;
	mobileFeed: object;
	campaignData: object;
}

export const initialState: HomeState = {
	currentOffer: {
		loading: false,
		loaded: false,
		failed: false,
		response: undefined,
	},
	dealsOfTheDay: {
		loading: false,
		loaded: false,
		failed: false,
		response: [],
	},
	categoryListing: {
		loading: false,
		success: false,
		failed: false,
		response: undefined,
	},
	mobileFeed: {
		loading: false,
		success: false,
		failed: false,
		response: undefined,
	},
	campaignData: {
		loading: false,
		success: false,
		failed: false,
	},
};

export function reducer(state = initialState, action: Action): HomeState {
	switch (action.type) {
		/**
		 * Current offer action cases
		 */
		case homeActions.HomeActionTypes.LoadCurrentOffers: {
			return {
				...state,
				currentOffer: {
					loading: true,
				},
			};
		}

		case homeActions.HomeActionTypes.CurrentOffersSuccess: {
			return handleCurrentOfferSuccess(
				state,
				action as homeActions.CurrentOffersSuccessAction
			);
		}

		case homeActions.HomeActionTypes.CurrentOffersFail: {
			return {
				...state,
				currentOffer: {
					failed: true,
				},
			};
		}

		case homeActions.HomeActionTypes.ResetCurrentOffer: {
			return {
				...state,
				currentOffer: {
					loading: false,
					loaded: false,
					failed: false,
					response: undefined,
				},
			};
		}

		/**
		 * Deals of the day action cases
		 */
		case homeActions.HomeActionTypes.DealsOfTheDayLoadAction: {
			return {
				...state,
				dealsOfTheDay: {
					loading: true,
				},
			};
		}

		case homeActions.HomeActionTypes.DealsOfTheDaySuccessAction: {
			return handleDealsOfTheDaySuccess(
				state,
				action as homeActions.DealsOfTheDaySuccessAction
			);
		}

		case homeActions.HomeActionTypes.DealsOfTheDayFailAction: {
			return {
				...state,
				dealsOfTheDay: {
					failed: true,
				},
			};
		}

		/**
		 * Category listing action cases
		 */
		case homeActions.HomeActionTypes.CategoryListingLoadAction: {
			return {
				...state,
				categoryListing: {
					loading: true,
				},
			};
		}

		case homeActions.HomeActionTypes.CategoryListingSuccessAction: {
			return handleCategoryListingSuccess(
				state,
				action as homeActions.CategoryListingSuccessAction
			);
		}

		case homeActions.HomeActionTypes.CategoryListingFailAction: {
			return {
				...state,
				categoryListing: {
					failed: true,
				},
			};
		}

		/**
		 * Mobile feed action cases
		 */
		case homeActions.HomeActionTypes.MobileFeedLoadAction: {
			return {
				...state,
				mobileFeed: {
					loading: true,
				},
			};
		}

		case homeActions.HomeActionTypes.MobileFeedSuccessAction: {
			return handleMobileFeedSuccess(
				state,
				action as homeActions.MobileFeedSuccessAction
			);
		}

		case homeActions.HomeActionTypes.MobileFeedFailAction: {
			return {
				...state,
				mobileFeed: {
					failed: true,
				},
			};
		}
		case homeActions.HomeActionTypes.CampaignRelatedLoad: {
			return {
				...state,
				campaignData: {
					loading: true,
				},
			};
		}

		case homeActions.HomeActionTypes.CampaignRelatedSuccess: {
			return handleCampaignDataSuccess(
				state,
				action as homeActions.CampaignRelatedSuccessAction
			);
		}

		case homeActions.HomeActionTypes.CampaignRelatedFail: {
			return {
				...state,
				campaignData: {
					failed: true,
				},
			};
		}

		default:
			return state;
	}
}

function handleCurrentOfferSuccess(
	state: HomeState,
	action: homeActions.CurrentOffersSuccessAction
): HomeState {
	return {
		...state,
		currentOffer: {
			loaded: true,
			...(typeof action.payload !== "undefined" && {
				response: action.payload,
			}),
		},
	};
}

function handleDealsOfTheDaySuccess(
	state: HomeState,
	action: homeActions.DealsOfTheDaySuccessAction
): HomeState {
	return {
		...state,
		dealsOfTheDay: {
			loaded: true,
			response: action.payload,
		},
	};
}

function handleCategoryListingSuccess(
	state: HomeState,
	action: homeActions.CategoryListingSuccessAction
): HomeState {
	return {
		...state,
		categoryListing: {
			success: true,
			response: action.payload,
		},
	};
}

function handleMobileFeedSuccess(
	state: HomeState,
	action: homeActions.MobileFeedSuccessAction
): HomeState {
	return {
		...state,
		mobileFeed: {
			success: true,
			response: action.payload,
		},
	};
}

function handleCampaignDataSuccess(
	state: HomeState,
	action: homeActions.CampaignRelatedSuccessAction
): HomeState {
	return {
		...state,
		campaignData: action.payload,
	};
}

/**
 * This function gets current offer API response from module state
 * @param state Home State
 * @returns response state
 */
export const getCurrentOffers = (state: HomeState) =>
	state.currentOffer["response"];

/**
 * This function gets current offer failed response
 * @param state Home State
 * @returns failed response
 */
export const getCurrentOfferFailed = (state: HomeState) =>
	state.currentOffer["failed"];

/**
 * This function gets deals of the day API response
 * @param state Home State
 * @returns response state
 */
export const getDealsOfTheDay = (state: HomeState) =>
	state.dealsOfTheDay["response"];

/**
 * This function gets current offer failed response
 * @param state Home State
 * @returns failed response
 */
export const getDealsOfTheDayFailed = (state: HomeState) =>
	state.dealsOfTheDay["failed"];

/**
 * This function gets category listing JSON response
 * @param state Home State
 * @returns state response
 */
export const getCategoryListing = (state: HomeState) =>
	state.categoryListing["response"];

/**
 * This function gets category listing JSON failed response
 * @param state Home State
 * @returns failed response
 */
export const getCategoryListingFailed = (state: HomeState) =>
	state.categoryListing["failed"];

export const getMobileFeed = (state: HomeState) => state.mobileFeed["response"];

export const getMobileFeedFailed = (state: HomeState) =>
	state.mobileFeed["failed"];

export const campaignRelatedData = (state: HomeState) => state.campaignData;

export const campaignRelatedDataFailed = (state: HomeState) =>
	state.campaignData["failed"];
