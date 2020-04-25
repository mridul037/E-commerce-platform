import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CaseCollectionsBrandModelContainerComponent } from "./case-collections-brand-model-container.component";

describe("CaseCollectionsBrandModelContainerComponent", () => {
	let component: CaseCollectionsBrandModelContainerComponent;
	let fixture: ComponentFixture<CaseCollectionsBrandModelContainerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CaseCollectionsBrandModelContainerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(
			CaseCollectionsBrandModelContainerComponent
		);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
