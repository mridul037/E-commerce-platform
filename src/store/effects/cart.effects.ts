import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as CartActions from "../actions/cart.actions";
import { CartApiClientService } from "../../../cart/cart-api-client.service";

@Injectable()
export class CartEffects {
	constructor(
		private actions$: Actions,
		public cartApiClient: CartApiClientService
	) {}

	/**
	 * Cart Effect
	 */
	@Effect()
	loadCartData$: Observable<Action> = this.actions$.pipe(
		ofType(CartActions.CartTypes.LoadCartData),
		map((action: CartActions.LoadCartDataAction) => action.payload),
		switchMap(state => {
			return this.cartApiClient.getCartData(state).pipe(
				map(cartData => {
					return new CartActions.CartDataSuccessAction(cartData);
				}),
				catchError(error => of(new CartActions.CartDataFailAction()))
			);
		})
	);
	@Effect()
	loadCartAccessory$: Observable<Action> = this.actions$.pipe(
		ofType(CartActions.CartTypes.LoadCartAccessory),
		map((action: CartActions.LoadCartAccessoryAction) => action.payload),
		switchMap(state => {
			return this.cartApiClient.getCartAccessories().pipe(
				map(cartAccessory => {
					return new CartActions.CartAccessorySuccessAction(cartAccessory);
				}),
				catchError(error => of(new CartActions.CartAccessoryFailAction()))
			);
		})
	);

	@Effect()
	loadCartListProducts$: Observable<Action> = this.actions$.pipe(
		ofType(CartActions.CartTypes.LoadCartListProducts),
		map((action: CartActions.LoadCartListProductsAction) => action.payload),
		switchMap(state => {
			return this.cartApiClient.getCartListProducts(state).pipe(
				map(cartListProducts => {
					return new CartActions.CartListProductsSuccessAction(
						cartListProducts
					);
				}),
				catchError(error => of(new CartActions.CartListProductsFailAction()))
			);
		})
	);
}
