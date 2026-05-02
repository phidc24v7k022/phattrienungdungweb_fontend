<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
    <div class="mr-auto navbar-nav">
      <li v-if="isLoggedIn" class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </div>
    <div class="ms-auto navbar-nav">
      <template v-if="isLoggedIn">
        <li class="nav-item d-flex align-items-center me-2">
          <span class="text-white-50">
            <i class="fas fa-user-circle me-1"></i>{{ currentUser.username }}
          </span>
        </li>
        <li class="nav-item">
          <button class="btn btn-sm btn-outline-light" @click="handleLogout">
            <i class="fas fa-sign-out-alt me-1"></i>Đăng xuất
          </button>
        </li>
      </template>
      <template v-else>
        <li class="nav-item">
          <router-link :to="{ name: 'login' }" class="btn btn-sm btn-outline-light">
            <i class="fas fa-sign-in-alt me-1"></i>Đăng nhập
          </router-link>
        </li>
      </template>
    </div>
  </nav>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  name: "AppHeader",

  data() {
    return {
      isLoggedIn: AuthService.isLoggedIn(),
      currentUser: AuthService.getUser() || {},
    };
  },

  watch: {
    $route() {
      this.isLoggedIn = AuthService.isLoggedIn();
      this.currentUser = AuthService.getUser() || {};
    },
  },

  methods: {
    handleLogout() {
      AuthService.logout();
      this.isLoggedIn = false;
      this.currentUser = {};
      this.$router.push({ name: "login" });
    },
  },
};
</script>