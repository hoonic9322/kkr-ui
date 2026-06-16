import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import HomeView from "../views/HomeView.vue";
import PromotionView from "../views/PromotionLobbyView.vue";
import TGLobbyView from "../views/TGLobbyView.vue";
import LiveCasinoLobbyView from "../views/LiveCasinoLobbyView.vue";
import SportLobbyView from "../views/SportLobbyView.vue";
import SlotLobbyView from "../views/SlotLobbyView.vue";

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
        component: TGLobbyView,
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
      {
        path: "/live-casino",
        name: "LiveCasinoLobby",
        component: LiveCasinoLobbyView,
      },
      {
        path: "/sports",
        name: "SportLobby",
        component: SportLobbyView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
