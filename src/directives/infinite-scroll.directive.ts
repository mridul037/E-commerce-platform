import {
	AfterViewInit,
	Directive,
	ElementRef,
	Input,
	OnDestroy,
} from "@angular/core";
import { fromEvent, Observable, of, Subject } from "rxjs";
import {
	distinctUntilChanged,
	filter,
	map,
	pairwise,
	share,
	takeUntil,
} from "rxjs/operators";

const HUNDRED = 100;

enum Status {
	REACHED = "Reached",
	NOT_REACHED = "Not Reached",
}

@Directive({
	selector: "[appInfiniteScroll]",
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
	destroy$: Subject<boolean>;

	@Input() onScrollDown: Function;

	scroll$: Observable<Status>;
	requestOnScrollDown$: Observable<Status>;

	scrollOffsetPercentage: number;

	constructor(private el: ElementRef) {
		this.destroy$ = new Subject();

		this.scrollOffsetPercentage = 0;

		this.scroll$ = of();
		this.requestOnScrollDown$ = of();

		this.onScrollDown = () => {};
	}

	ngAfterViewInit() {
		this.scroll$ = fromEvent(window, "scroll").pipe(
			map(() => {
				const clientHeight = window.document.documentElement.clientHeight;
				const scrollHeight = window.document.body.scrollHeight;
				const scrollableHeight = scrollHeight - clientHeight;
				const scrollOffset = scrollHeight - this.el.nativeElement.scrollHeight;

				this.scrollOffsetPercentage =
					(scrollOffset / scrollableHeight) * HUNDRED;

				return (window.pageYOffset / scrollableHeight) * HUNDRED;
			}),
			pairwise(),
			map(
				([y1, y2]): Status => {
					if (y2 > y1 && y2 > HUNDRED - this.scrollOffsetPercentage) {
						return Status.REACHED;
					} else {
						return Status.NOT_REACHED;
					}
				}
			),
			distinctUntilChanged(),
			share()
		);

		this.requestOnScrollDown$ = this.scroll$.pipe(
			filter(status => status === Status.REACHED),
			takeUntil(this.destroy$)
		);

		this.requestOnScrollDown$.subscribe(() => this.onScrollDown());
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
