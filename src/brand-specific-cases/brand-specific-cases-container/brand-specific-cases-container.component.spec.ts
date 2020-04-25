import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BrandSpecificCasesContainerComponent } from "./brand-specific-cases-container.component";

describe("BrandSpecificCasesContainerComponent", () => {
	let component: BrandSpecificCasesContainerComponent;
	let fixture: ComponentFixture<BrandSpecificCasesContainerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BrandSpecificCasesContainerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BrandSpecificCasesContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
