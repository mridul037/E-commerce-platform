import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CheckoutContainerComponent } from "./checkout-container.component";

describe("CheckoutContainerComponent", () => {
	let component: CheckoutContainerComponent;
	let fixture: ComponentFixture<CheckoutContainerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CheckoutContainerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckoutContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
