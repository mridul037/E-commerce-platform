export const environment = {
	production: false,

	hmr: false,
	url: "https://dev.dailyobjects.com",
	api: {
		baseUrl: "https://www.dailyobjects.com/api",
		responseUrl: "https://www.dailyobjects.com/api/gateway-response",
		kitchenUrl: "https://stage-kitchen.dailyobjects.com/waiter/event/stream",
	},
	paymentMethodUrl: {
		mobikwikUrl: "https://test.mobikwik.com/wallet",
		// payuUrl: "https://secure.payu.in/_payment",'
		payuUrl: "https://test.payu.in/_payment",
		paytmUrl: "https://pguat.paytm.com/oltp-web/processTransaction",
	},
	json: {
		baseUrl: `${location.protocol}//${location.hostname}:${location.port}`,
	},

	paths: {
		imagesRootUrl: "https://ik.imagekit.io/dailyobjects",
	},

	debugging: true,
};
