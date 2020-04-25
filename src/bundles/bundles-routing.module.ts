import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { compileBaseDefFromMetadata } from "@angular/compiler";
import { BundlesContainerComponent } from "./bundles-container/bundles-container.component";

const routes: Routes = [
	{
		path: "",
		component: BundlesContainerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BundlesRoutingModule {}
