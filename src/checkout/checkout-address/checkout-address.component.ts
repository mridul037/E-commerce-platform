import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	OnChanges,
	SimpleChanges,
	OnDestroy,
} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, Subject } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { LogsService } from "../../core/kb-logs/kibana-logs.service";
import { AuthService } from "../../core/auth.service";
import { LoaderService } from "../../core/loader.service";

@Component({
	selector: "app-checkout-address",
	templateUrl: "./checkout-address.component.html",
	styleUrls: ["./checkout-address.component.scss"],
})
export class CheckoutAddressComponent implements OnInit, OnChanges, OnDestroy {
	@Input() CheckoutState: Array<object>;
	@Input() paymentMethodListData: object[];
	@Input() usersData: Array<object>;
	@Input() fetchedPincodeData: Array<object>;
	@Input() cartData: Array<object>;
	@Input() cartAllData: Array<object>;
	@Input() cartDataGet: Array<object>;
	@Input() fetchAddress: Array<object>;
	@Input() resPincode: Array<object>;
	@Input() cartTotals: object;
	@Output() fetchUserPincode: EventEmitter<string> = new EventEmitter<string>();
	@Output() addNewAddressData: EventEmitter<object> = new EventEmitter<
		object
	>();
	@Output() getCheckoutPaymentLists: EventEmitter<object>;
	@Input() device: string;
	private destory$: Subject<boolean>;
	selectedItem = "";
	isOptional = false;
	selectedIndex = 0;
	continueAfterAddress = 0;
	imgCdnUrl: string;
	//checkOutAddForm: FormGroup;
	cardExpireYears: Array<Object>;
	cardType: string;
	addressTab = "";
	notCodMesg: string;
	codStatusFlag: boolean;
	cardCategory: string;
	currentStep: number;
	userEmail: string;
	userPassword: string;
	selectedAsGuestOrUser: string;
	address: object;
	paymentMethodList: object[];
	cardDetail: object;
	cardDetailsApi: object;
	paymentMethod: string;
	payGatewayValue: string;
	queryParmsForDiscount: object;
	selectedAddress: object;
	pincodeVal = 6;
	orders: object;
	selectedPincodeRes = {};
	httpOptions: object;
	user = {};
	cart_Prepaid: object;
	cart_COD: object;
	codAvailableForPin: boolean;
	prepaidAvailableForPin: boolean;
	user_maxFilledState: number;
	currentState: number;
	showDiv = false;
	token = localStorage.getItem("do_token");
	httpOptionsData = {};
	stateStep1 = 1;
	stateStep2 = 2;
	stateStep3 = 3;
	stateStep4 = 4;
	step3IsDisabled: boolean;
	gaAddProducts: object;

	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		public logService: LogsService,
		public authService: AuthService,
		private loaderService: LoaderService
	) {
		this.orders = {
			shippingAddress: Object,
		};

		this.device = "";
		this.httpOptionsData = {};
		this.user_maxFilledState = 1;
		this.currentState = 1;
		this.destory$ = new Subject();
		this.fetchAddress = [];
		this.codStatusFlag = false;
		this.cardExpireYears = [];
		this.cardType = "";
		this.notCodMesg = "";
		this.cardCategory = "";
		this.paymentMethod = "netBankings";
		this.payGatewayValue = "HDFB";
		this.selectedAddress = {};
		this.CheckoutState = [];
		this.userEmail = "";
		this.userPassword = "";
		this.usersData = [];
		this.currentStep = this.usersData["email"] !== "" ? 1 : 0;
		this.resPincode = [];
		this.queryParmsForDiscount = {};
		this.fetchedPincodeData = [];
		this.httpOptions = {};
		this.cartData = [];
		this.cartAllData = [];
		this.cartDataGet = [];
		this.paymentMethodListData = [];
		this.paymentMethodList = [];
		this.cartTotals = {};
		this.imgCdnUrl = environment.paths.imagesRootUrl;
		this.step3IsDisabled = true;
		this.gaAddProducts = {
			id: "",
			name: "",
			category: "",
			brand: "",
			variant: "",
			price: "",
			coupon: "",
			position: 0,
		};
		this.selectedAsGuestOrUser =
			this.usersData["email"] !== "" ? "user" : "guest";
		this.address = {
			name: "",
			pincode: "",
			mobile: "",
			street: "",
			city: "",
			state: "",
			country: "India",
		};
		this.cardDetail = {
			cardName: "",
			cardExpMonth: "",
			cardExpYear: "",
			cardCVV: "",
			cardNumber: "",
		};
		this.cardDetailsApi = {};
		this.cart_Prepaid = {};
		this.cart_COD = {};
		this.codAvailableForPin = false;
		this.prepaidAvailableForPin = false;

		this.getCheckoutPaymentLists = new EventEmitter<object>();
	}

	ngOnInit() {
		ga("ec:setAction", "checkout");
		this.httpOptionsData = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				"x-device-type": this.device,
				"x-web-version": "2",
				currency: "INR",
				"Cache-Control": "no-store, must-revalidate, no-cache, max-age=0",
				Vary: "*",
				Authorization: "Bearer " + this.token,
			}),
		};
		this.httpOptions = this.httpOptionsData;

		const isLoggedIn = this.authService.isAuthenticated();
		if (isLoggedIn) {
			if (localStorage.getItem("stapeState")) {
				this.moveToNextStep(this.stateStep3);
			} else {
				this.moveToNextStep(this.stateStep2);
			}
		}
		const years = 50;
		this.cardExpireYears = this.getYears(years);
		/** this.checkForDefaultAddress(); */
	}

	ngOnChanges(changes: SimpleChanges) {
		this.showDiv = true;

		this.pincodeFetch();
		this.paymentList();

		if (
			changes["fetchAddress"] &&
			changes["fetchAddress"].currentValue !== undefined
		) {
			this.fetchAddress = changes["fetchAddress"].currentValue;
			if (this.address && this.address["pincode"] !== "") {
				this.user = this.fetchAddress["newAddress"];
				this.selectedAddress = this.address;
				this.selectedAddress["index"] = this.user["address"][
					this.user["address"].length - 1
				]["index"];

				this.usersData["address"].push(this.selectedAddress);
			}
		}

		if (
			changes["cartAllData"] &&
			changes["cartAllData"].currentValue !== undefined
		) {
			const paymentListRequestPayload = {
				cartId: localStorage.getItem("currentCartId"),
			};
			this.getCheckoutPaymentLists.emit(paymentListRequestPayload);
		}

		if (
			changes["usersData"] &&
			changes["usersData"].currentValue !== undefined
		) {
			this.usersData = changes["usersData"].currentValue;

			if (this.usersData["address"].length <= 0) {
				localStorage.removeItem("selectedAddress");
			}

			const addressDatas = localStorage.getItem("selectedAddress");
			if (addressDatas !== null) {
				this.selectedAddress = JSON.parse(addressDatas);
			} else {
				// if not found set the first address as default
				this.selectedAddress = this.address;
			}
			this.checkForDefaultAddress();
		}
	}

	/*
		Address Form Function
	*/

	getPinCode(val: string) {
		if (val.length === this.pincodeVal) {
			this.fetchUserPincode.emit(val);
		}
	}
	listClick(event: string, newValue: string) {
		this.selectedItem = newValue; // don't forget to update the model here
		// ... do other stuff here ...
	}
	scrolltop() {
		const setTime = 10;
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, setTime);
	}

	changeExistingAddress(useAddress: object, index: number) {
		// tslint:disable-next-line:no-duplicate-string
		ga("send", "event", "Address Page Events", "Clicked Continue", "");
		this.selectedAddress = useAddress;
		localStorage.setItem(
			"selectedAddress",
			JSON.stringify(this.selectedAddress)
		);
		this.getPinCode(this.selectedAddress["pincode"]);
		this.step3IsDisabled = false;
		this.scrolltop();
	}
	saveContinue() {
		ga("send", "event", "Address Page Events", "Clicked Continue", "");
	}
	setPaymentMethod(option: object) {
		this.payGatewayValue = "";
		this.paymentMethod = option["identifier"];
		ga("ec:setAction", this.paymentMethod);
		ga(
			"send",
			"event",
			"Select Payment Method Events",
			"Clicked Review Continue",
			""
		);

		if (option && option["banks"] && option["banks"].length > 0) {
			for (let b = 0; b < option["banks"].length; b++) {
				if (option["banks"][b].selected === true)
					this.payGatewayValue = option["banks"][b]["code"];
			}
		}
		if (option && option["wallets"] && option["wallets"].length > 0) {
			for (let b = 0; b < option["wallets"].length; b++) {
				if (option["wallets"][b].selected === true)
					this.payGatewayValue = option["wallets"][b]["code"];
			}
		}
		if (option["identifier"] === "cod") this.codStatusFlag = option["status"];
	}
	setPaymentMethodCode(code: string) {
		if (code !== "") this.payGatewayValue = code;
	}

	// tslint:disable-next-line: cognitive-complexity tslint:disable-next-line: no-big-function
	makeOrders() {
		localStorage.setItem("stapeState", "3");
		const createOrder = "orders/:id";
		const paytmPayment = "pay/:orderId";
		const amazonpayPayment = "amazonpay/:orderId";
		const paytmUrl = environment["paymentMethodUrl"]["paytmUrl"];
		const cartId = this.cartData["data"]["_id"];
		ga(
			"send",
			"event",
			"Select Payment Method Events",
			this.orders["paymentMethod"],
			""
		);
		this.loaderService.show();
		this.http
			.put(environment.api.baseUrl + `/cart/${cartId}/underProcessing`, {})
			.toPromise()
			// tslint:disable-next-line: no-big-function
			.then((cart: object) => {
				this.orders["shippingAddress"] = this.selectedAddress;
				this.orders["paymentMethod"] = this.paymentMethod;
				this.orders["orderSource"] = this.device;
				this.orders["temporary"] = {};
				this.orders["status"] = "paymentPending";
				this.orders["leadId"] = "";
				this.orders["pgMethod"] = this.paymentMethod;
				this.orders["pgType"] = "";
				this.orders["cardType"] = "";
				if (
					this.queryParmsForDiscount &&
					this.queryParmsForDiscount["pgMethod"]
				) {
					this.orders["pgMethod"] =
						this.queryParmsForDiscount["pgMethod"] || "";
					this.orders["pgType"] = this.queryParmsForDiscount["pgType"] || "";
					this.orders["cardType"] =
						this.queryParmsForDiscount["cardType"] || "";
				}
				this.orders["temporary"].giftWrappingCharges = 0;
				this.http
					.post(
						environment.api.baseUrl + "/" + createOrder.replace(":id", cartId),
						this.orders,
						this.httpOptions
					)
					.toPromise()
					.then((orderData: object) => {
						this.loaderService.hide();
						const order = orderData["data"];

						if (this.paymentMethod === "amazonpay") {
							this.http
								.post(
									environment.api.baseUrl +
										"/" +
										amazonpayPayment.replace(":orderId", order["_id"]),
									{
										CUST_ID: order["user"]["_id"],
										TXN_AMOUNT: order["totals"]["grandTotal"].toString(),
										MOBILE_NO: order["shippingAddress"]["mobile"],
										EMAIL: order["user"]["email"],
										CALLBACK_URL: environment.api.responseUrl,
									},
									this.httpOptions
								)
								.toPromise()
								.then((amazonpayObjData: object) => {
									const amazonpayObj = amazonpayObjData["data"];
									window.location.href = "https://" + amazonpayObj;
								});
						}
						if (this.paymentMethod === "paytm") {
							this.http
								.post(
									environment.api.baseUrl +
										"/" +
										paytmPayment.replace(":orderId", order["_id"]),
									{
										CUST_ID: order["user"]["_id"],
										TXN_AMOUNT: order["totals"]["grandTotal"].toString(),
										MOBILE_NO: order["shippingAddress"]["mobile"],
										EMAIL: order["user"]["email"],
										CALLBACK_URL: environment.api.responseUrl,
									},
									this.httpOptions
								)
								.toPromise()
								.then((paytmObjData: object) => {
									const paytmObj = paytmObjData["data"];
									const mapForm = document.createElement("form");
									mapForm.method = "POST";
									mapForm.action = paytmUrl;
									Object.keys(paytmObj).forEach(key => {
										const mapInput = document.createElement("input");
										mapInput.type = "hidden";
										mapInput.setAttribute("value", paytmObj[key]);
										mapInput.name = key;
										mapForm.appendChild(mapInput);
									});
									document.body.appendChild(mapForm);
									mapForm.submit();
								});
						}
						if (this.paymentMethod === "cod") {
							const codPayment = "codPay/:orderId";
							this.http
								.post(
									environment.api.baseUrl +
										"/" +
										codPayment.replace(":orderId", order["_id"]),
									{},
									this.httpOptions
								)
								.toPromise()
								.then((checkSumHashData: object) => {
									const checkSumHash = checkSumHashData["data"];
									const orderObject = {
										_id: order["_id"],
										paymentMethod: order["paymentMethod"],
										checkSum: checkSumHash,
									};
									const codForm = document.createElement("form");
									codForm.method = "POST";
									codForm.action = environment.api.responseUrl;
									Object.keys(orderObject).forEach(key => {
										const codInput = document.createElement("input");
										codInput.type = "hidden";
										codInput.setAttribute("value", orderObject[key]);
										codInput.name = key;
										codForm.appendChild(codInput);
									});
									document.body.appendChild(codForm);
									codForm.submit();
								});
						}
						if (this.paymentMethod === "mobikwik") {
							const mobikwikPayment = "mobikwik/:orderId";
							const fixedGrandTotal = 2;
							this.http
								.post(
									environment.api.baseUrl +
										"/" +
										mobikwikPayment.replace(":orderId", order["_id"]),
									{
										cell: order["shippingAddress"]["mobile"],
										email: order["user"]["email"],
										amount: order["totals"]["grandTotal"]
											.toFixed(fixedGrandTotal)
											.toString(),
										redirecturl: environment.api.responseUrl,
									},
									this.httpOptions
								)
								.toPromise()
								.then(
									mobikwikObjData => {
										const mobikwikObj = mobikwikObjData["data"];
										const mapForm = document.createElement("form");
										mapForm.method = "POST";
										mapForm.action =
											environment["paymentMethodUrl"]["mobikwikUrl"];
										Object.keys(mobikwikObj).forEach(key => {
											const mapInput = document.createElement("input");
											mapInput.type = "hidden";
											mapInput.setAttribute("value", mobikwikObj[key]);
											mapInput.name = key;
											mapForm.appendChild(mapInput);
										});
										document.body.appendChild(mapForm);
										mapForm.submit();
									},
									error => {
										this.loaderService.hide();
										this.logService.debugLog(
											"error",
											"checkout error in" +
												this.paymentMethod +
												" payment during checkout."
										);
									}
								);
						} else if (
							this.paymentMethod === "netBankings" ||
							this.paymentMethod === "wallets" ||
							this.paymentMethod === "cards" ||
							this.paymentMethod === "credit-card" ||
							this.paymentMethod === "wallet" ||
							this.paymentMethod === "upi" ||
							this.paymentMethod === "googlepay"
						) {
							const fixedGrandTotals = 2;
							const formData = {
								amount: order["totals"]["grandTotal"]
									.toFixed(fixedGrandTotals)
									.toString(),
								productinfo: order["subOrders"][0].products.name,
								firstname: order["shippingAddress"]["name"],
								email: order["user"]["email"],
								phone: order["shippingAddress"]["mobile"],
								surl: environment.api.responseUrl,
								furl: environment.api.responseUrl,
								curl: environment.api.responseUrl,
							};
							if (this.paymentMethod === "netBankings") {
								formData["Pg"] = "NB";
								formData["bankcode"] = this.payGatewayValue;
								this.payViaPayU(formData, order);
							}
							if (this.paymentMethod === "wallets") {
								formData["Pg"] = "cash";
								formData["bankcode"] = this.payGatewayValue;
								this.payViaPayU(formData, order);
							} else if (this.paymentMethod === "wallet") {
								formData["Pg"] = "CASH";
								formData["bankcode"] = "phonepe";
								this.payViaPayU(formData, order);
							} else if (this.paymentMethod === "upi") {
								formData["Pg"] = "upi";
								formData["bankcode"] = "";
								this.payViaPayU(formData, order);
							} else if (this.paymentMethod === "googlepay") {
								formData["Pg"] = "UPI";
								formData["bankcode"] = "TEZ";
								this.payViaPayU(formData, order);
							} else if (this.paymentMethod === "credit-card") {
								formData["Pg"] = "CC";
								formData["bankcode"] = this.payGatewayValue;
								this.payViaPayU(formData, order);
							} else if (this.paymentMethod === "cards") {
								const cardForm = this.cardDetail;
								formData["Pg"] =
									this.cardDetailsApi["cardCategory"] === "UNKOWN"
										? "CC"
										: this.cardDetailsApi["cardCategory"];
								formData["bankcode"] = this.cardDetailsApi["cardType"];
								formData["ccnum"] = cardForm["cardNumber"].split("-").join("");
								formData["ccname"] = cardForm["cardName"];
								formData["ccexpmon"] = cardForm["cardExpMonth"];
								formData["ccexpyr"] = cardForm["cardExpYear"];
								formData["ccvv"] = cardForm["cardCVV"];
								this.payViaPayU(formData, order);
							}
						}
					});
			});
	}

	payViaPayU(formData: object, order: object) {
		const payuPayment = "payu/:orderId";
		const payuUrl = environment["paymentMethodUrl"]["payuUrl"];
		this.http
			.post(
				environment.api.baseUrl +
					"/" +
					payuPayment.replace(":orderId", order["_id"]),
				formData,
				this.httpOptions
			)
			.toPromise()
			.then((payuObjectData: object) => {
				const payuObject = payuObjectData["data"];
				const payu = {
					key: payuObject.Key,
					txnid: payuObject.Txnid,
					productinfo: payuObject.productinfo,
					amount: payuObject.amount,
					firstname: payuObject.firstname,
					email: payuObject.email,
					Pg: payuObject.Pg,
					bankcode: payuObject.bankcode,
					phone: payuObject.phone,
					surl: payuObject.surl,
					furl: payuObject.furl,
					curl: payuObject.curl,
					hash: payuObject.hash,
				};
				if (
					(payuObject.Pg === "CC" || payuObject.Pg === "DC") &&
					payuObject.ccnum &&
					payuObject.ccname &&
					payuObject.ccexpmon &&
					payuObject.ccexpyr &&
					payuObject.ccvv
				) {
					payu["ccnum"] = payuObject.ccnum.replace("-", "");
					payu["ccname"] = payuObject.ccname;
					payu["ccexpmon"] = payuObject.ccexpmon;
					payu["ccexpyr"] = payuObject.ccexpyr;
					payu["ccvv"] = payuObject.ccvv;
				}
				const payuForm = document.createElement("form");
				payuForm.method = "POST";
				payuForm.action = payuUrl;
				Object.keys(payu).forEach(key => {
					if (payu[key] !== "") {
						const payuInput = document.createElement("input");
						payuInput.type = "hidden";
						payuInput.setAttribute("value", payu[key]);
						payuInput.name = key;
						payuForm.appendChild(payuInput);
					}
				});
				document.body.appendChild(payuForm);
				payuForm.submit();
			});
	}

	checkForCardNumberError(cardDetail: string) {
		//cardDetail.cardNumber = $filter('cardNumber')(cardDetail.cardNumber)
		const getCardDetails = "getCardDetails/:cardId";
		// environment.api.baseUrl
		this.http
			.get(
				"https://www.dailyobjects.com/api" +
					"/" +
					getCardDetails.replace(":cardId", cardDetail),
				this.httpOptions
			)
			.toPromise()
			.then(
				(cardDetailsData: object) => {
					const cardDetails = cardDetailsData["data"];
					this.cardDetailsApi = cardDetails;
					this.cardType = cardDetails["cardType"];
					this.cardCategory = cardDetails["cardCategory"];
					// const this.isCardValid = cardDetails["cardDigitValid"]
					switch (this.cardType) {
						case "MAST":
							this.cardType = "master";
							break;

						case "VISA":
							this.cardType = "visa";
							break;

						case "RUPAY":
							this.cardType = "rupay";
							break;

						case "MAES":
							this.cardType = "maestro";
							break;

						case "DINR":
							this.cardType = "diner";
							break;

						case "AMEX":
							this.cardType = "amex";
							break;

						default:
							this.cardType = "";
							break;
					}
				},
				error => {
					this.logService.debugLog("error", "card data not found.");
				}
			);
	}

	checkForDefaultAddress() {
		if (this.usersData && this.usersData["address"]) {
			const currentAddress = [];
			for (let j = 0; j < this.usersData["address"].length; j++) {
				const addrr = this.usersData["address"][j];
				if (addrr.pincode !== "" && addrr.mobile !== "") {
					currentAddress.push(this.usersData["address"][j]);
				}
			}
			this.usersData["address"] = currentAddress;

			for (let i = 0; i < this.usersData["address"].length; i++) {
				const addr = this.usersData["address"][i];
				if (addr["default"] && addr["pincode"] !== "") {
					const addressData = localStorage.getItem("selectedAddress");
					if (addressData !== null) {
						this.selectedAddress = JSON.parse(addressData);
					} else {
						this.selectedAddress = addr;
					}
					this.getPinCode(this.selectedAddress["pincode"]);
					return;
				}
			}
			// if not found set the first address as default
			const addressDatas = localStorage.getItem("selectedAddress");
			if (addressDatas !== null) {
				this.selectedAddress = JSON.parse(addressDatas);
			} else {
				// if not found set the first address as default
				this.selectedAddress = this.usersData["address"][0];
				if (this.selectedAddress["pincode"] !== "") {
					this.getPinCode(this.selectedAddress["pincode"]);
				}
			}
			//this.selectedAddress = this.usersData["address"][0];
			//this.getPinCode(this.selectedAddress["pincode"])'
		}
	}

	setCardDetails() {}

	getPrice(price: number) {
		if (price > 0) return "₹" + price;
		else return "₹0";
	}
	addNewAddress() {
		this.addNewAddressData.emit(this.address);
		localStorage.setItem("selectedAddress", JSON.stringify(this.address));
		this.step3IsDisabled = false;
		ga("send", "event", "Address Page Events", "Clicked Save and Continue", "");
	}

	getYears(num_years: number) {
		const curr_year = new Date().getFullYear();
		const years = [];
		for (let i = 0; i <= num_years; i++) {
			years.push(curr_year + i);
		}
		return years;
	}
	initCheckoutCart() {
		if (
			this.cartData &&
			this.cartData["data"] &&
			this.cartData["data"]["totals"] &&
			this.cartData["data"]["totals"]["grandTotal"]
		) {
			const cartD = {};
			cartD["totals"] = JSON.parse(
				JSON.stringify(this.cartData["data"]["totals"])
			);
			cartD["coupon"] = JSON.parse(
				JSON.stringify(this.cartData["data"]["coupon"])
			);
			const getPrepaidDiscount = "prepaidDiscount";
			const getCodCharge = "codCharge";
			this.http
				.post(
					environment.api.baseUrl + "/" + getPrepaidDiscount,
					cartD,
					this.httpOptions
				)
				.toPromise()
				.then((prepaidResponse: object) => {
					const results = prepaidResponse["data"];
					this.cart_Prepaid = {};
					this.cart_Prepaid["totals"] = results["totals"];
					this.cart_Prepaid["totals"]["netPayable"] = this.cart_Prepaid[
						"totals"
					]["grandTotal"];
					this.cart_Prepaid["totals"]["grandTotal"] +=
						this.cart_Prepaid["totals"]["prepaidDiscount"] || 0;
					this.cart_Prepaid = this.convertTotals(this.cart_Prepaid);
				});

			this.http
				.post(
					environment.api.baseUrl + "/" + getCodCharge,
					cartD,
					this.httpOptions
				)
				.toPromise()
				.then((codResponse: object) => {
					const results = codResponse["data"];
					this.cart_COD = {};
					this.cart_COD["totals"] = results.totals;
					this.cart_COD = this.convertTotals(this.cart_COD);
				});

			this.scrolltop();
		}
	}
	convertToFixed(value: number) {
		const num = 2;
		return parseFloat(Number(value).toFixed(num));
	}
	convertTotals(obj: object) {
		for (const key in obj["totals"]) {
			if (key !== "cartItemsCount") {
				obj["totals"][key] = this.convertToFixed(obj["totals"][key]);
			}
		}
		return obj;
	}
	defaultOpen() {}
	pincodeFetch() {
		if (
			this.resPincode &&
			this.resPincode["response"] &&
			this.resPincode["response"]["checkoutPincodeData"]
		) {
			this.selectedPincodeRes = this.resPincode["response"][
				"checkoutPincodeData"
			];
			if (
				this.selectedPincodeRes &&
				this.selectedPincodeRes["city"] &&
				this.selectedPincodeRes["state"]
			) {
				this.address["city"] = this.selectedPincodeRes["city"];
				this.address["state"] = this.selectedPincodeRes["state"];
				if (
					this.selectedPincodeRes["prepaidStatus"] === true &&
					this.selectedPincodeRes["codStatus"] === true
				) {
					this.codAvailableForPin = true;
					localStorage.setItem("codAvailableForPin", "true");
					this.prepaidAvailableForPin = true;
					// tslint:disable-next-line:no-duplicate-string
					this.notCodMesg =
						// tslint:disable-next-line:no-duplicate-string
						"This pincode not eligible for COD, Please choose another payment method.";
				} else if (this.selectedPincodeRes["prepaidStatus"] === true) {
					this.prepaidAvailableForPin = true;
					this.codAvailableForPin = false;
					localStorage.setItem("codAvailableForPin", "false");

					this.notCodMesg =
						"This pincode not eligible for Prepaid Order, Please choose another payment method.";
				} else if (this.selectedPincodeRes["codStatus"] === true) {
					this.codAvailableForPin = true;
					localStorage.setItem("codAvailableForPin", "true");

					this.notCodMesg =
						"This pincode not eligible for COD, Please choose another payment method.";
				} else {
					this.codAvailableForPin = false;
					this.prepaidAvailableForPin = false;
					localStorage.setItem("codAvailableForPin", "false");
					this.notCodMesg =
						"This pincode not eligible for Your Order, Please choose another payment method.";
				}
			}
		}
	}
	paymentList() {
		if (
			this.paymentMethodListData &&
			this.paymentMethodListData["response"] &&
			this.paymentMethodListData["response"]["data"]
		) {
			this.paymentMethodList = this.paymentMethodListData["response"]["data"];
		}
	}

	moveToNextStep(index: number): void {
		this.selectedIndex = index;
		this.user_maxFilledState = index;
		if (index === 0) return; // First step is not selected anymore -ok
		this.selectedIndex = index;
	}
	setCurrentState(state: number) {
		if (state === this.stateStep4) {
			console.log("state iss4", state);
		} else if (this.user_maxFilledState >= state) {
			this.selectedIndex = state;
		}
	}
	setCurrentStateDesktop(state: number) {
		if (state === this.stateStep4) {
			console.log("state is4", state);
		} else if (this.user_maxFilledState >= state) {
			this.selectedIndex = state;
		}
		if (state === this.stateStep2) {
			this.step3IsDisabled = true;
		}
	}
	// gaSetAction() {
	// 	let gaAddObject = {};
	// 	this.gaAddProducts = {
	// 		id: this.productDetail["sku"],
	// 		name: this.productDetail["name"],
	// 		category:
	// 			this.productDetail["categories"][0]["slug"] +
	// 			"/" +
	// 			this.productDetail["brand"]["slug"] +
	// 			"/" +
	// 			this.productDetail["model"]["slug"],
	// 		price: this.productDetail["sellingPrice"],
	// 		coupon: this.productDetail["offer"]["text"],
	// 		position: 0,
	// 	};
	// 	gaAddObject = this.gaAddProducts;
	// 	console.log("this.gaAddProducts", this.gaAddProducts);
	// 	return gaAddObject;
	// }
	ngOnDestroy(): void {
		localStorage.removeItem("codAvailableForPin");
		this.destory$.unsubscribe();
	}
	codAvailableForPinCode() {
		if (localStorage.getItem("codAvailableForPin") === "true") return true;
		else return false;
	}
}
