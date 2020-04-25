import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
	Adapter,
	DefaultHeaders,
	GET,
	Query,
	HttpService,
	Headers,
	Path,
	Body,
	POST,
} from "../shared/asyncServices/http";
import { CartAdapter } from "./cart-adapter.service";

@Injectable()
// @DefaultHeaders({
// 	Accept: "application/json",
// 	"Content-Type": "application/json",
// })
export class CartApiClientService extends HttpService {
	/**
	 * Get Checkout Country
	 */
	// @Headers({
	// 	"x-device-type": "website",
	// 	session_id: "57789259-3ec7-44ba-85bf-b6f0bddb7a53",
	// 	currency: "INR",
	// 	Authorization:
	// 		//"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTI4OTUyNDIsImlhdCI6MTU1MDMwMzI0Miwic3ViIjoiNWJhMGZjYjIwM2I4YjE3OTIyZTZiNTFhIn0.2j5JPHN3xGFGwroO3qXGZOjIBnSX4CKFdcUwh61d6oY"
	// 		//"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTI0MTAwNDIsImlhdCI6MTU0OTgxODA0Miwic3ViIjoiNWJiYzUzNTUwMTczNTQ5YTM4ZjhlZTkzIn0.Rk1ewfVT1JCwMnG9OY8fqHrxFSDMPNexi3QOGuJdDsI",
	// 		"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTQwMzc5NTgsImlhdCI6MTU1MTQ0NTk1OCwic3ViIjoiNWJhMGZjYjIwM2I4YjE3OTIyZTZiNTFhIn0.k6nRRTUlYGtixiGjwbfBFsWySmkZ-0uwVImEhfBBpwI",
	// })
	@POST("/cart")
	@Adapter(CartAdapter.cartAdapter)
	public getCartData(@Body reqPayload: object): Observable<never> {
		return of();
	}
	@GET("/cart/5c63c72113cbfe6e0638a964/accessories")
	@Adapter(CartAdapter.cartAccessoryAdapter)
	public getCartAccessories(): Observable<never> {
		return of();
	}

	/**
	 * Get Product List for the pdp page
	 */
	@GET("/products")
	@Adapter(CartAdapter.cartProductsListAdapter)
	public getCartListProducts(@Query data: object): Observable<never> {
		return of();
	}
}
