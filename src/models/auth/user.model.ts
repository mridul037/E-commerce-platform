export class User {
	public email: string;
	public firstName: string;
	public lastName: string;
	public fullName: string;
	public mobileNumber: string;
	public address: object[];
	public avatar: string;
	public userInterest: string;
	public role: object;
	public _id: string;
	public slug: string;
	public emailVerified: boolean;
	public registeredBy: string;

	constructor(user: object) {
		this.email = user["email"] ? user["email"] : "";
		this.firstName = user["firstName"] ? user["firstName"] : "";
		this.lastName = user["lastName"] ? user["lastName"] : "";
		this.fullName = user["fullName"] ? user["fullName"] : "";
		this.mobileNumber = user["mobileAuth"]["number"]
			? user["mobileAuth"]["number"]
			: "";
		this.address = user["address"] ? user["address"] : [];
		this.avatar = user["avatar"] ? user["avatar"] : "";
		this.userInterest = user["gender"] ? user["gender"] : "";
		this.role = user["role"] ? user["role"] : {};
		this._id = user["_id"] ? user["_id"] : "";
		this.slug = user["slug"] ? user["slug"] : "";
		this.emailVerified =
			typeof user["emailVerified"] !== "undefined"
				? user["emailVerified"]
				: true;
		this.registeredBy = user["registeredBy"] ? user["registeredBy"] : "";
	}

	/**
	 * Saves user into local storage
	 *
	 * @param user - user entered data
	 */
	public save(): void {
		localStorage.setItem("currentUser", JSON.stringify(this));
	}

	/**
	 * Saves user into local storage
	 */
	public remove(): void {
		localStorage.setItem("currentUser", "");
	}
}
