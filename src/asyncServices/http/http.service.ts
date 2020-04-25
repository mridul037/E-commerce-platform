import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { AppSandbox } from "../../../app.sandbox";
import { GlobalVars } from "../../../global.vars";
import { HttpResponseHandlerService } from "./http-response-handler.service";
import { HttpAdapter } from "./http.adapter";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

/**
 * Supported @Produces media types
 */
export enum MediaType {
	JSON,
	FORM_DATA,
}

@Injectable({
	providedIn: "root",
})
export class HttpService {
	constructor(
		protected http: HttpClient,
		protected responseHandler: HttpResponseHandlerService,
		protected appSandbox: AppSandbox,
		@Inject(PLATFORM_ID) private platformId: string
	) {}

	protected getBaseUrl(): string {
		return environment.api.baseUrl;
	}

	protected getDefaultHeaders(): Object {
		return {};
	}

	/**
	 * Request Interceptor
	 *
	 * @method requestInterceptor
	 * @param {Request} req - request object
	 */
	protected requestInterceptor(req: HttpRequest<any>): HttpRequest<any> {
		if (isPlatformBrowser(this.platformId)) {
			const token = localStorage.getItem(GlobalVars.storageKeys.DO_TOKEN);

			if (token !== null) {
				req = req.clone({
					headers: req.headers.set("Authorization", `Bearer ${token}`),
				});
			}

			const sessionId = localStorage.getItem(GlobalVars.storageKeys.SESSION_ID);

			if (sessionId !== null) {
				req = req.clone({
					headers: req.headers.set("session_id", sessionId),
				});
			}
		}

		if (isPlatformServer(this.platformId)) {
			req = req.clone({
				headers: req.headers.set("session_id", "1"),
			});
		}

		req = req.clone({
			headers: req.headers.set(
				"x-device-type",
				this.appSandbox.getDeviceType()
			),
		});

		req = req.clone({
			headers: req.headers.set("x-web-version", "2"),
		});

		return req;
	}

	/**
	 * Response Interceptor
	 *
	 * @method responseInterceptor
	 * @param {Response} observableRes - response object
	 * @returns {Response} res - transformed response object
	 */
	protected responseInterceptor(
		observableRes: Observable<HttpResponse<object>>,
		adapterFn?: Function
	): Observable<HttpResponse<object>> {
		return observableRes.pipe(
			map((res: HttpResponse<object>) => {
				return HttpAdapter.baseAdapter(
					res,
					adapterFn,
					this.appSandbox.getDeviceType()
				);
			}),
			catchError((err, source: Observable<HttpRequest<string>>) => {
				return this.responseHandler.onCatch(err, source);
			})
		);
	}
}
