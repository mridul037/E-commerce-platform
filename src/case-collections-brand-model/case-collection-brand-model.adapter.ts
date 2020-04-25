import { Injectable } from "@angular/core";
import { UtilService } from "../core/util.service";
const enum DesignType {
	CALLOUT_BANNER = "calloutBanner",
}

@Injectable()
export class CaseCollectionsAdapter {
	static IntermediateDataAdapter(intermediateData: object[]): Array<object> {
		const data = intermediateData["data"];
		data.forEach((design: object) => {
			if (design["designType"] === DesignType.CALLOUT_BANNER) {
				design["feed"].forEach((feed: object) => {
					const urlObj = new UtilService().transformOldUrlToNewUrl(feed["url"]);
					feed["url"] = urlObj["url"];
					feed["queryParams"] =
						typeof urlObj["type"] !== "undefined"
							? { type: urlObj["type"] }
							: "";
				});
			}
		});
		return data;
	}

	constructor() {}
}
