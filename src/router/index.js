import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import HomeView from "../views/HomeView.vue";
import PromotionView from "../views/PromotionView.vue";
import SlotLobbyView from "../views/SlotLobbyView.vue";
import TGCasinoTablesView from "../views/TGCasinoTablesView.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "/tg-live",
        name: "TGLive",
        component: () => import("../views/TGLobbyView.vue"),
      },
      {
        path: "promotions",
        name: "promotions",
        component: PromotionView,
      },
      {
        path: "/slots",
        name: "slots",
        component: SlotLobbyView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
