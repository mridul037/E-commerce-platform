import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CheckoutSandbox } from "../checkout.sandbox";
import { CartService } from "../../core/cart/cart.service";
import { NewsletterSuscriptionService } from "../../core/newsletter-subscription/newsletter-suscription.service";
import { LoaderService } from "../../core/loader.service";
import { takeUntil, filter, take } from "rxjs/operators";
import { LogsService } from "../../core/kb-logs/kibana-logs.service";
@Component({
	selector: "app-checkout-container",
	templateUrl: "./checkout-container.component.html",
	styleUrls: ["./checkout-container.component.scss"],
})
export class CheckoutContainerComponent implements OnInit, OnDestroy {
	checkoutCountry$: Observable<object>;
	checkoutAddress$: Observable<object>;
	checkoutState$: Observable<object>;
	checkoutPincode$: Observable<object>;
	checkoutPaymentListData$: Observable<object>;
	cartData$: Observable<object>;
	cartAllData$: Observable<object>;
	guestUserCartData$: Observable<object>;
	currentUser$: Observable<object>;
	cartTotals$: Observable<object>;
	checkoutAddressFailed$: Observable<object>;
	PaymentListRequestPayload = {};
	CountryRequestPayload: object;
	StateRequestPayload: object;
	private destory$: Subject<boolean>;
	usersData = {};
	userValue = {};
	device: string;
	constructor(
		public checkoutSandbox: CheckoutSandbox,
		private cartService: CartService,
		private newsletterSubscriptionService: NewsletterSuscriptionService,
		private loaderService: LoaderService,
		private logService: LogsService
	) {
		this.destory$ = new Subject();
		this.checkoutCountry$ = this.checkoutSandbox.checkoutCountry$;
		this.checkoutAddress$ = this.checkoutSandbox.checkoutAddress$;
		this.checkoutState$ = this.checkoutSandbox.checkoutState$;
		this.checkoutPincode$ = this.checkoutSandbox.checkoutPincode$;
		this.checkoutPaymentListData$ = this.checkoutSandbox.checkoutPaymentListData$;
		this.currentUser$ = this.checkoutSandbox.currentUser$;
		this.cartTotals$ = this.checkoutSandbox.cartTotals$;
		this.cartAllData$ = this.checkoutSandbox.cartAllData$;
		this.checkoutAddressFailed$ = this.checkoutSandbox.checkoutAddressFailed$;
		this.device = this.checkoutSandbox.getDeviceType();
		this.CountryRequestPayload = {
			start: 0,
			count: 1000,
			sort: "name",
		};
		this.StateRequestPayload = {
			start: 0,
			count: 100,
			filter: { iso2CountryCode: { $eq: "IN" } },
		};

		this.cartData$ = this.cartService.cartData$;
		this.guestUserCartData$ = cartService.guestUserCartData$;
	}

	fetchUserByPincode(event: string) {
		this.checkoutSandbox.getCheckoutPincode(event);
	}

	addNewAddressByUser(event: object) {
		this.checkoutSandbox.addCheckoutNewAddress(event);
		// this.checkoutAddressFailed$
		// 	.pipe(
		// 		filter(value => typeof value !== "undefined"),
		// 		takeUntil(this.destory$)
		// 	)
		// 	.subscribe(failedData => {
		// 		this.logService.debugLog('error', `${JSON.stringify(failedData)}`);
		// 	})'
	}

	ngOnInit() {
		// this.checkoutAddress$.subscribe(value => {
		// 	console.log("value Dataaa:", value);
		// })'
		this.loaderService.hide();
		this.checkoutSandbox.getCountryState(this.StateRequestPayload);
		// this.cartAllData$.subscribe(value => {
		// 	if (value && value["data"] && value["data"]["_id"]) {
		// 		this.PaymentListRequestPayload = {
		// 			cartId: value["data"]["_id"],
		// 		};
		// 		this.checkoutSandbox.checkoutPaymentLists(
		// 			this.PaymentListRequestPayload
		// 		);
		// 	}
		// })'

		/**
		 * 	this.PaymentListRequestPayload = {
				cartId: localStorage.getItem("currentCartId"),
			};

			this.checkoutSandbox.checkoutPaymentLists(this.PaymentListRequestPayload);
		 */
	}

	ngOnDestroy() {
		this.destory$.unsubscribe();
	}

	getCheckoutPaymentLists(paymentListRequestPayload: object) {
		this.checkoutSandbox.checkoutPaymentLists(paymentListRequestPayload);
	}

	subscribeToNewsletter(event: object) {
		if (typeof event !== "undefined") {
			this.newsletterSubscriptionService.newsLetterSubscribe(event);
		}
	}
}
