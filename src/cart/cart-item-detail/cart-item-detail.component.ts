import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	SimpleChanges,
	OnChanges,
	Inject,
	ViewChild,
	TemplateRef,
	ElementRef,
	OnDestroy,
	Renderer2,
} from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Observable, Subject } from "rxjs";
import { CartService } from "../../core/cart/cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "../../core/loader.service";
import { GoogleRemarketingService } from "../../core/google-remarketing/google-remarketing.service";
import { environment } from "../../../environments/environment";
@Component({
	selector: "app-cart-item-detail",
	templateUrl: "./cart-item-detail.component.html",
	styleUrls: ["./cart-item-detail.component.scss"],
})
export class CartItemDetailComponent implements OnInit, OnChanges, OnDestroy {
	@Input() userData: Array<object>;
	@Input() userDataGet: Array<object>;
	@Input() cartProducts: Array<object>;
	@Input() cartTotals: object;
	@Input() cartAllData: object;
	@Input() RmCoupon: Array<object>;
	@Input() ApCoupon: Array<object>;
	@Input() refressCartUpdate: Array<object>;
	@Input() offerMessageData: Array<object>;
	@Input() accessories: Array<object>;
	@Input() cartListProducts: Array<object>;
	@Output() removeCartCoupon: EventEmitter<object>;
	@Output() applyCartCoupon: EventEmitter<object>;
	@Output() updateCartItem: EventEmitter<object>;
	@Output() removeCartItem: EventEmitter<object>;
	@Input() device: string;
	private destory$: Subject<boolean>;
	couponD = "";
	offerMsgBoxData: Array<object>;
	cartCouponMessage: object;
	cartCouponMessageHeader: Array<object>;
	value = "Clear me";
	userItemDetail: Array<object>;
	cartActivityFlag: string;
	couponApplied: boolean;
	couponCode: string;
	editcoupn: boolean;
	message: string;
	backGroundColor: string;
	userDataProduct = [];
	placeHolderValue: string;
	sessionId: string | null;
	marketingProducts: object;
	show: boolean;
	accessoryProductStatus: boolean;
	couponIndexCount: number;
	count: number;
	active: boolean;
	@ViewChild("couponDialog") couponDialog: TemplateRef<HTMLSpanElement>;
	@ViewChild("couponToaster") couponToaster: TemplateRef<HTMLSpanElement>;
	@ViewChild("couponDescription") couponDescription: ElementRef;
	constructor(
		private cartService: CartService,
		public dialog: MatDialog,
		public el: ElementRef,
		private router: Router,
		private snackBar: MatSnackBar,
		private loaderService: LoaderService,
		private googleRemarketingService: GoogleRemarketingService,
		private renderer: Renderer2
	) {
		this.device = "";
		this.placeHolderValue = "Please Enter Your Coupon";
		this.cartProducts = [];
		this.cartListProducts = [];
		this.cartTotals = {};
		this.userDataProduct = [];
		this.userData = [];
		this.userDataGet = [];
		this.cartAllData = {};
		this.offerMessageData = [];
		this.offerMsgBoxData = [];
		this.cartCouponMessageHeader = [];
		this.userItemDetail = [];
		this.RmCoupon = [];
		this.ApCoupon = [];
		this.refressCartUpdate = [];
		this.accessories = [];
		this.cartCouponMessage = {};
		this.couponD = "";
		this.couponCode = "";
		this.cartActivityFlag = "";
		this.couponApplied = false;
		this.editcoupn = false;
		this.removeCartCoupon = new EventEmitter<object>();
		this.applyCartCoupon = new EventEmitter<{}>();
		this.updateCartItem = new EventEmitter<object>();
		this.removeCartItem = new EventEmitter<object>();
		this.couponDialog = this.el.nativeElement;
		this.couponToaster = this.el.nativeElement;
		this.couponDescription = this.el.nativeElement;
		this.message = "";
		this.backGroundColor = "";
		this.sessionId = "";
		this.marketingProducts = {};
		this.destory$ = new Subject();
		this.show = false;
		this.accessoryProductStatus = false;
		this.couponIndexCount = -1;
		this.count = 0;
		this.active = false;
	}
	// tslint:disable-next-line:no-any
	dialogD: any;
	// tslint:disable-next-line:no-any
	openDialog(templateRef: any) {
		const dialogRef = this.dialog.open(templateRef, {
			width: "600px",
			height: "auto",
			panelClass: "coupon-dialog-container",
		});
		//dialogRef.componentInstance.couponCode = data
		this.dialogD = dialogRef;
	}
	dialogClose() {
		this.dialogD.close();
	}
	carMessageDescriptionCheck(indexCount: number) {
		this.couponIndexCount = indexCount;
		let n = 0;
		for (n; n < this.couponDescription.nativeElement["children"].length; n++) {
			const el = this.couponDescription.nativeElement["children"][n];
			const elClasslist = el["classList"];

			if (elClasslist.contains("show")) {
				this.renderer.removeClass(
					this.couponDescription.nativeElement["children"][n],
					"show"
				);
				this.active = false;
			} else {
				this.renderer.addClass(
					this.couponDescription.nativeElement["children"][n],
					"show"
				);

				this.active = true;
			}
		}
	}
	cartItem() {
		if (this.userData && this.userData["products"]) {
			this.userItemDetail = this.userData["products"];
		}
	}
	removeCartD(itemSlug: string, cartData: object) {
		this.cartActivityFlag = "productRemove";
		this.removeCartItem.emit({ slug: itemSlug, cart: cartData });
	}
	couponApply(couponData: string, cartDataData: object) {
		if (couponData !== "") {
			this.placeHolderValue = "Applied Coupon!";
			this.cartActivityFlag = "couponApply";
			this.applyCartCoupon.emit({ coupon: couponData, cartData: cartDataData });
		}
	}
	couponApplyMob(couponData: string, cartDataData: object, isEnabled: boolean) {
		if (isEnabled) {
			this.placeHolderValue = "Applied Coupon!";
			this.cartActivityFlag = "couponApply";
			this.applyCartCoupon.emit({ coupon: couponData, cartData: cartDataData });
		}
	}
	removeCoupon(cartData: object) {
		this.cartActivityFlag = "couponRemove";
		this.removeCartCoupon.emit(cartData);
	}
	qtyChange(qty: number, itemSlug: string, cartData: object) {
		this.cartActivityFlag = "qtyChange";
		this.updateCartItem.emit({
			qty: qty,
			slug: itemSlug,
			cart: cartData,
		});
	}
	cartShowQty() {
		const c = 10;
		const quantity = [];
		for (let i = 1; i <= c; i++) {
			quantity.push(i);
		}
		return quantity;
	}
	offerMsg() {
		if (this.offerMessageData && this.offerMessageData["cartData"]) {
			this.offerMsgBoxData = this.offerMessageData["cartData"]["data"];
		}
	}
	couponMsg() {
		this.cartDataDiffApi();
		if (
			this.userData &&
			this.userData["data"] &&
			this.userData["data"]["coupon"]
		) {
			this.cartCouponMessage = this.userData["data"]["coupon"];
		}
	}
	cartDataDiffApi() {
		if (
			this.userDataGet &&
			this.userDataGet["data"] &&
			this.userDataGet["data"]["totals"]
		) {
			this.userData = this.userDataGet;
			this.couponApplyCheck(this.userData);
		}
	}
	ngOnInit() {
		this.cartItem();
		this.offerMsg();
		this.couponMsg();
		this.cartDataDiffApi();
		this.googleRemarketing();
		// tslint:disable-next-line:no-duplicate-string
		ga("send", "event", "Cart Events", "Viewed Cart", "");
	}
	googleRemarketing() {
		if (
			this.cartAllData &&
			this.cartAllData["data"] &&
			this.cartAllData["data"]["totals"] &&
			this.cartAllData["data"]["totals"]["grandTotal"] &&
			this.cartAllData["products"]
		) {
			const marketProductNewArray = [];
			for (let i = 0; i < this.cartAllData["products"].length; i++) {
				this.marketingProducts = this.cartAllData["products"][i]["subProducts"];
				const productObject = {
					id: this.marketingProducts["sku"],
					google_business_vertical: "retail",
				};
				marketProductNewArray.push(productObject);
			}
			if (
				this.cartAllData &&
				this.cartAllData["products"] &&
				marketProductNewArray &&
				marketProductNewArray.length > 0
			) {
				this.googleRemarketingService.gaRemarketing(
					"event",
					"view_item_cart",
					this.cartAllData["data"]["totals"]["grandTotal"],
					marketProductNewArray
				);
			}
		}
	}
	backToShopping() {
		ga("send", "event", "Cart Events", "Clicked back to shopping", "");
	}
	redirectToCheckout() {
		ga("send", "event", "Cart Events", "Clicked Checkout");
		if (localStorage.getItem("stapeState") !== null) {
			localStorage.removeItem("stapeState");
		}
		this.loaderService.show();
		this.router.navigate(["", "checkout"]);
	}
	productRemove() {
		if (this.refressCartUpdate && this.refressCartUpdate["cartData"]) {
			this.userData = this.refressCartUpdate;

			this.userItemDetail = this.userData["products"];
			this.couponApplyCheck(this.userData);
		}
	}
	couponApplyCheck(couponData: object) {
		if (
			couponData &&
			couponData["data"] &&
			couponData["data"]["coupon"] &&
			couponData["data"]["coupon"]["couponCode"] &&
			couponData["data"]["coupon"]["couponCode"] !== ""
		) {
			this.couponApplied = true;
			this.couponCode = couponData["data"]["coupon"]["couponCode"];
			this.editcoupn = false;
			if (
				this.ApCoupon &&
				this.ApCoupon["data"] &&
				this.ApCoupon["data"]["success"] === true &&
				this.dialogD
			) {
				this.dialogClose();
			}
		} else {
			this.couponApplied = false;
			this.couponCode = "";
			this.editcoupn = true;
		}
	}
	editcoupnApply() {
		this.editcoupn = true;
		this.couponApplied = false;
		ga("send", "event", "Cart Events", "Clicked I have a different code", "");
	}
	notificationToasterMessage() {
		if (
			this.ApCoupon &&
			this.ApCoupon["data"] &&
			this.ApCoupon["data"]["success"] === true &&
			this.cartActivityFlag === "couponApply"
		) {
			this.backGroundColor = "#51a351";
			this.message = "Coupon Successfully Applied!";
			if (this.device === "website") {
				this.snackBar.openFromTemplate(this.couponToaster, {
					panelClass: ["coupon-apply-snackbar-desktop"],
					duration: 2000,
				});
			} else {
				this.snackBar.openFromTemplate(this.couponToaster, {
					panelClass: ["coupon-apply-snackbar-mobile"],
					duration: 2000,
				});
			}
		}
		if (
			this.RmCoupon &&
			this.RmCoupon["data"] &&
			this.RmCoupon["data"]["success"] === true &&
			this.cartActivityFlag === "couponRemove"
		) {
			this.backGroundColor = "#bd362f";
			this.message = "Coupon Successfully Removed!";
			if (this.device === "website") {
				this.snackBar.openFromTemplate(this.couponToaster, {
					panelClass: ["coupon-remove-snackbar-desktop"],
					duration: 2000,
				});
			} else {
				this.snackBar.openFromTemplate(this.couponToaster, {
					panelClass: ["coupon-remove-snackbar-mobile"],
					duration: 2000,
				});
			}
		}
		if (
			this.ApCoupon &&
			this.ApCoupon["data"] &&
			this.ApCoupon["data"]["success"] === false
		) {
			this.backGroundColor = "#bd362f";
			this.message = this.ApCoupon["data"]["message"];
			if (this.device === "website") {
				this.snackBar.openFromTemplate(this.couponToaster, {
					panelClass: ["coupon-apply-snackbar-desktop"],
					duration: 2000,
				});
			} else {
				this.snackBar.openFromTemplate(this.couponToaster, {
					panelClass: ["coupon-apply-snackbar-mobile"],
					duration: 2000,
				});
			}
		}
	}
	couponAply() {
		this.notificationToasterMessage();
		ga("send", "event", "Cart Events", "Clicked Apply", "");
		if (
			this.ApCoupon["data"] &&
			this.ApCoupon["data"]["data"] &&
			this.ApCoupon["data"]["data"]["totals"]
		) {
			this.userData = this.ApCoupon["data"];

			// if (
			// 	this.userData &&
			// 	this.userData["data"] &&
			// 	this.userData["data"]["coupon"] &&
			// 	this.userData["data"]["coupon"]["couponCode"] &&
			// 	this.userData["data"]["coupon"]["couponCode"] !== ""
			// ) {
			// 	this.dialogClose();
			// }'
			this.couponApplyCheck(this.userData);
		}
		//this.couponApplyCheck(this.userData)
		// else {
		// 	this.couponApplied = true;
		// 	this.couponCode = this.userData["data"]["coupon"]["couponCode"];
		// 	this.editcoupn = false;
		// 	this.dialogClose();
		// }
	}
	private productRemoveFlag() {
		if (this.cartActivityFlag === "productRemove") {
			this.productRemove();
		}
	}
	ngOnChanges(changes: SimpleChanges) {
		this.cartDataDiffApi();
		if (changes["userData"] && changes["userData"].currentValue !== undefined) {
			this.userData = changes["userData"].currentValue;
		}
		if (
			changes["cartListProducts"] &&
			changes["cartListProducts"].currentValue !== undefined
		) {
			this.cartListProducts = changes["cartListProducts"].currentValue;
		}
		this.offerMsg();
		this.couponMsg();
		this.productRemoveFlag();
		if (
			this.cartActivityFlag === "qtyChange" &&
			this.refressCartUpdate &&
			this.refressCartUpdate["cartData"]
		) {
			this.couponApplyCheck(this.userData);
			this.userData = this.refressCartUpdate;
		}
		if (this.cartActivityFlag === "couponApply") {
			setTimeout(() => {
				if (
					changes["ApCoupon"] &&
					changes["ApCoupon"].currentValue !== undefined
				) {
					this.couponAply();
				}
			});
		}

		if (
			this.cartActivityFlag === "couponRemove" &&
			this.RmCoupon &&
			this.RmCoupon["data"]
		) {
			setTimeout(() => {
				this.userData = this.RmCoupon["data"];
				this.notificationToasterMessage();
				this.couponApplyCheck(this.userData);
			});
			//window.location.reload()
		}

		if (changes["userData"] && changes["userData"].currentValue !== undefined) {
			this.userData = changes["userData"].currentValue;
			this.couponApplyCheck(this.userData);
		}
		if (
			changes["cartProducts"] &&
			changes["cartProducts"].currentValue !== undefined
		) {
			this.cartProducts = changes["cartProducts"].currentValue;
			this.googleRemarketing();
		}
	}
	checkLoggedInUser() {
		if (localStorage.getItem("do_token")) {
			this.router.navigate(["/checkout"]);
			this.googleRemarketing();
		} else {
			this.router.navigate(["/auth/login"]);
		}
	}
	getPrice(price: number) {
		if (price > 0) return "₹" + price;
		else return "₹0";
	}

	addToCart(product: object): void {
		const cart = {};
		cart["cart"] = this.cartAllData;
		this.loaderService.show();
		this.cartService.addToCartService(product, cart);
	}
	check(slug: string) {
		const cart = {};
		cart["cart"] = this.cartAllData;
		this.accessoryProductStatus = this.cartService.productExistInCart(
			slug,
			cart
		);
		return this.accessoryProductStatus;
	}
	ngOnDestroy(): void {
		this.destory$.unsubscribe();
	}
	get(arg: string) {
		const s1 = arg.replace("DailyObjects ", "");
		return s1.substr(0, s1.lastIndexOf("For "));
	}
}
