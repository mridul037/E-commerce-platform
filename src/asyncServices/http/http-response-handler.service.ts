import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError as observableThrowError } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class HttpResponseHandlerService {
	constructor(private router: Router) {}

	/**
	 * Global http error handler.
	 *
	 * @param error - error response
	 * @param source - error source
	 * @returns - {ErrorObservable} error observable
	 */
	public onCatch(
		response: HttpErrorResponse,
		source: Observable<HttpRequest<string>>
	): Observable<any> {
		switch (response.status) {
			case 400:
				this.handleBadRequest(response);
				break;

			case 401:
				this.handleUnauthorized(response);
				break;

			case 403:
				this.handleForbidden();
				break;

			case 404:
				this.handleNotFound(response);
				break;

			case 410:
				this.handleGone(response);
				break;

			case 500:
				this.handleServerError();
				break;

			default:
				break;
		}

		return observableThrowError(response);
	}

	/**
	 * Shows errors when server response status is 401
	 *
	 * @param error
	 */
	private handleBadRequest(responseBody: any): void {
		if (responseBody._body) {
			try {
			} catch (error) {}
		} else;
	}

	/**
	 * Shows errors when server response status is 401
	 *
	 * @param responseBody
	 */
	private handleUnauthorized(responseBody: any): void {
		// this.router.navigateByUrl("/404", { skipLocationChange: true });
	}

	/**
	 * Shows errors when server response status is 403
	 */
	private handleForbidden(): void {
		this.router.navigate(["/login"]);
	}

	/**
	 * Shows errors when server response status is 404
	 *
	 * @param responseBody
	 */
	private handleNotFound(responseBody: any): void {
		this.router.navigateByUrl("/404", { skipLocationChange: true });
	}

	/**
	 * Shows errors when server response status is 410
	 *
	 * @param responseBody
	 */
	private handleGone(responseBody: any): void {
		this.router.navigateByUrl("/404", { skipLocationChange: true });
	}

	/**
	 * Shows errors when server response status is 500
	 */
	private handleServerError(): void {}

	/**
	 * Parses server response
	 *
	 * @param response
	 */
	private handleErrorMessages(response: any): void {
		if (!response) return;
	}

	/**
	 * Returns relative url from the absolute path
	 *
	 * @param responseBody
	 * @returns {string}
	 */
	private getRelativeUrl(url: string): string {
		return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, "");
	}
}
