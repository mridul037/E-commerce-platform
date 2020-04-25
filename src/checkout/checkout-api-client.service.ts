import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
	Adapter,
	DefaultHeaders,
	GET,
	POST,
	Query,
	HttpService,
	Headers,
	Path,
	Body,
} from "../shared/asyncServices/http";
import { CheckoutAdapter } from "./checkout-adapter.service";

@Injectable()
@DefaultHeaders({
	Accept: "application/json",
	"Content-Type": "application/json",
})
export class CheckoutApiClientService extends HttpService {
	/**
	 * Get Checkout Country
	 */

	@GET("/countries")
	@Adapter(CheckoutAdapter.checkoutCountryAdapter)
	public getCheckoutCountry(@Query reqPayload: object): Observable<never> {
		return of();
	}
	@GET("/states")
	@Adapter(CheckoutAdapter.checkoutStateAdapter)
	public getCountryState(@Query reqPayload: object): Observable<never> {
		return of();
	}
	@GET("/pincode/{reqPayload}")
	@Adapter(CheckoutAdapter.checkoutPincodeAdapter)
	public getCheckoutPincode(
		@Path("reqPayload") reqPayload: string
	): Observable<never> {
		return of();
	}
	@POST("/users/address")
	@Adapter(CheckoutAdapter.checkoutNewAddressAdapter)
	public addCheckoutNewAddress(@Body reqPayload: object): Observable<never> {
		return of();
	}
	@GET("/payment/lists/v2/{cartId}")
	@Adapter(CheckoutAdapter.checkoutPaymentListAdapter)
	public checkoutPaymentLists(
		@Path("cartId") cartId: string
	): Observable<never> {
		return of();
	}
}
