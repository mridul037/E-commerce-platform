import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CareerContainerComponent } from "./career-container.component";

describe("CareerContainerComponent", () => {
	let component: CareerContainerComponent;
	let fixture: ComponentFixture<CareerContainerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CareerContainerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CareerContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
