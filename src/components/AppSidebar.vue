<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <RouterLink v-if="!collapsed" to="/" class="brand">
        <img src="/images/logo.png" alt="K8 Logo" class="brand-logo" />
      </RouterLink>

      <RouterLink v-else to="/" class="brand-mini">K8</RouterLink>
    </div>

    <nav class="sidebar-menu">
      <template v-for="item in menuItems" :key="item.key">
        <div v-if="item.type === 'divider'" class="sidebar-menu-divider"></div>

        <RouterLink
          v-else
          :to="item.path"
          class="sidebar-item"
          :class="{
            active: isActiveMenu(item),
          }"
        >
          <img
            v-if="item.logo"
            :src="item.logo"
            :alt="t(item.label)"
            class="sidebar-item-logo"
          />

          <i v-else :class="item.icon"></i>

          <span v-if="!collapsed">
            {{ t(item.label) }}
          </span>

          <em
            v-if="item.featured && !collapsed"
            class="sidebar-svg-fire"
            aria-hidden="true"
          >
            <svg viewBox="0 0 125 190" xmlns="http://www.w3.org/2000/svg">
              <path
                class="sidebar-flame-main"
                fill="#F36E21"
                d="M76.553,186.09c0,0-10.178-2.976-15.325-8.226s-9.278-16.82-9.278-16.82s-0.241-6.647-4.136-18.465c0,0,3.357,4.969,5.103,9.938c0,0-5.305-21.086,1.712-30.418c7.017-9.333,0.571-35.654-2.25-37.534c0,0,13.07,5.64,19.875,47.54c6.806,41.899,16.831,45.301,6.088,53.985"
              />

              <path
                class="sidebar-flame-main one"
                fill="#F6891F"
                d="M61.693,122.257c4.117-15.4,12.097-14.487-11.589-60.872c0,0,32.016,10.223,52.601,63.123c20.585,52.899-19.848,61.045-19.643,61.582c0.206,0.537-19.401-0.269-14.835-18.532S57.576,137.656,61.693,122.257z"
              />

              <path
                class="sidebar-flame-main two"
                fill="#FFD04A"
                d="M81.657,79.192c0,0,11.549,24.845,3.626,40.02c-7.924,15.175-21.126,41.899-0.425,64.998C84.858,184.21,125.705,150.905,81.657,79.192z"
              />

              <path
                class="sidebar-flame-main three"
                fill="#FDBA16"
                d="M99.92,101.754c0,0-23.208,47.027-12.043,80.072c0,0,32.741-16.073,20.108-45.79C95.354,106.319,99.92,114.108,99.92,101.754z"
              />

              <path
                class="sidebar-flame-main four"
                fill="#F36E21"
                d="M103.143,105.917c0,0,8.927,30.753-1.043,46.868c-9.969,16.115-14.799,29.041-14.799,29.041S134.387,164.603,103.143,105.917z"
              />

              <path
                class="sidebar-flame-main five"
                fill="#FDBA16"
                d="M62.049,104.171c0,0-15.645,67.588,10.529,77.655C98.753,191.894,69.033,130.761,62.049,104.171z"
              />

              <path
                class="sidebar-flame-fly"
                fill="#F36E21"
                d="M101.011,112.926c0,0,8.973,10.519,4.556,16.543C99.37,129.735,106.752,117.406,101.011,112.926z"
              />

              <path
                class="sidebar-flame-fly one"
                fill="#F36E21"
                d="M55.592,126.854c0,0-3.819,13.29,2.699,16.945C64.038,141.48,55.907,132.263,55.592,126.854z"
              />

              <path
                class="sidebar-flame-fly two"
                fill="#F36E21"
                d="M54.918,104.595c0,0-3.959,6.109-1.24,8.949C56.93,113.256,52.228,107.329,54.918,104.595z"
              />
            </svg>
          </em>
        </RouterLink>
      </template>
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
  if (!item.path) {
    return false;
  }

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
    key: "divider-after-promotions",
    type: "divider",
  },
  {
    key: "home",
    label: "menu.home",
    icon: "bi bi-house-door",
    path: "/",
  },
  {
    key: "divider-after-home",
    type: "divider",
  },
  {
    key: "tgLive",
    label: "menu.tgLive",
    icon: "bi bi-camera-video",
    logo: "/images/providers/tg-logo.png",
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
    key: "divider-after-games",
    type: "divider",
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