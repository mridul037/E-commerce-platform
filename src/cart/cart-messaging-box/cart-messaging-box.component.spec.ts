import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartMessagingBoxComponent } from "./cart-messaging-box.component";

describe("CartMessagingBoxComponent", () => {
	let component: CartMessagingBoxComponent;
	let fixture: ComponentFixture<CartMessagingBoxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CartMessagingBoxComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartMessagingBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
