import { Injectable, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Device, DEVICE } from "@ngx-toolkit/device";
import { Sandbox } from "../shared/sandbox/base.sandbox";
import * as store from "../shared/store/index";
import * as BundlesAllActions from "./store/bundles.action";

@Injectable()
export class BundlesSandbox extends Sandbox {
	intermediateData$ = this.appState$.select(store.bundlesIntermediateData);
	constructor(
		protected appState$: Store<store.AppState>,
		@Inject(DEVICE) private deviceDetector: Device
	) {
		super(appState$, deviceDetector);
	}

	public getIntermediateData(queryParams: object): void {
		this.appState$.dispatch(
			new BundlesAllActions.GetIntermediateDataLoadAction(queryParams)
		);
	}
}
