import createApiClient from "./api.service";

class AuthService {
  constructor(baseUrl = "/api/auth") {
    this.api = createApiClient(baseUrl);
  }

  async login(username, password) {
    const response = await this.api.post("/login", { username, password });
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  }

  logout() {
    localStorage.removeItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  getUser() {
    const token = this.getToken();
    if (!token) return null;
    try {
      // Giải mã phần payload của JWT (base64url)
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { id: payload.id, username: payload.username };
    } catch {
      return null;
    }
  }
}

export default new AuthService();
