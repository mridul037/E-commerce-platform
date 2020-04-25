import { Injectable } from "@angular/core";
import {
	DefaultHeaders,
	HttpService,
	GET,
	POST,
	Body,
	Path,
} from "../shared/asyncServices/http";
import { Observable, of } from "rxjs";

@Injectable()
@DefaultHeaders({
	Accept: "application/json",
	"Content-Type": "application/json",
})
export class AuthApiClientService extends HttpService {
	@POST("/mobile/auth/sendOTP")
	public getOTP(@Body payload: object): Observable<never> {
		return of();
	}

	@POST("/mobile/auth/verifyOTP")
	public verifyOTP(@Body payload: object): Observable<never> {
		return of();
	}

	@POST("/mobile/auth/info")
	public register(@Body payload: object): Observable<never> {
		return of();
	}

	@POST("/mobile/auth/facebook")
	public facebookLogin(
		@Body facebookLogin: object | string
	): Observable<never> {
		return of();
	}

	@POST("/mobile/auth/google")
	public googleLogin(@Body googleLogin: object | string): Observable<never> {
		return of();
	}
	@POST("/users/forgotPassword/{token}")
	public forgetPassword(
		@Path("token") token: string,
		@Body payload: object
	): Observable<never> {
		return of();
	}
}
