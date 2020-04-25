import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "app-cart-mob-accessories",
	templateUrl: "./cart-mob-accessories.component.html",
	styleUrls: ["./cart-mob-accessories.component.scss"],
	//encapsulation: ViewEncapsulation.None,
})
export class CartMobAccessoriesComponent implements OnInit {
	@Input() accessories: Array<object>;
	constructor() {
		this.accessories = [];
	}

	ngOnInit() {}
}
