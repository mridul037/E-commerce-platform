import {
	AfterContentInit,
	Directive,
	ElementRef,
	HostBinding,
	HostListener,
	Input,
} from "@angular/core";
import supportsWebP from "supports-webp";
import { environment } from "../../../environments/environment";

@Directive({
	selector: "[appImageSrc]",
})
export class ImageSrcDirective implements AfterContentInit {
	@HostBinding("attr.src") srcAttr: string | null;
	@Input() src: string | null;
	@Input() width: number | null;
	@Input() height: number | null;
	@Input() bgColor: string | number;
	@Input() imgFormat: string | null;
	@Input() showPlaceholder: string;
	@Input() quality: string | null;

	screenSize: object;
	dpr: number;
	isWebpSupported: boolean;

	constructor(private el: ElementRef) {
		this.src = null;
		this.width = null;
		this.height = null;
		this.bgColor = "FFFFFF";
		this.imgFormat = "webp";
		this.showPlaceholder = "true";
		this.dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
		this.screenSize = this.getScreenSize();
		this.srcAttr = null;
		this.quality = null;
		this.isWebpSupported = true;
	}

	ngAfterContentInit() {
		supportsWebP.then(supported => {
			if (!supported) {
				this.isWebpSupported = false;
			}
		});

		if (this.showPlaceholder === "false") {
			this.srcAttr = null;
		} else {
			this.srcAttr = "/assets/icons/banner-placeholder.svg";
		}
		this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
	}

	@HostListener("window:resize", ["$event"])
	getScreenSize() {
		return {
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth,
		};
	}

	addImageKitParams = (
		url: string,
		width: number | null,
		height: number | null,
		dpr: number
	) => {
		if (width === null) {
			width = this.screenSize["screenWidth"];
		}
		const densityAdjustedWidth = (width ? width : 0) * Math.floor(dpr);
		const densityAdjustedHeight = (height ? height : 0) * Math.floor(dpr);

		let transformations: string;

		if (densityAdjustedWidth !== 0) {
			transformations = `w-${densityAdjustedWidth}`;
		} else if (densityAdjustedHeight !== 0) {
			transformations = `h-${densityAdjustedHeight}`;
		} else {
			transformations = `w-${this.screenSize["screenWidth"]}`;
		}

		// if (this.quality != null) transformations += `,q-${this.quality}`;

		// if (this.isWebpSupported) transformations += `,f-webp`;'

		return `${url}?tr=${transformations}`;
	};

	addBunnyCDNParams = (
		url: string,
		width: number | null,
		height: number | null,
		dpr: number
	) => {
		const densityAdjustedWidth = (width ? width : 0) * Math.floor(dpr);
		const densityAdjustedHeight = (height ? height : 0) * Math.floor(dpr);

		let transformations: string;

		if (densityAdjustedWidth !== 0) {
			transformations = `width=${densityAdjustedWidth}`;
		} else if (densityAdjustedHeight !== 0) {
			transformations = `height=${densityAdjustedHeight}`;
		} else {
			transformations = `width=${this.screenSize["screenWidth"]}`;
		}

		// if (this.quality != null) transformations += `&quality=${this.quality}`;

		if (this.isWebpSupported) transformations += `&format=webp`;

		return `${url}?${transformations}`;
	};

	private canLazyLoad() {
		return window && "IntersectionObserver" in window;
	}

	private lazyLoadImage() {
		const obs = new IntersectionObserver(entries => {
			entries.forEach(({ isIntersecting }) => {
				if (isIntersecting) {
					this.loadImage();
					obs.unobserve(this.el.nativeElement);
				}
			});
		});
		obs.observe(this.el.nativeElement);
	}

	private loadImage() {
		if (
			typeof this.src !== "undefined" &&
			this.src !== "" &&
			this.src !== null
		) {
			// tslint:disable-next-line
			if (!this.src.startsWith("https")) {
				let cdnUrl: string;
				if (environment.paths.imagesRootUrl.includes("imagekit")) {
					cdnUrl = this.addImageKitParams(
						this.src,
						this.width,
						this.height,
						this.dpr
					);
				} else {
					cdnUrl = this.addBunnyCDNParams(
						this.src,
						this.width,
						this.height,
						this.dpr
					);
				}
				this.src = `${environment.paths.imagesRootUrl}${cdnUrl}`;
				this.srcAttr = this.src;
			}
		}
	}
}
