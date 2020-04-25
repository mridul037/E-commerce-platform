import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrandSpecificCasesContainerComponent } from "./brand-specific-cases-container/brand-specific-cases-container.component";
import { BrandSpecificCasesApiClientService } from "./brand-specific-cases-api-client.service";
import { BrandSpecificCasesSandbox } from "./brand-specific-cases.sandbox";
import { SharedModule } from "../shared/shared.module";
import { EffectsModule } from "@ngrx/effects";
import { BrandSpecificCasesEffect } from "./store/brand-specific-cases.effects";

import { BrandSpecificCaseModule } from "./brand-specific-cases-routing.module";

@NgModule({
	declarations: [BrandSpecificCasesContainerComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule,
		BrandSpecificCaseModule,
		EffectsModule.forFeature([BrandSpecificCasesEffect]),
	],
	providers: [BrandSpecificCasesApiClientService, BrandSpecificCasesSandbox],
})
export class BrandSpecificCasesModule {}
