import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/Login.vue")
      },
      {
        path: "/password/:token",
        name: "Password",
        component: () => import("@/views/Password.vue")
      },
      {
        path: "/notes/:user_id",
        name: "Note",
        component: () => import("@/views/Notes.vue")
      },
      {
        path: "/documents/:user_id",
        name: "Documenti",
        component: () => import("@/views/Documents.vue")
      },
      {
        path: "/finances/:user_id",
        name: "Finances",
        component: () => import("@/views/Finances.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  }
});

export default router;
