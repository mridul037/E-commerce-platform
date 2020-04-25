import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../core/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(public auth: AuthService, public router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this.auth.isAuthenticated()) {
			return true;
		}
		// not logged in so redirect to login page with the return url
		this.router.navigate(["/auth/login"], {
			queryParams: {
				r: state.url
					.split("/")
					.filter(x => x)
					.join("/"),
			},
		});
		return false;
	}
}
