import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BundlesRoutingModule } from "./bundles-routing.module";
import { BundlesContainerComponent } from "./bundles-container/bundles-container.component";
import { SharedModule } from "../shared/shared.module";

import { EffectsModule } from "@ngrx/effects";
import { BundlesEffects } from "./store/bundles.effects";
import { BundlesApiClientService } from "./bundles-api-client.service";
import { BundlesSandbox } from "./bundles.sandbox";

@NgModule({
	declarations: [BundlesContainerComponent],
	imports: [
		CommonModule,
		BundlesRoutingModule,
		SharedModule,
		EffectsModule.forFeature([BundlesEffects]),
	],
	providers: [BundlesApiClientService, BundlesSandbox],
})
export class BundlesModule {}
