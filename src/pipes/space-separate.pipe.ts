import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "spaceSeparate",
})
export class SpaceSeparatePipe implements PipeTransform {
	transform(value: string, args?: string): string {
		value = value.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");

		return value;
	}
}
