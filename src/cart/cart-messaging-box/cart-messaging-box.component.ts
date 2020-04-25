import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { CartService } from "../../core/cart/cart.service";

@Component({
	selector: "app-cart-messaging-box",
	templateUrl: "./cart-messaging-box.component.html",
	styleUrls: ["./cart-messaging-box.component.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CartMessagingBoxComponent implements OnInit {
	@Input() offerMessageData: Array<object>;
	@Input() userData: Array<object>;
	offerMsgBoxData: Array<object>;
	cartCouponMessage: object;
	cartCouponMessageHeader: Array<object>;
	value = "Clear me";
	constructor(private cartService: CartService) {
		this.offerMessageData = [];
		this.offerMsgBoxData = [];
		this.userData = [];
		this.cartCouponMessage = {};
		this.cartCouponMessageHeader = [];
	}

	ngOnInit() {
		if (
			this.offerMessageData &&
			this.offerMessageData["cartData"] &&
			this.offerMessageData["cartData"]["offerCartData"]
		) {
			this.offerMsgBoxData = this.offerMessageData["cartData"]["offerCartData"][
				"data"
			];
		}
		if (
			this.userData &&
			this.userData["data"] &&
			this.userData["data"]["coupon"]
		) {
			this.cartCouponMessage = this.userData["data"]["coupon"];
		}
	}
}
