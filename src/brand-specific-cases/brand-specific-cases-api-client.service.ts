import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
	Adapter,
	DefaultHeaders,
	GET,
	HttpService,
	Query,
} from "../shared/asyncServices/http";

@Injectable()
@DefaultHeaders({
	Accept: "application/json",
	"Content-Type": "application/json",
})
export class BrandSpecificCasesApiClientService extends HttpService {
	@GET("/categories?fields=brands")
	public getBrandSpecificCases(@Query queryParams: object): Observable<never> {
		return of();
	}
	@GET("/listing-details")
	public getListingContent(@Query query: object): Observable<never> {
		return of();
	}
}
