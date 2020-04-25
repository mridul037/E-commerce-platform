import { Pipe, PipeTransform } from "@angular/core";

const TOTAL_SECONDS_IN_AN_HOUR = 3600;
const SIXTY = 60;
const NEGATIVE_THREE = -3;

@Pipe({
	name: "formatTime",
})
export class FormatTimePipe implements PipeTransform {
	transform(value: number, disableHours: boolean): string {
		const hours: number = Math.floor(value / TOTAL_SECONDS_IN_AN_HOUR);
		const minutes: number = Math.floor(
			(value % TOTAL_SECONDS_IN_AN_HOUR) / SIXTY
		);

		if (disableHours) {
			return (
				`00${minutes}m`.slice(NEGATIVE_THREE) +
				": " +
				`00 ${Math.floor(value - minutes * SIXTY)}s`.slice(NEGATIVE_THREE)
			);
		}

		return (
			`00${hours}h`.slice(NEGATIVE_THREE) +
			": " +
			`00${minutes}m`.slice(NEGATIVE_THREE) +
			": " +
			`00 ${Math.floor(value - minutes * SIXTY)}s`.slice(NEGATIVE_THREE)
		);
	}
}
