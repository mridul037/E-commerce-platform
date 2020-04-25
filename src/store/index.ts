import {
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
	MetaReducer,
} from "@ngrx/store";
import * as fromNetwork from "./reducers/network.reducer";
import * as fromScreen from "./reducers/screen.reducer";
import * as fromOs from "./reducers/os.reducer";
import * as fromCurrentUser from "./reducers/current-user.reducer";
import * as fromRouter from "./reducers/router.reducer";
import * as fromAuth from "../../auth/store/auth.reducer";
import * as fromHome from "./reducers/home.reducer";
import * as fromContactUs from "./reducers/contact-us.reducer";
import * as fromPdp from "../../pdp/store/pdp.reducer";
import * as fromCheckout from "./reducers/checkout.reducer";
import * as fromCart from "./reducers/cart.reducer";
import * as fromCartService from "../../core/cart/store/cart-service.reducer";
import * as fromOnlineGifts from "../../online-gifts/store/online-gifts.reducer";
import * as fromProductListing from "./reducers/product-listing.reducer";
import * as fromDesignerCases from "./reducers/designer-cases.reducer";
import * as fromShared from "./reducers/shared-module.reducer";
import * as fromCustomer from "../../customer/store/customer.reducer";
import * as fromDesignerCollection from "../../designer-collections-brand-model/store/designer-collection.reducer";
import * as fromPaymentSuccess from "./reducers/payment-success.reducer";
import * as fromNewsletterSubscription from "../../core/newsletter-subscription/store/newsletter-subscription.reducer";
import * as fromSleeves from "../../sleeves/store/sleeves.reducer";
import * as fromWallets from "../../wallets/store/wallets.reducer";
import * as fromTabletSleeves from "../../tablet-sleeves/store/tablet-sleeves.reducer";
import * as fromDesignerInvite from "../../designer-invite/store/designer-invite.reducer";
import * as fromCaseCollection from "../../case-collections-brand-model/store/case-collection.reducer";
import * as fromTrackYourOrder from "../../track-your-order/store/track-your-order.reducer";
import * as fromVerifyEmail from "../../verify-email/store/verify-email.reducer";
import * as fromDailyobjectsArtist from "./reducers/dailyobjects-artist.reducer";
import * as fromDesignerProfile from "../../designer-profile/store/designer-profile.reducer";
import * as fromOrdertracker from "../../ordertracker/store/ordertracker.reducer";
import * as fromPushNotification from "../../core/push-notification/store/push-notification.reducer";
import * as fromBrandSpecificCases from "../../brand-specific-cases/store/brand-specific-cases.reducer";
import * as fromBundles from "../../bundles/store/bundles.reducer";
export interface AppState {
	network: fromNetwork.NetworkState;
	screen: fromScreen.ScreenState;
	os: fromOs.OsState;
	router: fromRouter.RouterState;
	currentUser: fromCurrentUser.CurrentUserState;
	auth: fromAuth.AuthState;
	home: fromHome.HomeState;
	contactUs: fromContactUs.ContactUsState;
	pdp: fromPdp.PdpState;
	designerCases: fromDesignerCases.DesignerCasesState;
	checkout: fromCheckout.CheckoutState;
	cart: fromCart.CartState;
	onlineGifts: fromOnlineGifts.OnlineGiftsModuleState;
	cartService: fromCartService.CartServiceState;
	customer: fromCustomer.CustomerModuleState;
	shared: fromShared.SharedModuleState;
	designerCollection: fromDesignerCollection.DesignerCollectionModuleState;
	productListing: fromProductListing.ProductListingState;
	paymentSuccess: fromPaymentSuccess.PaymentSuccessState;
	newsletterSubscription: fromNewsletterSubscription.NewsLetterSubscriptionModuleState;
	sleeves: fromSleeves.SleevesModuleState;
	wallets: fromWallets.WalletsModuleState;
	tabletSleeves: fromTabletSleeves.TabletSleevesModuleState;
	designerInvite: fromDesignerInvite.DesignerInviteModuleState;
	caseCollection: fromCaseCollection.CaseCollectionModuleState;
	trackYourOrder: fromTrackYourOrder.TrackYourOrderModuleState;
	verifyEmail: fromVerifyEmail.VerifyEmailState;
	dailyobjectsArtist: fromDailyobjectsArtist.DailyobjectsArtistState;
	designerProfile: fromDesignerProfile.DesignerProfileState;
	ordertracker: fromOrdertracker.OrdertrackingState;
	PushNotification: fromPushNotification.PushNotificationModuleState;
	brandSpecificCases: fromBrandSpecificCases.BrandSpecificCaseModuleState;
	bundles: fromBundles.BundleModuleState;
}

export const reducers: ActionReducerMap<AppState> = {
	network: fromNetwork.reducer,
	onlineGifts: fromOnlineGifts.reducer,
	screen: fromScreen.reducer,
	os: fromOs.reducer,
	router: fromRouter.reducer,
	currentUser: fromCurrentUser.reducer,
	auth: fromAuth.reducer,
	home: fromHome.reducer,
	contactUs: fromContactUs.reducer,
	pdp: fromPdp.reducer,
	designerCases: fromDesignerCases.reducer,
	checkout: fromCheckout.reducer,
	cart: fromCart.reducer,
	cartService: fromCartService.reducer,
	customer: fromCustomer.reducer,
	designerCollection: fromDesignerCollection.reducer,
	shared: fromShared.reducer,
	productListing: fromProductListing.reducer,
	paymentSuccess: fromPaymentSuccess.reducer,
	newsletterSubscription: fromNewsletterSubscription.reducer,
	sleeves: fromSleeves.reducer,
	wallets: fromWallets.reducer,
	tabletSleeves: fromTabletSleeves.reducer,
	designerInvite: fromDesignerInvite.reducer,
	caseCollection: fromCaseCollection.reducer,
	trackYourOrder: fromTrackYourOrder.reducer,
	verifyEmail: fromVerifyEmail.reducer,
	dailyobjectsArtist: fromDailyobjectsArtist.reducer,
	designerProfile: fromDesignerProfile.reducer,
	ordertracker: fromOrdertracker.reducer,
	PushNotification: fromPushNotification.reducer,
	brandSpecificCases: fromBrandSpecificCases.reducer,
	bundles: fromBundles.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

/**
 * Network store functions
 */

export const getNetworkState = createFeatureSelector<fromNetwork.NetworkState>(
	"network"
);
export const getIsOnline = createSelector(
	getNetworkState,
	fromNetwork.getIsOnline
);

/**
 * Screen store functions
 */
export const getScreenState = createFeatureSelector<fromScreen.ScreenState>(
	"screen"
);

export const isMobile = createSelector(
	getScreenState,
	fromScreen.getIsMobile
);

export const isTablet = createSelector(
	getScreenState,
	fromScreen.getIsTablet
);

export const isDesktop = createSelector(
	getScreenState,
	fromScreen.getIsDesktop
);

/**
 * Os store functions
 */
export const getOsState = createFeatureSelector<fromOs.OsState>("os");

export const isAndroid = createSelector(
	getOsState,
	fromOs.getIsAndroid
);

export const isIos = createSelector(
	getOsState,
	fromOs.getIsIos
);

export const isOtherOs = createSelector(
	getOsState,
	fromOs.getIsIos
);

/**
 * Router Store functions
 */
export const getRouterState = createFeatureSelector<fromRouter.RouterState>(
	"router"
);

export const getActiveRouterState = createSelector(
	getRouterState,
	fromRouter.getActiveRouterState
);

/**
 * Auth store functions
 */
export const getAuthState = createFeatureSelector<fromAuth.AuthState>("auth");
export const getOTPSuccessResponse = createSelector(
	getAuthState,
	fromAuth.getOTPSuccessResponse
);
export const getOTPFailError = createSelector(
	getAuthState,
	fromAuth.getOTPFailError
);
export const getOTPVerifiedToken = createSelector(
	getAuthState,
	fromAuth.getOTPVerifiedToken
);
export const getRegisteredUserToken = createSelector(
	getAuthState,
	fromAuth.getRegisteredUserToken
);
export const getRegisterFailError = createSelector(
	getAuthState,
	fromAuth.getRegisterFailError
);
export const getVerifyOTPFailError = createSelector(
	getAuthState,
	fromAuth.getVerifyOTPFailError
);
export const getSocialLoginSuccessResponse = createSelector(
	getAuthState,
	fromAuth.getSocialLoginSuccessResponse
);
export const getSocialLoginToken = createSelector(
	getAuthState,
	fromAuth.getSocialLoginToken
);
export const forgetPassword = createSelector(
	getAuthState,
	fromAuth.forgetPassword
);
export const forgetPasswordFailError = createSelector(
	getAuthState,
	fromAuth.forgetPasswordFailError
);

/**
 * Current User Selectors
 */
export const getCurrentUserState = createFeatureSelector<
	fromCurrentUser.CurrentUserState
>("currentUser");

export const getCurrentUserLoading = createSelector(
	getCurrentUserState,
	fromCurrentUser.getCurrentUserLoading
);
export const getCurrentUser = createSelector(
	getCurrentUserState,
	fromCurrentUser.getCurrentUser
);
export const getCurrentUserFailResponse = createSelector(
	getCurrentUserState,
	fromCurrentUser.getCurrentUserFailed
);

/**
 * Home store functions
 */

export const getHomeState = createFeatureSelector<fromHome.HomeState>("home");
export const getCurrentOffers = createSelector(
	getHomeState,
	fromHome.getCurrentOffers
);
export const getCurrentOffersFailed = createSelector(
	getHomeState,
	fromHome.getCurrentOfferFailed
);
export const getDealsOfTheDay = createSelector(
	getHomeState,
	fromHome.getDealsOfTheDay
);
export const getDealsOfTheDayFailed = createSelector(
	getHomeState,
	fromHome.getDealsOfTheDayFailed
);
export const getCategoryListing = createSelector(
	getHomeState,
	fromHome.getCategoryListing
);
export const getCategoryListingFailed = createSelector(
	getHomeState,
	fromHome.getCategoryListingFailed
);
export const getMobileFeed = createSelector(
	getHomeState,
	fromHome.getMobileFeed
);
export const getMobileFeedFailed = createSelector(
	getHomeState,
	fromHome.getMobileFeedFailed
);
export const campaignRelatedData = createSelector(
	getHomeState,
	fromHome.campaignRelatedData
);
export const campaignRelatedDataFailed = createSelector(
	getHomeState,
	fromHome.campaignRelatedDataFailed
);

/**
 * Contact Us store functions For Options
 */

export const getContactUsState = createFeatureSelector<
	fromContactUs.ContactUsState
>("contactUs");
export const getContactUsOptions = createSelector(
	getContactUsState,
	fromContactUs.getContactUsOptions
);
export const getContactUsOptionsFailed = createSelector(
	getContactUsState,
	fromContactUs.getContactUsOptionsFailed
);

/**
 * Contact Us store functions For Emails
 */

export const getContactUsEmails = createSelector(
	getContactUsState,
	fromContactUs.getContactUsEmails
);
export const getContactUsEmailsFailed = createSelector(
	getContactUsState,
	fromContactUs.getContactUsEmailsFailed
);

/**
 * Contact Us store functions For Orders
 */

export const getContactUsOrders = createSelector(
	getContactUsState,
	fromContactUs.getContactUsOrders
);
export const getContactUsOrdersFailed = createSelector(
	getContactUsState,
	fromContactUs.getContactUsOrdersFailed
);

/**
 * Contact Us store functions For Form ticket
 */

export const submitContactUsForm = createSelector(
	getContactUsState,
	fromContactUs.submitContactUsForm
);
export const submitContactUsFormFailed = createSelector(
	getContactUsState,
	fromContactUs.submitContactUsFormFailed
);

/**
 * Pdp store functions
 */

export const getPdpState = createFeatureSelector<fromPdp.PdpState>("pdp");
export const getProductDetail = createSelector(
	getPdpState,
	fromPdp.getProductDetail
);
export const getProductList = createSelector(
	getPdpState,
	fromPdp.getProductList
);
export const getProductCurrentOffer = createSelector(
	getPdpState,
	fromPdp.getProductCurrentOffer
);
export const getSimilarProducts = createSelector(
	getPdpState,
	fromPdp.getSimilarProducts
);

/**
 * Designer Cases store functions For Category
 */
export const getDesignerCasesState = createFeatureSelector<
	fromDesignerCases.DesignerCasesState
>("designerCases");
export const getDesignerCasesCategory = createSelector(
	getDesignerCasesState,
	fromDesignerCases.getDesignerCasesCategory
);
export const getDesignerCasesCategoryFailed = createSelector(
	getDesignerCasesState,
	fromDesignerCases.getDesignerCasesCategoryFailed
);
/*
 * Checkout store functions
 */

export const getCheckoutState = createFeatureSelector<
	fromCheckout.CheckoutState
>("checkout");
export const getCheckoutCountry = createSelector(
	getCheckoutState,
	fromCheckout.getCheckoutCountry
);
export const getCheckoutCountryFailed = createSelector(
	getCheckoutState,
	fromCheckout.getCheckoutCountryFailed
);
export const getCountryState = createSelector(
	getCheckoutState,
	fromCheckout.getCountryState
);
export const getCheckoutStateFailed = createSelector(
	getCheckoutState,
	fromCheckout.getCheckoutStateFailed
);
export const getCheckoutPincode = createSelector(
	getCheckoutState,
	fromCheckout.getCheckoutPincode
);
export const getCheckoutPincodeFailed = createSelector(
	getCheckoutState,
	fromCheckout.getCheckoutPincodeFailed
);

export const addCheckoutNewAddress = createSelector(
	getCheckoutState,
	fromCheckout.addCheckoutNewAddress
);
export const addCheckoutNewAddressFailed = createSelector(
	getCheckoutState,
	fromCheckout.addCheckoutNewAddressFailed
);
export const checkoutPaymentLists = createSelector(
	getCheckoutState,
	fromCheckout.checkoutPaymentLists
);
export const checkoutPaymentListsFailed = createSelector(
	getCheckoutState,
	fromCheckout.checkoutPaymentListsFailed
);

/*
 **
 * Cart store functions
 */

export const getCartState = createFeatureSelector<fromCart.CartState>("cart");
export const getCartProducts = createSelector(
	getCartState,
	fromCart.getCartProducts
);
export const getCartTotals = createSelector(
	getCartState,
	fromCart.getCartTotals
);
export const getCartId = createSelector(
	getCartState,
	fromCart.getCartId
);
export const getCartDataFailed = createSelector(
	getCartState,
	fromCart.getCartDataFailed
);

export const getCartAccessories = createSelector(
	getCartState,
	fromCart.getCartAccessories
);
export const getCartAccessoriesFailed = createSelector(
	getCartState,
	fromCart.getCartAccessoriesFailed
);

export const getCartListProducts = createSelector(
	getCartState,
	fromCart.getCartListProducts
);
export const getCartListProductsFailed = createSelector(
	getCartState,
	fromCart.getCartListProductsFailed
);

/*
 **
 * Cart Service store functions
 */

export const getCartServiceState = createFeatureSelector<
	fromCartService.CartServiceState
>("cartService");
export const getCartServiceData = createSelector(
	getCartServiceState,
	fromCartService.getCartServiceData
);
export const getCartServiceDataFailed = createSelector(
	getCartServiceState,
	fromCartService.getCartServiceDataFailed
);
export const updateServiceCart = createSelector(
	getCartServiceState,
	fromCartService.updateServiceCart
);
export const updateCartServiceDataFailed = createSelector(
	getCartServiceState,
	fromCartService.updateCartServiceFailed
);
export const offerShow = createSelector(
	getCartServiceState,
	fromCartService.offerShow
);
export const offerShowFailed = createSelector(
	getCartServiceState,
	fromCartService.offerShowFailed
);

export const applyCoupon = createSelector(
	getCartServiceState,
	fromCartService.applyCoupon
);
export const applyCouponFailed = createSelector(
	getCartServiceState,
	fromCartService.applyCouponFailed
);
export const removeCoupon = createSelector(
	getCartServiceState,
	fromCartService.removeCoupon
);
export const removeCouponFailed = createSelector(
	getCartServiceState,
	fromCartService.removeCouponFailed
);
export const guestUserCartData = createSelector(
	getCartServiceState,
	fromCartService.guestUserCartData
);
export const guestUserCartDataFailed = createSelector(
	getCartServiceState,
	fromCartService.guestUserCartDataFailed
);
/*
 * Shared Module functions
 */
export const getSharedModuleState = createFeatureSelector<
	fromShared.SharedModuleState
>("shared");
export const getMobileMenu = createSelector(
	getSharedModuleState,
	fromShared.getMobileMenu
);
export const getDesktopMenu = createSelector(
	getSharedModuleState,
	fromShared.getDesktopMenu
);
export const getLandingPage = createSelector(
	getSharedModuleState,
	fromShared.getLandingPageJson
);
/**
 * Designer Collection Module fucntions
 */
export const getDesignerCollectionModuleState = createFeatureSelector<
	fromDesignerCollection.DesignerCollectionModuleState
>("designerCollection");
export const getExclusiveProduct = createSelector(
	getDesignerCollectionModuleState,
	fromDesignerCollection.getExclusive
);
export const getNewArrivalProduct = createSelector(
	getDesignerCollectionModuleState,
	fromDesignerCollection.getNewArrival
);
export const getIntermediateData = createSelector(
	getDesignerCollectionModuleState,
	fromDesignerCollection.getIntermediateData
);
/**
 * Case Collection Module Functions
 */
export const getCaseCollectionModuleState = createFeatureSelector<
	fromCaseCollection.CaseCollectionModuleState
>("caseCollection");
export const getIntermediateDataCaseCollection = createSelector(
	getCaseCollectionModuleState,
	fromCaseCollection.getIntermediateData
);

/**OnlineGifts Module Functions */

export const onlineGiftsModuleState = createFeatureSelector<
	fromOnlineGifts.OnlineGiftsModuleState
>("OnlineGifts");
export const submitQuery = createSelector(
	onlineGiftsModuleState,
	fromOnlineGifts.submitQuery
);

/**
 * Sleeves Store Functions
 */
export const sleevesModuleState = createFeatureSelector<
	fromSleeves.SleevesModuleState
>("sleeves");
export const sleevesIntermediateData = createSelector(
	sleevesModuleState,
	fromSleeves.getIntermediateData
);
/**
 * Brand Page Store Functions
 */
export const brandSpecificCasesModuleState = createFeatureSelector<
	fromBrandSpecificCases.BrandSpecificCaseModuleState
>("brandSpecificCases");
export const brandSpecificCasesIntermediateData = createSelector(
	brandSpecificCasesModuleState,
	fromBrandSpecificCases.getBrandSpecificCases
);
export const brandContent = createSelector(
	brandSpecificCasesModuleState,
	fromBrandSpecificCases.brandContent
);
/**
 * Bundles Store Functions
 */
export const bundleModuleState = createFeatureSelector<
	fromBundles.BundleModuleState
>("bundles");
export const bundlesIntermediateData = createSelector(
	bundleModuleState,
	fromBundles.getIntermediateData
);
/**
 * Bundle Listing Store Functions
 */

/**
 * Wallets Store Functions
 */
export const walletsModuleState = createFeatureSelector<
	fromWallets.WalletsModuleState
>("wallets");
export const walletsIntermediateData = createSelector(
	walletsModuleState,
	fromWallets.getIntermediateData
);

/**
 * Tablet Sleeves Module Function
 */
export const TabletSleevesModuleState = createFeatureSelector<
	fromTabletSleeves.TabletSleevesModuleState
>("tabletSleeves");
export const tabletSleevesData = createSelector(
	TabletSleevesModuleState,
	fromTabletSleeves.getTabletSleevesModelData
);
/**
 * Customer Module Functions
 */
export const customerState = createFeatureSelector<
	fromCustomer.CustomerModuleState
>("customer");
export const getCountriesForAddressForm = createSelector(
	customerState,
	fromCustomer.getCountries
);
export const putUpdatedPasswordForCustomerAccount = createSelector(
	customerState,
	fromCustomer.putUpdatedPassword
);
export const updateUserPasswordSuccess = createSelector(
	customerState,
	fromCustomer.updateUserPasswordSuccess
);
export const putUpdatedPasswordFailForCustomerAccount = createSelector(
	customerState,
	fromCustomer.updatedPasswordFail
);
export const getStatesForAddressForm = createSelector(
	customerState,
	fromCustomer.getStates
);
export const getPincodeForAddressForm = createSelector(
	customerState,
	fromCustomer.getPinCode
);
export const userOrder = createSelector(
	customerState,
	fromCustomer.userOrder
);
export const putUserSuccessResponse = createSelector(
	customerState,
	fromCustomer.putUserSuccessResponse
);
export const verifyEmailSuccess = createSelector(
	customerState,
	fromCustomer.verifyEmailSuccess
);
export const verifyEmailFail = createSelector(
	customerState,
	fromCustomer.VerifyEmailFail
);

/**Designer Invite Module Functions */
export const designerInviteState = createFeatureSelector<
	fromDesignerInvite.DesignerInviteModuleState
>("designerInvite");
export const designerInviteSuccessResponse = createSelector(
	designerInviteState,
	fromDesignerInvite.designerInviteResponse
);
export const getCountriesForDesignerInviteForm = createSelector(
	designerInviteState,
	fromDesignerInvite.getCountries
);

/*
 * Product Listing store functions
 */
export const getProductListingState = createFeatureSelector<
	fromProductListing.ProductListingState
>("productListing");
export const getProductFeed = createSelector(
	getProductListingState,
	fromProductListing.getProductFeed
);
export const getProductFeedLoaded = createSelector(
	getProductListingState,
	fromProductListing.productFeedLoaded
);
export const getProductModels = createSelector(
	getProductListingState,
	fromProductListing.productModels
);
export const getProductBrands = createSelector(
	getProductListingState,
	fromProductListing.productBrands
);
export const getProductListingActivePage = createSelector(
	getProductListingState,
	fromProductListing.getActivePage
);
export const resetProductListingActivePage = createSelector(
	getProductListingState,
	fromProductListing.resetActivePage
);
export const getCollectionFilters = createSelector(
	getProductListingState,
	fromProductListing.getCollectionFilters
);
export const getFirstProductOfFeed = createSelector(
	getProductListingState,
	fromProductListing.getFirstProductOfFeed
);
export const getTotalProductCountOfFeed = createSelector(
	getProductListingState,
	fromProductListing.getTotalProductCountOfFeed
);
export const getProductListngOffer = createSelector(
	getProductListingState,
	fromProductListing.productOffer
);
export const getLastVisitedListing = createSelector(
	getProductListingState,
	fromProductListing.getlastVisitedListing
);
export const getBuildOptionTabsForMobile = createSelector(
	getProductListingState,
	fromProductListing.getBuildOptionTabsForMobile
);
export const listingContent = createSelector(
	getProductListingState,
	fromProductListing.listingContent
);
export const listingContentFailed = createSelector(
	getProductListingState,
	fromProductListing.listingContentFailed
);
export const getCategoryBrandsForTabletSleeves = createSelector(
	getProductListingState,
	fromProductListing.getCategoryBrandsForTabletSleeves
);
export const collection = createSelector(
	getProductListingState,
	fromProductListing.collection
);

/*
 **
 * Payment Success Store functions
 */
export const getPaymentSuccessState = createFeatureSelector<
	fromPaymentSuccess.PaymentSuccessState
>("paymentSuccess");
export const getPaymentSuccessData = createSelector(
	getPaymentSuccessState,
	fromPaymentSuccess.getPaymentSuccessData
);
export const getPaymentSuccessDataFailed = createSelector(
	getPaymentSuccessState,
	fromPaymentSuccess.getPaymentSuccessDataFailed
);

export const getGoogleConversionStatusChange = createSelector(
	getPaymentSuccessState,
	fromPaymentSuccess.getGoogleConversionStatusChange
);
export const getGoogleConversionStatusChangeFailed = createSelector(
	getPaymentSuccessState,
	fromPaymentSuccess.getGoogleConversionStatusChangeFailed
);

/**
 * NewsLetter Subscription Service store functions
 */
export const getNewsLetterSubscription = createFeatureSelector<
	fromNewsletterSubscription.NewsLetterSubscriptionModuleState
>("newsletterSubscription");
export const newsletterSubscription = createSelector(
	getNewsLetterSubscription,
	fromNewsletterSubscription.subscribeUser
);
export const getPushNotification = createFeatureSelector<
	fromPushNotification.PushNotificationModuleState
>("PushNotification");
export const PushNotification = createSelector(
	getPushNotification,
	fromPushNotification.getNotification
);

/**
 * Track Your Order Service store function
 */
export const getTrackYourOrderState = createFeatureSelector<
	fromTrackYourOrder.TrackYourOrderModuleState
>("trackYourOrder");
export const getOrderStatus = createSelector(
	getTrackYourOrderState,
	fromTrackYourOrder.orderStatusResponse
);

/**
 * Verify Email Store Functions
 */
export const getVerifyEmailState = createFeatureSelector<
	fromVerifyEmail.VerifyEmailState
>("verifyEmail");
export const getVerifyEmailSuccess = createSelector(
	getVerifyEmailState,
	fromVerifyEmail.getVerifyEmailSuccess
);
export const getVerifyEmailFail = createSelector(
	getVerifyEmailState,
	fromVerifyEmail.getVerifyEmailFail
);

/*
 **
 * Dailyobjects Artist Store functions
 */
export const getDailyobjectsArtistState = createFeatureSelector<
	fromDailyobjectsArtist.DailyobjectsArtistState
>("dailyobjectsArtist");
export const getDailyobjectsArtistData = createSelector(
	getDailyobjectsArtistState,
	fromDailyobjectsArtist.getDailyobjectsArtistData
);
export const getDailyobjectsArtistDataFailed = createSelector(
	getDailyobjectsArtistState,
	fromDailyobjectsArtist.getDailyobjectsArtistDataFailed
);

/**
 * Designer Profile Store Functions
 */
export const getDesignerProfileState = createFeatureSelector<
	fromDesignerProfile.DesignerProfileState
>("designerProfile");
export const getDesignerProfileSuccess = createSelector(
	getDesignerProfileState,
	fromDesignerProfile.getDesignerProfileSuccess
);
export const getDesignerCasesModelSuccess = createSelector(
	getDesignerProfileState,
	fromDesignerProfile.getDesignerCasesModelSuccess
);

/**
 * Order Tracker Store Functions
 */
export const getOrderTrackerState = createFeatureSelector<
	fromOrdertracker.OrdertrackingState
>("ordertracker");
export const getTrackingDetailsSuccess = createSelector(
	getOrderTrackerState,
	fromOrdertracker.getTrackingDetailsSuccess
);
export const getTrackingDetailsFail = createSelector(
	getOrderTrackerState,
	fromOrdertracker.getTrackingDetailsFail
);
