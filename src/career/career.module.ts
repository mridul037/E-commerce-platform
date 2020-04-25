import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CareerRoutingModule } from "./career-routing.module";
import { CareerContainerComponent } from "./career-container/career-container.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [CareerContainerComponent],
	imports: [CommonModule, CareerRoutingModule, SharedModule],
})
export class CareerModule {}
