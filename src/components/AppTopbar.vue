<template>
  <header class="topbar">
    <div class="topbar-left">
      <button
        class="topbar-menu-button"
        type="button"
        @click="$emit('toggle-sidebar')"
      >
        <i class="bi bi-layout-sidebar-inset"></i>
      </button>

      <div v-if="showAnnouncement" class="topbar-announcement">
        <button
          class="topbar-announcement-toggle"
          type="button"
          title="Hide announcement"
          @click="showAnnouncement = false"
        >
          <i class="bi bi-megaphone-fill"></i>
        </button>

        <div class="topbar-announcement-track">
          <div class="topbar-announcement-content">
            <span>{{ t("esport.notice") }}</span>
            <span>{{ t("esport.notice") }}</span>
            <span>{{ t("esport.notice") }}</span>
          </div>
        </div>
      </div>

      <button
        v-else
        class="topbar-announcement-restore"
        type="button"
        title="Show announcement"
        @click="showAnnouncement = true"
      >
        <i class="bi bi-megaphone"></i>
      </button>
    </div>

    <div class="topbar-right">
      <button
        class="platform-btn topbar-action-btn topbar-login-theme-btn"
        type="button"
        @click="showLoginModal = true"
      >
        <i class="bi bi-key-fill"></i>
        {{ t("common.login") }}
      </button>

      <button
        class="platform-btn topbar-action-btn topbar-register-theme-btn"
        type="button"
        @click="showRegisterModal = true"
      >
        <i class="bi bi-person-plus-fill"></i>
        {{ t("common.register") }}
      </button>

      <!-- Theme Setting -->
      <div ref="themeSettingRef" class="theme-setting-selector">
        <button
          type="button"
          class="theme-setting-button"
          title="Theme Setting"
          @click="toggleThemeSettingMenu"
        >
          <i class="bi bi-palette-fill"></i>
        </button>

        <div v-if="showThemeSettingMenu" class="theme-setting-menu">
          <!-- Display Mode -->
          <div class="theme-setting-section">
            <div class="theme-setting-title">
              {{ t("theme.displayMode") }}
            </div>

            <button
              v-for="mode in displayModeOptions"
              :key="mode.key"
              type="button"
              class="theme-setting-item"
              :class="{ active: displayMode === mode.key }"
              @click="setDisplayMode(mode.key)"
            >
              <i :class="mode.icon"></i>
              <span>{{ t(mode.labelKey) }}</span>
            </button>
          </div>

          <div class="theme-setting-divider"></div>

          <!-- Theme Color -->
          <div class="theme-setting-section">
            <div class="theme-setting-title">
              {{ t("theme.themeColor") }}
            </div>

            <div class="theme-color-swatch-row">
              <button
                v-for="theme in themeColorOptions"
                :key="theme.key"
                type="button"
                class="theme-color-swatch"
                :class="{ active: currentThemeKey === theme.key }"
                :title="theme.label"
                @click="setThemeColor(theme.key)"
              >
                <span
                  class="theme-color-swatch-dot"
                  :style="{ background: theme.accent }"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref="languageSelectorRef" class="language-selector">
        <button
          type="button"
          class="language-button"
          @click="toggleLanguageMenu"
        >
          <img
            class="language-flag-img"
            :src="
              currentLocale === 'en'
                ? '/images/flags/us.png'
                : '/images/flags/cn.png'
            "
            alt=""
          />

          <span class="language-code">
            {{ currentLocale === "en" ? "ENG" : "中文" }}
          </span>

          <i class="bi bi-chevron-down"></i>
        </button>

        <div v-if="showLanguageMenu" class="language-menu">
          <button
            type="button"
            class="language-menu-item"
            :class="{ active: currentLocale === 'en' }"
            @click="setLanguage('en')"
          >
            <img
              class="language-menu-flag-img"
              src="/images/flags/us.png"
              alt=""
            />
            <span class="language-menu-text">ENG</span>
          </button>

          <button
            type="button"
            class="language-menu-item"
            :class="{ active: currentLocale === 'zh' }"
            @click="setLanguage('zh')"
          >
            <img
              class="language-menu-flag-img"
              src="/images/flags/cn.png"
              alt=""
            />
            <span class="language-menu-text">中文</span>
          </button>
        </div>
      </div>
    </div>

    <LoginModal
      v-model="showLoginModal"
      @switch-register="openRegisterFromLogin"
    />

    <RegisterModal
      v-model="showRegisterModal"
      @switch-login="openLoginFromRegister"
    />
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import LoginModal from "./LoginModal.vue";
import RegisterModal from "./RegisterModal.vue";

defineEmits(["toggle-sidebar"]);

const { t, locale } = useI18n();

const showLanguageMenu = ref(false);
const showThemeSettingMenu = ref(false);
const showAnnouncement = ref(true);
const showLoginModal = ref(false);
const showRegisterModal = ref(false);

const themeSettingRef = ref(null);
const languageSelectorRef = ref(null);

const currentLocale = computed(() => locale.value);

/* =========================================================
   Display Mode
   ========================================================= */

const displayMode = ref(localStorage.getItem("kkrr_display_mode") || "dark");

const displayModeOptions = [
  {
    key: "dark",
    labelKey: "theme.darkMode",
    icon: "bi bi-moon-stars-fill",
  },
  {
    key: "light",
    labelKey: "theme.lightMode",
    icon: "bi bi-sun-fill",
  },
];

function applyDisplayMode(mode) {
  document.documentElement.setAttribute("data-display-mode", mode);
}

function setDisplayMode(mode) {
  displayMode.value = mode;
  localStorage.setItem("kkrr_display_mode", mode);
  applyDisplayMode(mode);
}

/* =========================================================
   Theme Color
   ========================================================= */

function getInitialThemeKey() {
  const savedTheme = localStorage.getItem("kkrr_theme_color") || "lime";

  // Migration: old cyan option is now red.
  if (savedTheme === "cyan") {
    localStorage.setItem("kkrr_theme_color", "red");
    return "red";
  }

  return savedTheme;
}

const currentThemeKey = ref(getInitialThemeKey());

const themeColorOptions = [
  {
    key: "lime",
    label: "Green",
    accent: "#1f8f4e",
    accentDark: "#0d2f1a",
    cyan: "#1f8f4e",
    cyanSoft: "rgba(31, 143, 78, 0.16)",
    buttonText: "#ffffff",
  },
  {
    key: "gold",
    label: "Gold",
    accent: "#ffc21e",
    accentDark: "#4a3200",
    cyan: "#21e6ff",
    cyanSoft: "rgba(33, 230, 255, 0.16)",
    buttonText: "#101827",
  },
  {
    key: "red",
    label: "Red",
    accent: "#e61932",
    accentDark: "#4a0710",
    cyan: "#e61932",
    cyanSoft: "rgba(230, 25, 50, 0.16)",
    buttonText: "#ffffff",
  },
  {
    key: "purple",
    label: "Dark Blue",
    accent: "#2f6bff",
    accentDark: "#0f245c",
    cyan: "#2f6bff",
    cyanSoft: "rgba(47, 107, 255, 0.16)",
    buttonText: "#ffffff",
  },
];

function applyThemeColor(theme) {
  const root = document.documentElement;

  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-dark", theme.accentDark);
  root.style.setProperty("--cyan", theme.cyan);
  root.style.setProperty("--cyan-soft", theme.cyanSoft);
  root.style.setProperty("--theme-button-text", theme.buttonText);
}

function setThemeColor(themeKey) {
  const theme = themeColorOptions.find((item) => item.key === themeKey);

  if (!theme) {
    return;
  }

  currentThemeKey.value = theme.key;
  localStorage.setItem("kkrr_theme_color", theme.key);
  applyThemeColor(theme);
}

/* =========================================================
   Menu Actions
   ========================================================= */

function toggleLanguageMenu() {
  showLanguageMenu.value = !showLanguageMenu.value;

  if (showLanguageMenu.value) {
    showThemeSettingMenu.value = false;
  }
}

function toggleThemeSettingMenu() {
  showThemeSettingMenu.value = !showThemeSettingMenu.value;

  if (showThemeSettingMenu.value) {
    showLanguageMenu.value = false;
  }
}

function setLanguage(language) {
  locale.value = language;
  localStorage.setItem("kkrr_locale", language);
  showLanguageMenu.value = false;
}

/* =========================================================
   Click Outside / ESC Close
   ========================================================= */

function handleGlobalPointerDown(event) {
  const target = event.target;

  const clickedInsideTheme =
    themeSettingRef.value && themeSettingRef.value.contains(target);

  const clickedInsideLanguage =
    languageSelectorRef.value && languageSelectorRef.value.contains(target);

  if (!clickedInsideTheme) {
    showThemeSettingMenu.value = false;
  }

  if (!clickedInsideLanguage) {
    showLanguageMenu.value = false;
  }
}

function handleGlobalKeydown(event) {
  if (event.key !== "Escape") {
    return;
  }

  showThemeSettingMenu.value = false;
  showLanguageMenu.value = false;
}

/* =========================================================
   Login / Register Modal Switch
   ========================================================= */

function openRegisterFromLogin() {
  showLoginModal.value = false;
  showRegisterModal.value = true;
}

function openLoginFromRegister() {
  showRegisterModal.value = false;
  showLoginModal.value = true;
}

/* =========================================================
   Init
   ========================================================= */

onMounted(() => {
  applyDisplayMode(displayMode.value);

  const savedTheme =
    themeColorOptions.find((item) => item.key === currentThemeKey.value) ||
    themeColorOptions[0];

  currentThemeKey.value = savedTheme.key;
  localStorage.setItem("kkrr_theme_color", savedTheme.key);
  applyThemeColor(savedTheme);

  document.addEventListener("pointerdown", handleGlobalPointerDown);
  document.addEventListener("keydown", handleGlobalKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleGlobalPointerDown);
  document.removeEventListener("keydown", handleGlobalKeydown);
});
</script>
