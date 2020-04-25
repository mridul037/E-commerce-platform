import { Injectable, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Device, DEVICE } from "@ngx-toolkit/device";
import { Sandbox } from "../shared/sandbox/base.sandbox";
import * as store from "../shared/store/index";
import * as CaseCollectionAllActions from "./store/case-collection.action";
@Injectable()
export class CaseCollectionBrandModelSandbox extends Sandbox {
	getIntermediateData$ = this.appState$.select(
		store.getIntermediateDataCaseCollection
	);
	constructor(
		protected appState$: Store<store.AppState>,
		@Inject(DEVICE) private deviceDetector: Device
	) {
		super(appState$, deviceDetector);
	}
	public getIntermediateData(queryParams: object): void {
		this.appState$.dispatch(
			new CaseCollectionAllActions.GetIntermediateDataLoadAction(queryParams)
		);
	}
}
