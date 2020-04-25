import { Injectable, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Device, DEVICE } from "@ngx-toolkit/device";
import { Sandbox } from "../shared/sandbox/base.sandbox";
import * as CheckoutActions from "../shared/store/actions/checkout.actions";
import * as store from "../shared/store/index";

@Injectable()
export class CheckoutSandbox extends Sandbox {
	checkoutState$ = this.appState$.select(store.getCountryState);
	checkoutPincode$ = this.appState$.select(store.getCheckoutPincode);
	checkoutAddress$ = this.appState$.select(store.addCheckoutNewAddress);
	checkoutAddressFailed$ = this.appState$.select(
		store.addCheckoutNewAddressFailed
	);
	checkoutCountry$ = this.appState$.select(store.getCheckoutCountry);
	checkoutPaymentListData$ = this.appState$.select(store.checkoutPaymentLists);
	cartTotals$ = this.appState$.select(store.getCartTotals);
	cartAllData$ = this.appState$.select(store.getCartId);
	currentUser$ = this.appState$.select(store.getCurrentUser);

	constructor(
		protected appState$: Store<store.AppState>,
		@Inject(DEVICE) private deviceDetector: Device
	) {
		super(appState$, deviceDetector);
	}

	public getCheckoutCountry(requestPayload: object): void {
		this.appState$.dispatch(
			new CheckoutActions.LoadCheckoutCountriesAction(requestPayload)
		);
	}
	public getCountryState(requestPayload: object): void {
		this.appState$.dispatch(
			new CheckoutActions.LoadCheckoutStatesAction(requestPayload)
		);
	}
	public getCheckoutPincode(requestPayload: string): void {
		this.appState$.dispatch(
			new CheckoutActions.LoadCheckoutPincodesAction(requestPayload)
		);
	}
	public addCheckoutNewAddress(requestPayload: object) {
		this.appState$.dispatch(
			new CheckoutActions.AddNewCheckoutAddressAction(requestPayload)
		);
	}
	public checkoutPaymentLists(requestPayload: object) {
		this.appState$.dispatch(
			new CheckoutActions.CheckoutPaymentListAction(requestPayload)
		);
	}
}
