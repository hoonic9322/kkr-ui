<template>
  <section class="sport-lobby-page">
    <div class="sport-lobby-container">
      <!-- Top Banner -->
      <section class="sport-lobby-hero">
        <img
          src="/images/banners/slot-lobby-banner.png"
          alt="Sport Lobby Banner"
          class="sport-lobby-hero-img"
        />

        <div class="sport-lobby-hero-overlay"></div>
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
    titleKey: "sportLobby.providers.cmdTitle",
    descKey: "sportLobby.providers.cmdDesc",
    tagKey: "sportLobby.tags.recommend",
    shortName: "CMD",
    imageUrl: "/images/sports/sport-provider-2.png",
    logoUrl: "/images/providers/cmd-logo.png",
    tags: ["recommend"],
  },
  {
    id: 3,
    category: "basketball",
    titleKey: "sportLobby.providers.sboTitle",
    descKey: "sportLobby.providers.sboDesc",
    tagKey: "sportLobby.tags.live",
    shortName: "SBO",
    imageUrl: "/images/sports/sport-provider-3.png",
    logoUrl: "/images/providers/sbo-logo.png",
    tags: ["hot"],
  },
  {
    id: 4,
    category: "tennis",
    titleKey: "sportLobby.providers.btTitle",
    descKey: "sportLobby.providers.btDesc",
    tagKey: "sportLobby.tags.new",
    shortName: "BT",
    imageUrl: "/images/sports/sport-provider-4.png",
    logoUrl: "",
    tags: [],
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
