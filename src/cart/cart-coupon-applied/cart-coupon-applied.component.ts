import { Component, OnInit, Input, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
	selector: "app-cart-coupon-applied",
	templateUrl: "./cart-coupon-applied.component.html",
	styleUrls: ["./cart-coupon-applied.component.scss"],
})
export class CartCouponAppliedComponent implements OnInit {
	couponCode = {};
	@Input() offerMessageData: Array<object>;
	constructor(
		public dialogRef: MatDialogRef<CartCouponAppliedComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Array<object>
	) {
		this.offerMessageData = [];
	}
	dialogClose() {
		this.dialogRef.close();
	}
	ngOnInit() {}
}
