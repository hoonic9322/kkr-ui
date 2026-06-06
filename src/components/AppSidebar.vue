<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <button class="sidebar-toggle" type="button" @click="$emit('toggle')">
        <i class="bi bi-layout-sidebar-inset"></i>
      </button>

      <div class="brand" v-if="!collapsed">
        <div class="brand-mark">★</div>
        <div class="brand-name">SPORTUNA</div>
      </div>
    </div>

    <nav class="sidebar-menu">
      <RouterLink
        v-for="item in menuItems"
        :key="item.key"
        :to="item.path"
        class="sidebar-item"
        :class="{ active: item.key === 'home' }"
      >
        <i :class="item.icon"></i>
        <span v-if="!collapsed">{{ t(item.label) }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer" v-if="!collapsed">
      <button class="footer-action" type="button" @click="switchLanguage">
        <span class="flag">{{ currentLocale === 'en' ? '🇬🇧' : '🇨🇳' }}</span>
        <span>{{ currentLocale === "en" ? t("common.english") : t("common.chinese") }}</span>
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
import { useI18n } from "vue-i18n";

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggle"]);

const { t, locale } = useI18n();

const currentLocale = computed(() => locale.value);

const switchLanguage = () => {
  locale.value = locale.value === "en" ? "zh" : "en";
  localStorage.setItem("sportuna_locale", locale.value);
};

const menuItems = [
  {
    key: "promotions",
    label: "menu.promotions",
    icon: "bi bi-gift",
    path: "/",
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
    path: "/",
  },
  {
    key: "liveCasino",
    label: "menu.liveCasino",
    icon: "bi bi-phone",
    path: "/",
  },
  {
    key: "jackpots",
    label: "menu.jackpots",
    icon: "bi bi-lightning-charge",
    path: "/",
  },
  {
    key: "sports",
    label: "menu.sports",
    icon: "bi bi-life-preserver",
    path: "/",
  },
  {
    key: "liveBetting",
    label: "menu.liveBetting",
    icon: "bi bi-camera-video",
    path: "/",
  },
  {
    key: "horseRacing",
    label: "menu.horseRacing",
    icon: "bi bi-flag",
    path: "/",
  },
  {
    key: "virtualSports",
    label: "menu.virtualSports",
    icon: "bi bi-controller",
    path: "/",
  },
  {
    key: "challenges",
    label: "menu.challenges",
    icon: "bi bi-award",
    path: "/",
  },
  {
    key: "tournaments",
    label: "menu.tournaments",
    icon: "bi bi-trophy",
    path: "/",
  },
  {
    key: "bonusCrab",
    label: "menu.bonusCrab",
    icon: "bi bi-c-circle",
    path: "/",
  },
  {
    key: "shop",
    label: "menu.shop",
    icon: "bi bi-basket",
    path: "/",
  },
  {
    key: "vipLevels",
    label: "menu.vipLevels",
    icon: "bi bi-gem",
    path: "/",
  },
];
</script>