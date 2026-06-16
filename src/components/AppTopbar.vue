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
      <button class="platform-btn secondary topbar-action-btn" type="button">
        <i class="bi bi-key-fill"></i>
        {{ t("common.login") }}
      </button>

      <button
        class="platform-btn primary topbar-action-btn"
        type="button"
        @click="showRegisterModal = true"
      >
        <i class="bi bi-person-plus-fill"></i>
        {{ t("common.register") }}
      </button>

      <div class="language-selector">
        <button
          type="button"
          class="language-button"
          @click="showLanguageMenu = !showLanguageMenu"
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

    <RegisterModal v-model="showRegisterModal" />
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import RegisterModal from "./RegisterModal.vue";

defineEmits(["toggle-sidebar"]);

const { t, locale } = useI18n();

const showLanguageMenu = ref(false);
const showAnnouncement = ref(true);
const showRegisterModal = ref(false);

const currentLocale = computed(() => locale.value);

function setLanguage(language) {
  locale.value = language;
  localStorage.setItem("kkrr_locale", language);
  showLanguageMenu.value = false;
}
</script>