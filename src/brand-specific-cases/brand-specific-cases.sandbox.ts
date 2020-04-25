import { Injectable, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Device, DEVICE } from "@ngx-toolkit/device";
import { Sandbox } from "../shared/sandbox/base.sandbox";
import * as store from "../shared/store/index";
import * as BrandSpecificCasesAllActions from "./store/brand-specific-cases.action";

@Injectable()
export class BrandSpecificCasesSandbox extends Sandbox {
	intermediateData$ = this.appState$.select(
		store.brandSpecificCasesIntermediateData
	);
	public brandSeoContent$ = this.appState$.select(store.brandContent);

	constructor(
		protected appState$: Store<store.AppState>,
		@Inject(DEVICE) private deviceDetector: Device
	) {
		super(appState$, deviceDetector);
	}

	public getBrandSpecificCases(queryParams: object): void {
		this.appState$.dispatch(
			new BrandSpecificCasesAllActions.GetIntermediateDataLoadAction(
				queryParams
			)
		);
	}
	public getBrandContent(reqPayload: object): void {
		this.appState$.dispatch(
			new BrandSpecificCasesAllActions.BrandPageFooterContentAction(reqPayload)
		);
	}
}
