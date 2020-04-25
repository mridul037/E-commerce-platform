import { Component, OnInit } from "@angular/core";
import { NewsletterSuscriptionService } from "../../core/newsletter-subscription/newsletter-suscription.service";
import { Meta, Title } from "@angular/platform-browser";
@Component({
	selector: "app-career-container",
	templateUrl: "./career-container.component.html",
	styleUrls: ["./career-container.component.scss"],
})
export class CareerContainerComponent implements OnInit {
	public show_talented: boolean;
	public show_entrepreneurial: boolean;
	public show_design_oriented: boolean;
	public show_customer_focused: boolean;

	constructor(
		private newsletterSubscriptionService: NewsletterSuscriptionService,
		public meta: Meta,
		public titleService: Title
	) {
		this.show_talented = false;
		this.show_entrepreneurial = false;
		this.show_design_oriented = false;
		this.show_customer_focused = false;
	}

	ngOnInit() {
		this.getMetaTitleWithDescription();
	}
	subscribeToNewsletter(event: object) {
		if (typeof event !== "undefined") {
			this.newsletterSubscriptionService.newsLetterSubscribe(event);
		}
	}
	toggle_talented() {
		this.show_talented = !this.show_talented;
	}
	toggle_entrepreneurial() {
		this.show_entrepreneurial = !this.show_entrepreneurial;
	}
	toggle_design_oriented() {
		this.show_design_oriented = !this.show_design_oriented;
	}
	toggle_customer_focused() {
		this.show_customer_focused = !this.show_customer_focused;
	}
	public getMetaTitleWithDescription() {
		const metaTag = "Career DailyObjects";
		const metaDscription =
			"'content', 'DailyObjects is an online store that curates stunning designs and prints it on wide range of personal accessories. We provide artists from around the world a platform to directly connect with their customers and monetize on their creativity. We are passionate, self driven young enterprising workforce that is driving growth. We hire self motivated dynamic people to be part of our success story.'";

		this.titleService.setTitle(metaTag);
		this.meta.updateTag({
			property: "og:title",
			Content: metaTag,
		});
		this.meta.updateTag({ name: "description", Content: metaDscription });
		this.meta.updateTag({
			property: "og:description",
			Content: metaDscription,
		});
	}
}
