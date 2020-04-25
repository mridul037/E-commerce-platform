import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BrandSpecificCasesContainerComponent } from "./brand-specific-cases-container/brand-specific-cases-container.component";

const routes: Routes = [
	{
		path: "",
		component: BrandSpecificCasesContainerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BrandSpecificCaseModule {}
