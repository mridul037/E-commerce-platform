import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CareerContainerComponent } from "./career-container/career-container.component";

const routes: Routes = [
	{
		path: "",
		component: CareerContainerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CareerRoutingModule {}
