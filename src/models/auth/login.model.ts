export class LoginForm {
	public username: string;
	public password: string;

	constructor(loginForm: LoginForm) {
		this.username = loginForm.username || "";
		this.password = loginForm.password || "";
	}
}
