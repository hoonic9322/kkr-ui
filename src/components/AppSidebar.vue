<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <RouterLink v-if="!collapsed" to="/" class="brand">
        <img src="/images/logo.png" alt="K8 Logo" class="brand-logo" />
      </RouterLink>

      <RouterLink v-else to="/" class="brand-mini"> K8 </RouterLink>
    </div>

    <nav class="sidebar-menu">
      <RouterLink
        v-for="item in menuItems"
        :key="item.key"
        :to="item.path"
        class="sidebar-item"
        :class="{
          active: isActiveMenu(item),
          'is-featured-menu': item.featured,
        }"
      >
        <i :class="item.icon"></i>

        <span v-if="!collapsed">
          {{ t(item.label) }}
        </span>

        <em v-if="item.featured && !collapsed" class="sidebar-hot-badge">
          HOT
        </em>
      </RouterLink>
    </nav>

    <div class="sidebar-footer" v-if="!collapsed">
      <button class="footer-action" type="button" @click="switchLanguage">
        <span class="flag">
          {{ currentLocale === "en" ? "🇬🇧" : "🇨🇳" }}
        </span>

        <span>
          {{
            currentLocale === "en" ? t("common.english") : t("common.chinese")
          }}
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
    key: "tgLive",
    label: "menu.tgLive",
    icon: "bi bi-camera-video",
    path: "/tg-live",
    featured: true,
  },
  {
    key: "liveCasino",
    label: "menu.liveCasino",
    icon: "bi bi-phone",
    path: "/live-casino",
  },
  {
    key: "sports",
    label: "menu.sports",
    icon: "bi bi-life-preserver",
    path: "/sports",
  },
  {
    key: "slots",
    label: "menu.slots",
    icon: "bi bi-grid-3x3-gap",
    path: "/slots",
  },
  {
    key: "fishing",
    label: "menu.fishing",
    icon: "bi bi-water",
    path: "/fishing",
  },
  {
    key: "esports",
    label: "menu.esports",
    icon: "bi bi-controller",
    path: "/esports",
  },
  {
    key: "tournaments",
    label: "menu.tournaments",
    icon: "bi bi-trophy",
    path: "/tournaments",
  },
  {
    key: "vip",
    label: "menu.vip",
    icon: "bi bi-gem",
    path: "/vip",
  },
];
</script>
