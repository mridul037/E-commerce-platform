import { Component, OnInit } from "@angular/core";
import { BundlesSandbox } from "../bundles.sandbox";
import { Observable } from "rxjs";
import metaTag from "../../../assets/data/gift-set/meta-tags-gift-set.json";
import { Meta, Title } from "@angular/platform-browser";

@Component({
	selector: "app-bundles-container",
	templateUrl: "./bundles-container.component.html",
	styleUrls: ["./bundles-container.component.scss"],
})
export class BundlesContainerComponent implements OnInit {
	intermediateData$: Observable<object[]>;
	device: string;
	constructor(
		private bundlesSandbox: BundlesSandbox,
		public meta: Meta,
		public titleService: Title
	) {
		this.intermediateData$ = this.bundlesSandbox.intermediateData$;
		this.device = this.bundlesSandbox.getDeviceType();
	}

	ngOnInit() {
		this.getIntermediateData();
		this.getMetaDescription();
	}
	private getIntermediateData() {
		const queryParams: object = {
			combo: "COMBOV2",
			modelSlug: "hampers",
			categorySlug: "gifts",
		};
		this.bundlesSandbox.getIntermediateData(queryParams);
	}
	private getMetaDescription() {
		const metaTitle = metaTag["gift-set"]["giftSetTitle"];
		const metaDescription = metaTag["gift-set"]["giftSetDescription"];
		this.titleService.setTitle(metaTitle);
		this.meta.updateTag({
			property: "og:title",
			Content: metaTitle,
		});
		this.meta.updateTag({ name: "description", Content: metaDescription });
		this.meta.updateTag({
			property: "og:description",
			Content: metaDescription,
		});
	}
}
