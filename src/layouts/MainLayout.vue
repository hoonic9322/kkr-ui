<template>
  <div class="app-shell">
    <AppSidebar
      :collapsed="sidebarCollapsed"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
    />

    <div class="app-main" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <AppTopbar @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />

      <main class="page-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppSidebar from "../components/AppSidebar.vue";
import AppTopbar from "../components/AppTopbar.vue";

const sidebarCollapsed = ref(false);
</script>