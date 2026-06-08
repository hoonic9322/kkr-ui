<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <div class="brand" v-if="!collapsed">
        <img src="/images/logo.png" alt="K8 Logo" class="brand-logo" />
      </div>

      <div class="brand-mini" v-else>
        K8
      </div>
    </div>

    <nav class="sidebar-menu">
      <RouterLink
        v-for="item in menuItems"
        :key="item.key"
        :to="item.path"
        class="sidebar-item"
        :class="{ active: isActiveMenu(item) }"
      >
        <i :class="item.icon"></i>
        <span v-if="!collapsed">{{ t(item.label) }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer" v-if="!collapsed">
      <button class="footer-action" type="button" @click="switchLanguage">
        <span class="flag">
          {{ currentLocale === "en" ? "🇬🇧" : "🇨🇳" }}
        </span>

        <span>
          {{ currentLocale === "en" ? t("common.english") : t("common.chinese") }}
        </span>
      </button>

      <div class="footer-divider"></div>

      <button class="footer-action" type="button">
        <i class="bi bi-question-circle"></i>
        <span>{{ t("common.helpCentre") }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const { t, locale } = useI18n();

const currentLocale = computed(() => locale.value);

const switchLanguage = () => {
  locale.value = locale.value === "en" ? "zh" : "en";
  localStorage.setItem("kkrr_locale", locale.value);
};

const isActiveMenu = (item) => {
  if (item.path === "/") {
    return route.path === "/";
  }

  return route.path.startsWith(item.path);
};

const menuItems = [
  {
    key: "promotions",
    label: "menu.promotions",
    icon: "bi bi-gift",
    path: "/promotions",
  },
  {
    key: "home",
    label: "menu.home",
    icon: "bi bi-house-door",
    path: "/",
  },
  {
    key: "casino",
    label: "menu.casino",
    icon: "bi bi-menu-button-wide",
    path: "/casino",
  },
  {
    key: "liveCasino",
    label: "menu.liveCasino",
    icon: "bi bi-phone",
    path: "/live-casino",
  },
  {
    key: "jackpots",
    label: "menu.jackpots",
    icon: "bi bi-lightning-charge",
    path: "/jackpots",
  },
  {
    key: "sports",
    label: "menu.sports",
    icon: "bi bi-life-preserver",
    path: "/sports",
  },
  {
    key: "liveBetting",
    label: "menu.liveBetting",
    icon: "bi bi-camera-video",
    path: "/live-betting",
  },
  {
    key: "horseRacing",
    label: "menu.horseRacing",
    icon: "bi bi-flag",
    path: "/horse-racing",
  },
  {
    key: "virtualSports",
    label: "menu.virtualSports",
    icon: "bi bi-controller",
    path: "/virtual-sports",
  },
  {
    key: "challenges",
    label: "menu.challenges",
    icon: "bi bi-award",
    path: "/challenges",
  },
  {
    key: "tournaments",
    label: "menu.tournaments",
    icon: "bi bi-trophy",
    path: "/tournaments",
  },
  {
    key: "bonusGrab",
    label: "menu.bonusGrab",
    icon: "bi bi-c-circle",
    path: "/bonus-grab",
  },
  {
    key: "shop",
    label: "menu.shop",
    icon: "bi bi-basket",
    path: "/shop",
  },
  {
    key: "vipLevels",
    label: "menu.vipLevels",
    icon: "bi bi-gem",
    path: "/vip-levels",
  },
];
</script>