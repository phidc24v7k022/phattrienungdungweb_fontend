<template>
  <div class="login-wrapper d-flex justify-content-center align-items-center">
    <div class="login-card card shadow">
      <div class="card-body p-4">
        <h3 class="card-title text-center mb-4">
          <i class="fas fa-address-book me-2 text-primary"></i>Đăng nhập
        </h3>

        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-circle me-1"></i>{{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label fw-semibold">
              <i class="fas fa-user me-1"></i>Tên đăng nhập
            </label>
            <input
              id="username"
              v-model.trim="username"
              type="text"
              class="form-control"
              placeholder="Nhập tên đăng nhập"
              autocomplete="username"
              required
            />
          </div>

          <div class="mb-4">
            <label for="password" class="form-label fw-semibold">
              <i class="fas fa-lock me-1"></i>Mật khẩu
            </label>
            <div class="input-group">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                placeholder="Nhập mật khẩu"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="loading"
          >
            <span v-if="loading">
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              Đang đăng nhập...
            </span>
            <span v-else>
              <i class="fas fa-sign-in-alt me-1"></i>Đăng nhập
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      loading: false,
      errorMessage: "",
    };
  },

  methods: {
    async handleLogin() {
      this.errorMessage = "";
      this.loading = true;
      try {
        await AuthService.login(this.username, this.password);
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        const msg = error.response?.data?.message;
        this.errorMessage = msg || "Tên đăng nhập hoặc mật khẩu không đúng.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  min-height: 80vh;
}

.login-card {
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
}
</style>
