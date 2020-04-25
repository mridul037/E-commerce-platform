import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CheckoutContainerComponent } from "./checkout-container/checkout-container.component";
import { AuthGuard } from "../shared/guards/auth.guard";

const routes: Routes = [
	{
		path: "",
		component: CheckoutContainerComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CheckoutRoutingModule {}
