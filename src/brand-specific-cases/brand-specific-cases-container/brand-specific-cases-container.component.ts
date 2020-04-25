import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil, filter, withLatestFrom } from "rxjs/operators";
import { BrandSpecificCasesSandbox } from "../brand-specific-cases.sandbox";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { SeoCanonicalService } from "../../core/seo/seo-canonical.service";
import { Meta, Title } from "@angular/platform-browser";
import metaTag from "../../../assets/data/brand-page/meta-tags-brand-page.json";
const enum FilterKey {
	SLUG = "brands.slug",
	CATEGORIES_SLUG = "slug",
}
const enum BrandContentFilter {
	BRAND = "brand",
	CATEGORY = "category",
	PAGE = "page",
}
const two = 2;
const one = 1;
const DESIGNER_CASES = "designer-cases";
@Component({
	selector: "app-brand-specific-cases-container",
	templateUrl: "./brand-specific-cases-container.component.html",
	styleUrls: ["./brand-specific-cases-container.component.scss"],
})
export class BrandSpecificCasesContainerComponent implements OnInit, OnDestroy {
	destroy$: Subject<boolean>;
	public device: string;
	intermediateData$: Observable<object[]>;
	public brandData: object;
	public slugFilter: string;
	public pageType: string;
	public brandName: string;
	public brandContent: object;
	brandSeoContent$: Observable<object[]>;

	constructor(
		private brandSpecificCasesSandbox: BrandSpecificCasesSandbox,
		private router: Router,
		private route: ActivatedRoute,
		public seoService: SeoCanonicalService,
		public meta: Meta,
		public titleService: Title
	) {
		const currentUrl = this.router.url;
		const urlParts = currentUrl.split("/");
		this.pageType = urlParts[one];
		this.brandName = urlParts[two];
		const index = this.brandName.indexOf("?");
		this.brandName =
			index === -1 ? this.brandName : this.brandName.substring(0, index);
		this.destroy$ = new Subject();
		this.device = this.brandSpecificCasesSandbox.getDeviceType();
		this.brandData = {};
		this.intermediateData$ = this.brandSpecificCasesSandbox.intermediateData$;
		this.slugFilter = "";
		this.brandContent = {};
		this.brandSeoContent$ = this.brandSpecificCasesSandbox.brandSeoContent$;
		// tslint:disable-next-line:no-duplicate-string
	}

	ngOnInit() {
		this.slugFilter = this.router.url.substr(
			this.router.url.lastIndexOf("/") + 1
		);
		this.getBrand();
		this.getBrandContent();
		this.getMetaTitleWithDescription();
		this.router.events
			.pipe(
				filter(e => e instanceof NavigationEnd),
				withLatestFrom(this.route.paramMap, this.route.queryParamMap),
				takeUntil(this.destroy$)
			)
			.subscribe(val => {
				this.brandName = this.router.url.split("/")[two];
				this.getBrand();
				this.getBrandContent();
				this.getMetaTitleWithDescription();
			});

		this.intermediateData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
			this.brandData = data;
		});
		this.getBrandContent();
		this.brandSeoContent$.pipe(takeUntil(this.destroy$)).subscribe(Content => {
			this.brandContent = Content;
		});
	}
	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
	open(brandSlug: string, modelSlug: string, isIntermediatePage: boolean) {
		if (!isIntermediatePage)
			this.router.navigate(["", DESIGNER_CASES, brandSlug, modelSlug]);
		else this.router.navigate(["", "case-collections", brandSlug, modelSlug]);
	}
	private getBrandFilter(): object {
		const obj = {};
		let filterKey = this.router.url.substr(
			this.router.url.lastIndexOf("/") + 1
		);
		if (filterKey.includes("?")) {
			filterKey = filterKey.slice(0, filterKey.indexOf("?"));
		}
		obj[FilterKey.CATEGORIES_SLUG] = {
			$eq: DESIGNER_CASES,
		};
		obj[FilterKey.SLUG] = {
			$eq: filterKey,
		};

		return {
			...obj,
		};
	}
	private getBrand() {
		const payload = {
			filter: this.getBrandFilter(),
		};

		this.brandSpecificCasesSandbox.getBrandSpecificCases(payload);
	}
	private getContentFilter(): object {
		const obj = {};

		obj[BrandContentFilter.BRAND] = {
			$eq: this.brandName,
		};
		obj[BrandContentFilter.CATEGORY] = {
			$eq: DESIGNER_CASES,
		};
		obj[BrandContentFilter.PAGE] = {
			$eq: "brand",
		};

		return {
			...obj,
		};
	}
	private getBrandContent() {
		const payload = {
			filter: this.getContentFilter(),
		};

		this.brandSpecificCasesSandbox.getBrandContent(payload);
	}

	private getMetaTitleWithDescription() {
		let metaTitle, metaDescription;
		metaTitle = metaTag["brand-page"]["categoryTitle"];
		metaDescription = metaTag["brand-page"]["categoryDescription"];
		const titleData = metaTitle
			.replace(/{model}/g, this.brandName)
			.replace(/-/g, " ");
		const descriptionData = metaDescription
			.replace(/{model}/g, this.brandName)
			.replace(/-/g, " ");
		this.titleService.setTitle(titleData);
		this.meta.updateTag({
			property: "og:title",
			Content: titleData,
		});
		this.meta.updateTag({ name: "description", Content: descriptionData });
		this.meta.updateTag({
			property: "og:description",
			Content: descriptionData,
		});
	}
}
