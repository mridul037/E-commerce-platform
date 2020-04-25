import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { NewsletterSuscriptionService } from "../../core/newsletter-subscription/newsletter-suscription.service";
import { CaseCollectionBrandModelSandbox } from "../case-collections-brand-model.sandbox";
import { takeUntil, filter } from "rxjs/operators";
import { LoaderService } from "../../core/loader.service";
import { SeoCanonicalService } from "../../core/seo/seo-canonical.service";
import { Meta, Title } from "@angular/platform-browser";
import metaTag from "../../../assets/data/case-collection/meta-tags-case-collections.json";

@Component({
	selector: "app-case-collections-brand-model-container",
	templateUrl: "./case-collections-brand-model-container.component.html",
	styleUrls: ["./case-collections-brand-model-container.component.scss"],
})
export class CaseCollectionsBrandModelContainerComponent implements OnInit {
	public destroy$: Subject<boolean>;
	public modelSlug: string | null;
	public brandSlug: string | null;
	public categorySlugData: string;
	public device: string;
	public screenWidth: number;

	public intermediateData$: Observable<object[]>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private caseCollectionSandbox: CaseCollectionBrandModelSandbox,
		private newsletterSubscriptionService: NewsletterSuscriptionService,
		private loaderService: LoaderService,
		public seoService: SeoCanonicalService,
		public meta: Meta,
		public titleService: Title
	) {
		this.destroy$ = new Subject<boolean>();
		this.modelSlug = "";
		this.brandSlug = "";
		// tslint:disable-next-line:no-duplicate-string
		this.categorySlugData = "designer-cases";
		this.intermediateData$ = this.caseCollectionSandbox.getIntermediateData$;
		this.screenWidth = window.innerWidth;

		this.device = this.caseCollectionSandbox.getDeviceType();
	}

	ngOnInit() {
		const modelArray = [
			"iphone-11-pro-max",
			"iphone-11-pro",
			"iphone-11",
			"iphone-x",
			"iphone-xs",
			"iphone-xr",
			"iphone-xs-max",
			"iphone-7",
			"iphone-7-plus",
			"iphone-8",
			"iphone-8-plus",
			"oneplus-7-pro",
			"oneplus-7t-pro",
			"oneplus-7t",
			"oneplus-7",
			"oneplus-6",
			"oneplus-6t",
			"galaxy-s20-ultra",
			"galaxy-s20-plus",
			"galaxy-s20",
			"galaxy-note-10",
			"galaxy-note-10-plus",
			"galaxy-s10",
			"galaxy-s10-plus",
			"galaxy-s10e",
			"galaxy-m40",
			"galaxy-m30",
			"galaxy-m20",
			"galaxy-m10",
			"galaxy-a70",
			//"galaxy-a60",
			"galaxy-a50",
			"galaxy-a40",
			"galaxy-a30",
			"galaxy-a20",
			"galaxy-a10",
			"galaxy-a30s",
			"galaxy-a70s",
			"galaxy-m30s",
			"galaxy-a50s",
			"redmi-note-7-pro",
			"xiaomi-redmi-7a",
			"xiaomi-redmi-k20",
			"xiaomi-redmi-k20-pro",
			"redmi-note-8-pro",
			"redmi-note-8",
			"redmi-note-7",
			"redmi-note-7s",
			"mi-a3",
			"poco-f1",
			"huawei-p30-pro",
			"huawei-p30",
			"vivo-s1",
			"vivo-z1x",
			"vivo-v15",
			"vivo-v15-pro",
			"vivo-v17-pro",
			"vivo-v11-pro",
			"vivo-z1-pro",
			"oppo-f11-pro",
			"oppo-realme-xt",
			"oppo-reno-2z",
			"oppo-reno-2f",
			"oppo-reno-2",
			"oppo-realme-5",
			"oppo-realme-5-pro",
			"oppo-k3",
			"oppo-realme-3-pro",
			"oppo-reno-10x-zoom",
			"oppo-realme-x",
			"iphone-6",
			"iphone-6s",
		];

		this.route.paramMap.subscribe(paramMap => {
			this.brandSlug = paramMap.get("brand");
			this.modelSlug = paramMap.get("model");
			if (
				this.modelSlug !== null &&
				modelArray.indexOf(this.modelSlug) === -1
			) {
				this.router.navigate(["", "designer-cases"]);
				return;
			} else {
				const queryParams: object = {
					brandSlug: paramMap.get("brand"),
					categorySlug: "designer-cases",
					modelSlug: paramMap.get("model"),
				};
				this.loaderService.show();
				this.caseCollectionSandbox.getIntermediateData(queryParams);
			}
		});

		this.intermediateData$
			.pipe(
				filter(intermediateData => typeof intermediateData !== "undefined"),
				takeUntil(this.destroy$)
			)
			.subscribe(() => {
				this.loaderService.hide();
			});

		this.caseCollectionSandbox.getIntermediateData$
			.pipe(
				filter(intermediateData => typeof intermediateData !== "undefined"),
				takeUntil(this.destroy$)
			)
			.subscribe(() => {
				this.seoService.addTags({
					link: "canonical",
					content:
						window.location.origin +
						"/designer-cases/" +
						this.brandSlug +
						"/" +
						this.modelSlug,
				});
				this.meta.updateTag({
					property: "og:url",
					content:
						window.location.origin +
						"/designer-cases/" +
						this.brandSlug +
						"/" +
						this.modelSlug,
				});
				this.getMetaTitleWithDescription();
			});
		this.setAmpTag();
	}

	private capitalizeModelName(word: string): string {
		/**
		 * 	CUSTOM RENAMING
		 *	iphone -> iPhone, macbook -> MacBook
		 */

		if (word.match(/.*iphone.*/i)) {
			return "iPhone";
		} else if (word.match(/.*macbook.*/i)) {
			return "MacBook";
		} else if (word.match(/.*ipad.*/i)) {
			return "iPad";
		}
		return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
	}

	transformModelName(modelName: string) {
		if (modelName) {
			return modelName
				.split("-")
				.map(modelNameWord => {
					return this.capitalizeModelName(modelNameWord);
				})
				.join(" ");
		} else {
			return null;
		}
	}
	private getMetaTitleWithDescription() {
		let metaTitle, metaDescription;
		metaTitle = metaTag["case-collections"]["categoryTitle"];
		metaDescription = metaTag["case-collections"]["categoryDescription"];

		if (this.modelSlug !== null) {
			const titleData = metaTitle
				.replace(/{model}/g, this.modelSlug)
				.replace(/-/g, " ");
			const descriptionData = metaDescription
				.replace(/{model}/g, this.modelSlug)
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
	setAmpTag() {
		let models;

		models = [
			"iphone-6",
			"iphone-6s",
			"iphone-7",
			"iphone-7-plus",
			"iphone-6-plus",
			"iphone-6s-plus",
			"iphone-5-5s",
			"galaxy-s8",
			"galaxy-s8-plus",
			"galaxy-s7-edge",
			"moto-g5-plus",
			"moto-g5",
			"oneplus-3t",
			"oneplus-3",
			"redmi-4",
			"redmi-note-4",
		];
		for (let i = 0; i < models.length; i++) {
			if (models[i] === this.modelSlug) {
				this.seoService.addAmpTags({
					content:
						"https://www.dailyobjects.com/amp/case-collections/" +
						this.brandSlug +
						"/" +
						this.modelSlug +
						"/index.html",
				});
				break;
			}
		}
	}
	subscribeToNewsletter(event: object) {
		if (typeof event !== "undefined") {
			this.newsletterSubscriptionService.newsLetterSubscribe(event);
		}
	}
}
