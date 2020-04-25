import { Injectable } from "@angular/core";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../core/auth.service";

@Injectable()
export class RestrictAccessPostLoginGuard implements CanActivate {
	constructor(public auth: AuthService, public router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this.auth.isAuthenticated()) {
			this.router.navigate([""]);
		}
		return true;
	}
}
