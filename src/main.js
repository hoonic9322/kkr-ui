import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import router from "./router";
import App from "./App.vue";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/styles/main.css";
import "./assets/styles/footer.css";
import "./assets/styles/promotion.css";
import "./assets/styles/register-modal.css";
import "./assets/styles/login-modal.css";

import "./assets/styles/lobby/tg-lobby.css";
import "./assets/styles/lobby/sport-lobby.css";
import "./assets/styles/lobby/live-casino-lobby.css";

import "./assets/styles/home/tournament-section.css";
import "./assets/styles/home/tg-casino-section.css";
import "./assets/styles/home/live-casino-section.css";
import "./assets/styles/home/sport-section.css";
import "./assets/styles/home/promotion-section.css";

import en from "./i18n/en";
import zh from "./i18n/zh";

const savedLocale = localStorage.getItem("kkrr_locale") || "en";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages: {
    en,
    zh,
  },
});

createApp(App).use(router).use(i18n).mount("#app");