import { AfterContentInit, Directive, ElementRef, Input } from "@angular/core";

const FIVE_HUNDRED = 500;

@Directive({
	selector: "[appAutoFocus]",
})
export class AutofocusDirective implements AfterContentInit {
	@Input() public appAutoFocus: boolean;

	public constructor(private el: ElementRef) {
		this.appAutoFocus = true;
	}

	public ngAfterContentInit() {
		setTimeout(() => {
			this.el.nativeElement.focus();
		}, FIVE_HUNDRED);
	}
}
