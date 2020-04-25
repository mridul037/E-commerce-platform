import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "../shared/shared.module";
import { CheckoutEffects } from "../shared/store/effects/checkout.effects";
import { CheckoutAdapter } from "./checkout-adapter.service";
import { CheckoutAddressComponent } from "./checkout-address/checkout-address.component";
import { CheckoutApiClientService } from "./checkout-api-client.service";
import { CheckoutContainerComponent } from "./checkout-container/checkout-container.component";
import { CheckoutRoutingModule } from "./checkout-routing.module";
import { CheckoutSandbox } from "./checkout.sandbox";

@NgModule({
	declarations: [CheckoutContainerComponent, CheckoutAddressComponent],
	imports: [
		CommonModule,
		CheckoutRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		EffectsModule,
		EffectsModule.forFeature([CheckoutEffects]),
	],
	providers: [CheckoutSandbox, CheckoutApiClientService, CheckoutAdapter],
})
export class CheckoutModule {}
