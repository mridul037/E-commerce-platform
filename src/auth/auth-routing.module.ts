import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { RestrictAccessPostLoginGuard } from "../shared/guards/restrict-access-post-login.guard";

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "login",
	},
	{
		path: "login",
		component: LoginComponent,
		canActivate: [RestrictAccessPostLoginGuard],
	},
	{
		path: "register",
		component: RegisterComponent,
		canActivate: [RestrictAccessPostLoginGuard],
	},
	{
		path: "forgot-password/:token",
		component: ForgotPasswordComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
