<template>
  <section class="live-showcase-page">

    <div class="live-showcase-container">
      <!-- Section Header -->
      <div class="live-showcase-head">
        <div class="live-showcase-left">
          <div class="live-showcase-title-wrap">
            <h2>{{ t("liveCasinoShowcase.title") }}</h2>
          </div>
        </div>

        <RouterLink to="/live-casino" class="live-showcase-lobby-btn">
          {{ t("liveCasinoShowcase.goLobby") }}
          <i class="bi bi-chevron-right"></i>
        </RouterLink>
      </div>

      <!-- Provider List -->
      <div class="live-showcase-grid">
        <article v-for="provider in filteredProviders" :key="provider.id" class="live-showcase-card">
          <div class="live-showcase-card-media">
            <img :src="getPublicImage(provider.imageUrl)" :alt="t(provider.titleKey)" class="live-showcase-card-img"
              loading="lazy" />

            <div class="live-showcase-card-shade"></div>

            <span v-if="provider.tagKey" class="live-showcase-badge">
              {{ t(provider.tagKey) }}
            </span>

            <div class="live-showcase-provider-logo">
              <img v-if="provider.logoUrl" :src="getPublicImage(provider.logoUrl)" :alt="provider.shortName" />

              <span v-else>
                {{ provider.shortName }}
              </span>
            </div>
          </div>

          <div class="live-showcase-card-body">
            <h3>{{ t(provider.titleKey) }}</h3>
            <p>{{ t(provider.descKey) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { getPublicImage } from "../../utils/imagePath";

const { t } = useI18n();

const activeTab = ref("all");

const tabs = [
  {
    key: "all",
    labelKey: "liveCasinoShowcase.tabs.all",
    icon: "bi bi-grid-3x3-gap-fill",
  },
  {
    key: "baccarat",
    labelKey: "liveCasinoShowcase.tabs.baccarat",
    icon: "bi bi-record-circle",
  },
  {
    key: "roulette",
    labelKey: "liveCasinoShowcase.tabs.roulette",
    icon: "bi bi-circle",
  },
  {
    key: "hot",
    labelKey: "liveCasinoShowcase.tabs.hot",
    icon: "bi bi-fire",
  },
];

const providers = [
  {
    id: 1,
    category: "baccarat",
    titleKey: "liveCasinoShowcase.providers.dgTitle",
    descKey: "liveCasinoShowcase.providers.dgDesc",
    tagKey: "liveCasinoShowcase.tags.hot",
    shortName: "DG",
    imageUrl: "/images/live-casino/dg-live-banner.png",
    logoUrl: "/images/providers/dg-logo.png",
    tags: ["hot"],
  },
  {
    id: 2,
    category: "baccarat",
    titleKey: "liveCasinoShowcase.providers.pmTitle",
    descKey: "liveCasinoShowcase.providers.pmDesc",
    tagKey: "liveCasinoShowcase.tags.recommend",
    shortName: "PM",
    imageUrl: "/images/live-casino/pm-live-banner.png",
    logoUrl: "/images/providers/pm-logo.png",
    tags: ["recommend"],
  },
  {
    id: 3,
    category: "roulette",
    titleKey: "liveCasinoShowcase.providers.agTitle",
    descKey: "liveCasinoShowcase.providers.agDesc",
    tagKey: "liveCasinoShowcase.tags.recommend",
    shortName: "AG",
    imageUrl: "/images/live-casino/ag-live-banner.png",
    logoUrl: "/images/providers/ag-logo.png",
    tags: ["hot", "recommend"],
  },
];

const filteredProviders = computed(() => {
  if (activeTab.value === "all") {
    return providers;
  }

  if (activeTab.value === "hot") {
    return providers.filter((provider) => provider.tags.includes("hot"));
  }

  return providers.filter((provider) => provider.category === activeTab.value);
});
</script>
