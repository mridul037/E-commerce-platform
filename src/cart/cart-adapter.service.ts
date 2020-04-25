import { Injectable } from "@angular/core";
@Injectable()
export class CartAdapter {
	/**
	 * Get Cart response
	 *
	 * @param cart - actual Cart response
	 */
	static cartAdapter(cart: Object): Object {
		const data = cart;
		return {
			cartData: data,
		};
	}
	/**
	 * Get Mobile accessory response
	 *
	 * @param cartAccessory - actual Cart Accessory response
	 */
	static cartAccessoryAdapter(cartAccessory: Object): Object {
		const data = cartAccessory["data"];
		return {
			cartAccessoryData: data,
		};
	}

	/**
	 * Get Cart Product list response
	 *
	 * @param cartProductList - actual Cart Product List response
	 */
	static cartProductsListAdapter(cartProductsList: Object): Object {
		const data = cartProductsList["data"];
		return {
			cartProductsListData: data,
		};
	}

	constructor() {}
}
