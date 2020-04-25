import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartMobAccessoriesComponent } from "./cart-mob-accessories.component";

describe("CartMobAccessoriesComponent", () => {
	let component: CartMobAccessoriesComponent;
	let fixture: ComponentFixture<CartMobAccessoriesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CartMobAccessoriesComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartMobAccessoriesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
