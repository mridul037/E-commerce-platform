enum LayoutType {
	BANNER = "banner",
	SHOWCASE = "showcase",
	BANNER_WITH_TEXT = "bannerWithText",
	SLIDER = "slider",
	RECIPE_PRODUCTS_FEED = "recipeProductFeed",
}

const BANNER_HEIGHT = 100;
const SHOWCASE_HEIGHT = 308;
const SLIDER_HEIGHT = 200;

export class MobileHomeLayout {
	constructor() {}

	private setBannerModel(bannerLayout: object): object {
		return {
			active: bannerLayout ? bannerLayout["active"] : false,
			url: bannerLayout ? bannerLayout["url"] : "",
			height: bannerLayout ? bannerLayout["height"] : BANNER_HEIGHT,
			image: bannerLayout ? bannerLayout["image"] : "",
			layoutType: bannerLayout ? bannerLayout["layoutType"] : "",
			meta: bannerLayout ? bannerLayout["meta"] : {},
			padding: bannerLayout ? bannerLayout["padding"] : false,
			subtitle: bannerLayout ? bannerLayout["subtitle"] : "",
			title: bannerLayout ? bannerLayout["title"] : "",
		};
	}

	private setShowcaseModel(showcaseLayout: object): object {
		return {
			active: showcaseLayout ? showcaseLayout["active"] : false,
			feed: showcaseLayout ? showcaseLayout["feed"] : [],
			height: showcaseLayout ? showcaseLayout["height"] : SHOWCASE_HEIGHT,
			layoutType: showcaseLayout ? showcaseLayout["layoutType"] : "",
			meta: showcaseLayout ? showcaseLayout["meta"] : {},
			padding: showcaseLayout ? showcaseLayout["padding"] : false,
		};
	}

	private setBannerWithTextModel(bannerWithTextLayout: object): object {
		return {
			active: bannerWithTextLayout ? bannerWithTextLayout["active"] : false,
			url: bannerWithTextLayout ? bannerWithTextLayout["url"] : "",
			height: bannerWithTextLayout
				? bannerWithTextLayout["height"]
				: BANNER_HEIGHT,
			image: bannerWithTextLayout ? bannerWithTextLayout["image"] : "",
			layoutType: bannerWithTextLayout
				? bannerWithTextLayout["layoutType"]
				: "",
			meta: bannerWithTextLayout ? bannerWithTextLayout["meta"] : {},
			padding: bannerWithTextLayout ? bannerWithTextLayout["padding"] : false,
			subtitle: bannerWithTextLayout ? bannerWithTextLayout["subtitle"] : "",
			title: bannerWithTextLayout ? bannerWithTextLayout["title"] : "",
		};
	}

	private setSliderModel(sliderLayout: object): object {
		return {
			active: sliderLayout ? sliderLayout["active"] : false,
			url: sliderLayout ? sliderLayout["url"] : "",
			feed: sliderLayout ? sliderLayout["feed"] : [],
			height: sliderLayout ? sliderLayout["height"] : BANNER_HEIGHT,
			image: sliderLayout ? sliderLayout["image"] : "",
			layoutType: sliderLayout ? sliderLayout["layoutType"] : "",
			meta: sliderLayout ? sliderLayout["meta"] : {},
			subtitle: sliderLayout ? sliderLayout["subtitle"] : "",
			title: sliderLayout ? sliderLayout["title"] : "",
		};
	}

	public getLayoutType(layout: object): object {
		switch (layout["layoutType"]) {
			case LayoutType.BANNER: {
				return this.setBannerModel(layout);
			}
			case LayoutType.SHOWCASE: {
				return this.setShowcaseModel(layout);
			}
			case LayoutType.BANNER_WITH_TEXT: {
				return this.setBannerWithTextModel(layout);
			}
			case LayoutType.SLIDER: {
				return this.setSliderModel(layout);
			}
			default:
				return {};
		}
	}
}
