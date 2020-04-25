export const environment = {
	production: false,

	hmr: true,

	api: {
		baseUrl: "https://www.dailyobjects.com/api",
		responseUrl: "https://www.dailyobjects.com/api/gateway-response",
		kitchenUrl: "https://stage-kitchen.dailyobjects.com/waiter/event/stream",
	},

	json: {
		baseUrl: `${location.protocol}//${location.hostname}:${location.port}`,
	},
	paymentMethodUrl: {
		mobikwikUrl: "",
		payuUrl: "",
		paytmUrl: "",
	},
	paths: {
		imagesRootUrl: "https://cdn.dailyobjects.com",
	},

	debugging: true,
};
