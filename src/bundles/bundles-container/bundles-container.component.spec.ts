import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BundlesContainerComponent } from "./bundles-container.component";

describe("BundlesContainerComponent", () => {
	let component: BundlesContainerComponent;
	let fixture: ComponentFixture<BundlesContainerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BundlesContainerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BundlesContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
