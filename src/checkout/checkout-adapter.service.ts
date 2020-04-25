import { Injectable } from "@angular/core";
@Injectable()
export class CheckoutAdapter {
	/**
	 * Get contact us Options response
	 *
	 * @param checkoutCountry - actual Contact Us response
	 */
	static checkoutCountryAdapter(checkoutCountry: Object): Object {
		const data = checkoutCountry["data"];
		return {
			checkoutCountryData: data,
		};
	}
	static checkoutStateAdapter(checkoutState: Object): Object {
		const data = checkoutState["data"];
		return {
			checkoutStateData: data,
		};
	}
	static checkoutPincodeAdapter(checkoutPincode: Object): Object {
		const data = checkoutPincode["data"];
		return {
			checkoutPincodeData: data,
		};
	}
	static checkoutNewAddressAdapter(checkoutNewAddress: Object): Object {
		const data = checkoutNewAddress["data"];
		return {
			newAddress: data,
		};
	}
	static checkoutPaymentListAdapter(data: Object): Object {
		return data;
	}
	constructor() {}
}
