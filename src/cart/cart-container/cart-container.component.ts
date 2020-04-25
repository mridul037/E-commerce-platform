import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CartSandbox } from "../cart.sandbox";
import { CartService } from "../../core/cart/cart.service";
import { takeUntil, filter } from "rxjs/operators";
import { LoaderService } from "../../core/loader.service";
const enum FilterKey {
	SLUG = "slug",
	CATEGORIES_SLUG = "categories.slug",
	MODEL_VALUE = "model.slug",
	BRAND_VALUE = "brand.slug",
	SUBPRODUCTS_STATUS = "subProducts.status",
	BUILD_OPTION_TYPE = "subProducts.buildOptions.type",
}
@Component({
	selector: "app-cart-container",
	templateUrl: "./cart-container.component.html",
	styleUrls: ["./cart-container.component.scss"],
})
export class CartContainerComponent implements OnInit, OnDestroy {
	cartData$: Observable<object>;
	cartAllData$: Observable<object>;
	cartProducts$: Observable<object>;
	cartTotals$: Observable<object>;
	cartAccessory$: Observable<object>;
	offerMessage$: Observable<object>;
	updateCartData1$: Observable<object>;
	guestUserCartData$: Observable<object>;
	refresCartDataAfterRemoveCoupon$: Observable<object>;
	refresCartDataAfterApplyCoupon$: Observable<object>;
	getCartListProducts$: Observable<object>;
	private destory$: Subject<boolean>;
	loggedInUser: boolean;
	device: string;
	constructor(
		public cartSandbox: CartSandbox,
		private cartService: CartService,
		private loaderService: LoaderService
	) {
		this.destory$ = new Subject();
		this.loggedInUser = false;
		this.cartData$ = cartService.cartData$;
		this.cartProducts$ = cartSandbox.cartProducts$;
		this.cartTotals$ = cartSandbox.cartTotals$;
		this.cartAccessory$ = cartSandbox.cartAccessory$;
		this.offerMessage$ = cartService.offerMessage$;
		this.refresCartDataAfterRemoveCoupon$ =
			cartService.refresCartDataAfterRemoveCoupon$;
		this.refresCartDataAfterApplyCoupon$ =
			cartService.refresCartDataAfterApplyCoupon$;
		this.updateCartData1$ = cartService.updateCartData1$;
		this.guestUserCartData$ = cartService.guestUserCartData$;
		this.cartAllData$ = cartSandbox.cartAllData$;
		this.getCartListProducts$ = cartSandbox.getCartListProducts$;
		this.device = this.cartSandbox.getDeviceType();
	}

	ngOnInit() {
		this.cartSandbox.getCartAccessories();
		this.accessoryPhonegrippr();
		this.getCartListProducts$.subscribe(value => {});
		this.offerMessage$ = this.cartService.offerMessage$;
		this.cartAllData$
			.pipe(
				filter(cartData => typeof cartData !== "undefined"),
				takeUntil(this.destory$)
			)
			.subscribe(() => {
				this.loaderService.hide();
			});
		this.cartAllData$.subscribe(data => {
			this.updateCartOffers();
		});
	}

	ngOnDestroy(): void {
		this.destory$.unsubscribe();
	}
	updateCartOffers() {
		this.cartService.offerWithCartId();
	}

	removeCartCouponByParent(event: object) {
		this.cartService.removeCouponData(event);
	}
	applyCartCouponByParent(event: object) {
		this.cartService.applyCouponData(event);
	}
	updateCartItemByParent(event: object) {
		this.cartService.updateItemQty(event);
	}
	removeCartItemByParent(event: object) {
		this.cartService.removeFromCart(event);
	}
	private getPhoneGripprFilter(): object {
		const obj = {};
		obj[FilterKey.CATEGORIES_SLUG] = {
			$eq: "mobile-accessories",
		};
		obj[FilterKey.BRAND_VALUE] = {
			$eq: "dailyobjects",
		};
		obj[FilterKey.MODEL_VALUE] = {
			$eq: "wander-wallet",
		};
		obj[FilterKey.SUBPRODUCTS_STATUS] = {
			$eq: "active",
		};
		obj[FilterKey.BUILD_OPTION_TYPE] = {
			$nin: ["designer"],
		};
		return {
			...obj,
		};
	}
	private accessoryPhonegrippr() {
		const payload = {
			start: 0,
			count: 9,
			filter: this.getPhoneGripprFilter(),
			fields:
				"slug,categories.slug,brand.slug,model.name,model.slug,subProducts.exclusiveOffer,subProducts.sku,subProducts.name, subProducts.codAllowed, subProducts.name,subProducts.slug,subProducts.thumbnail,subProducts.buildOptions,subProducts.mrp,subProducts.sellingPrice,subProducts.inventoryPrice,subProducts.inventory,subProducts.tags.slug,subProducts.status,subProducts",
			sort: "-subProducts.popularity",
		};

		this.cartSandbox.getCartProductList(payload);
	}
}
