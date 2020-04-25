import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthApiClientService } from "./auth-api-client.service";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthSandbox } from "./auth.sandbox";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./store/auth.effects";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

@NgModule({
	declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		EffectsModule.forFeature([AuthEffects]),
	],
	providers: [AuthSandbox, AuthApiClientService],
})
export class AuthModule {}
