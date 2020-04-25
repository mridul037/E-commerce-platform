import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartCouponAppliedComponent } from "./cart-coupon-applied.component";

describe("CartCouponAppliedComponent", () => {
	let component: CartCouponAppliedComponent;
	let fixture: ComponentFixture<CartCouponAppliedComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CartCouponAppliedComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartCouponAppliedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
