<template>
  <header class="topbar">
    <div class="topbar-left">
      <button class="topbar-menu-button" type="button" @click="$emit('toggle-sidebar')">
        <i class="bi bi-layout-sidebar-inset"></i>
      </button>

      <div class="topbar-logo">
        <span class="logo-star">★</span>
        <span>SPORTUNA</span>
      </div>
    </div>

    <div class="topbar-right">
      <div class="topbar-search">
        <i class="bi bi-search"></i>
        <input type="text" :placeholder="t('common.searchPlaceholder')" />
      </div>

      <button class="outline-button" type="button">
        {{ t("common.login") }}
      </button>

      <button class="primary-button" type="button">
        {{ t("common.register") }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from "vue-i18n";

defineEmits(["toggle-sidebar"]);

const { t } = useI18n();
</script>