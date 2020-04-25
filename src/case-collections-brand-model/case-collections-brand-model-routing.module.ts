import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CaseCollectionsBrandModelContainerComponent } from "./case-collections-brand-model-container/case-collections-brand-model-container.component";

const routes: Routes = [
	{
		path: "",
		component: CaseCollectionsBrandModelContainerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CaseCollectionsBrandModelRoutingModule {}
