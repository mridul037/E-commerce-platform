export const environment = {
	production: true,

	hmr: false,
	url: "https://www.dailyobjects.com",
	api: {
		baseUrl: "https://www.dailyobjects.com/api",
		responseUrl: "https://www.dailyobjects.com/api/gateway-response",
		kitchenUrl: "https://kitchen.dailyobjects.com/waiter/event/stream",
	},
	paymentMethodUrl: {
		mobikwikUrl: "https://walletapi.mobikwik.com/wallet",
		payuUrl: "https://secure.payu.in/_payment",
		paytmUrl: "https://securegw.paytm.in/theia/processTransaction",
	},
	json: {
		baseUrl: `${location.protocol}//${location.hostname}:${location.port}`,
	},

	paths: {
		imagesRootUrl: "https://ik.imagekit.io/dailyobjects",
	},

	debugging: false,
};
