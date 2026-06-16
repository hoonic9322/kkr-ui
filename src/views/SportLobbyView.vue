<template>
  <section class="sport-lobby-page">
    <div class="sport-lobby-container">
      <!-- Top Banner -->
      <section class="sport-lobby-hero">
        <img
          src="/images/banners/sport-lobby-banner.png"
          alt="Sport Lobby Banner"
          class="sport-lobby-hero-img"
        />

        <div class="sport-lobby-hero-overlay"></div>
        <div class="sport-hero-particles" aria-hidden="true">
          <span v-for="index in 24" :key="index"></span>
        </div>
      </section>

      <!-- Sport Panel -->
      <section class="sport-lobby-panel">
        <!-- Top Tabs -->

        <!-- Sport Provider Cards -->
        <div class="sport-provider-grid">
          <article
            v-for="provider in filteredProviders"
            :key="provider.id"
            class="sport-provider-card"
          >
            <div class="sport-provider-image">
              <img
                :src="provider.imageUrl"
                :alt="t(provider.titleKey)"
                class="sport-provider-img"
                loading="lazy"
              />

              <div class="sport-provider-shade"></div>

              <div class="sport-provider-logo">
                <img
                  v-if="provider.logoUrl"
                  :src="provider.logoUrl"
                  :alt="t(provider.titleKey)"
                />

                <span v-else>{{ provider.shortName }}</span>
              </div>
            </div>

            <div class="sport-provider-body">
              <h3>{{ t(provider.titleKey) }}</h3>
              <p>{{ t(provider.descKey) }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const activeTab = ref("all");

const sportTabs = [
  {
    key: "all",
    labelKey: "sportLobby.tabs.all",
    icon: "bi bi-grid-3x3-gap-fill",
  },
  {
    key: "football",
    labelKey: "sportLobby.tabs.football",
    icon: "bi bi-dribbble",
  },
  {
    key: "basketball",
    labelKey: "sportLobby.tabs.basketball",
    icon: "bi bi-record-circle",
  },
  {
    key: "tennis",
    labelKey: "sportLobby.tabs.tennis",
    icon: "bi bi-circle",
  },
  {
    key: "hot",
    labelKey: "sportLobby.tabs.hot",
    icon: "bi bi-fire",
  },
];

const sportProviders = [
  {
    id: 1,
    category: "football",
    titleKey: "sportLobby.providers.afbTitle",
    descKey: "sportLobby.providers.afbDesc",
    tagKey: "sportLobby.tags.hot",
    shortName: "AFB",
    imageUrl: "/images/sports/afb-banner.png",
    logoUrl: "/images/providers/afb-logo.png",
    tags: ["hot"],
  },
  {
    id: 2,
    category: "football",
    titleKey: "sportLobby.providers.pmTitle",
    descKey: "sportLobby.providers.pmDesc",
    tagKey: "sportLobby.tags.recommend",
    shortName: "PM",
    imageUrl: "/images/sports/pm-banner.png",
    logoUrl: "/images/providers/pm-logo.png",
    tags: ["recommend"],
  },
  {
    id: 3,
    category: "football",
    titleKey: "sportLobby.providers.aeTitle",
    descKey: "sportLobby.providers.aeDesc",
    tagKey: "sportLobby.tags.live",
    shortName: "AE",
    imageUrl: "/images/sports/ae-banner.png",
    logoUrl: "/images/providers/ae-logo.png",
    tags: ["hot"],
  },
];

const filteredProviders = computed(() => {
  if (activeTab.value === "all") {
    return sportProviders;
  }

  if (activeTab.value === "hot") {
    return sportProviders.filter((provider) => provider.tags.includes("hot"));
  }

  return sportProviders.filter((provider) => {
    return provider.category === activeTab.value;
  });
});
</script>
