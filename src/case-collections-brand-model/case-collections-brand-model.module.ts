import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CaseCollectionsBrandModelContainerComponent } from "./case-collections-brand-model-container/case-collections-brand-model-container.component";
import { CaseCollectionsBrandModelRoutingModule } from "./case-collections-brand-model-routing.module";
import { SharedModule } from "../shared/shared.module";
import { CaseCollectionBrandModelSandbox } from "./case-collections-brand-model.sandbox";
import { CaseCollectionApiClientService } from "./case-collections-brand-model-api-client.service";
import { EffectsModule } from "@ngrx/effects";
import { CaseCollectionsEffects } from "./store/case-collection.effects";

@NgModule({
	declarations: [CaseCollectionsBrandModelContainerComponent],
	imports: [
		CommonModule,
		CaseCollectionsBrandModelRoutingModule,
		SharedModule,
		EffectsModule.forFeature([CaseCollectionsEffects]),
	],
	providers: [CaseCollectionBrandModelSandbox, CaseCollectionApiClientService],
})
export class CaseCollectionsBrandModelModule {}
