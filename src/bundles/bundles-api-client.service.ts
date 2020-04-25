import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
	Adapter,
	DefaultHeaders,
	GET,
	HttpService,
	Query,
} from "../shared/asyncServices/http";
import { BrandAdapter } from "./bundles.adapter";

@Injectable()
@DefaultHeaders({
	Accept: "application/json",
	"Content-Type": "application/json",
})
export class BundlesApiClientService extends HttpService {
	@GET("/v2/genericPage")
	@Adapter(BrandAdapter.IntermediateDataAdapter)
	public getIntermediateData(@Query queryParams: object): Observable<never> {
		return of();
	}
}
