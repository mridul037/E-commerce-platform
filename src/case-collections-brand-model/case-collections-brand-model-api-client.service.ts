import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
	Adapter,
	DefaultHeaders,
	GET,
	HttpService,
	Query,
} from "../shared/asyncServices/http";
import { CaseCollectionsAdapter } from "./case-collection-brand-model.adapter";

@Injectable()
@DefaultHeaders({
	Accept: "application/json",
	"Content-Type": "application/json",
})
export class CaseCollectionApiClientService extends HttpService {
	@GET("/v2/genericPage")
	@Adapter(CaseCollectionsAdapter.IntermediateDataAdapter)
	public getIntermediateData(@Query queryParams: object): Observable<never> {
		return of();
	}
}
