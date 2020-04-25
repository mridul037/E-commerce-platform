import { Injectable } from "@angular/core";

const enum DesignType {
	BANNER = "banner",
}

@Injectable()
export class BrandAdapter {
	static IntermediateDataAdapter(intermediateData: object[]): Array<object> {
		const data = intermediateData["data"];
		data.forEach((design: object) => {
			if (design["designType"] === DesignType.BANNER) {
				design["feed"].forEach((feed: object) => {});
			}
		});

		return data;
	}

	constructor() {}
}
