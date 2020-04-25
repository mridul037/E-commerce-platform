import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartContainerComponent } from "./cart-container.component";

describe("CartContainerComponent", () => {
	let component: CartContainerComponent;
	let fixture: ComponentFixture<CartContainerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CartContainerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
