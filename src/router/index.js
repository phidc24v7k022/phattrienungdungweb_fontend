import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import AuthService from "@/services/auth.service";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard: chuyển hướng về /login nếu chưa đăng nhập
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !AuthService.isLoggedIn()) {
    next({ name: "login" });
  } else if (to.name === "login" && AuthService.isLoggedIn()) {
    next({ name: "contactbook" });
  } else {
    next();
  }
});

export default router;