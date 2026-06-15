import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import router from "./router";
import App from "./App.vue";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/styles/main.css";
import "./assets/styles/tournament.css";
import "./assets/styles/promotion.css";
import "./assets/styles/footer.css";
import "./assets/styles/tg-casino.css";
import "./assets/styles/tg-lobby.css";
import "./assets/styles/sport-lobby.css";
import "./assets/styles/live-casino-lobby.css";

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