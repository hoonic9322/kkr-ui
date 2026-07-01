<template>
  <section class="live-casino-lobby-page">
    <div class="live-casino-lobby-container">
      <!-- Top Banner -->
      <section class="live-casino-lobby-hero">
        <img :src="getPublicImage('/images/banners/live-casino-lobby-banner.png')" alt="Live Casino Lobby Banner"
          class="live-casino-lobby-hero-img" />
        <div class="promotion-hero-overlay"></div>
        <div class="live-casino-lobby-hero-overlay"></div>
      </section>

      <!-- Live Casino Panel -->
      <section class="live-casino-lobby-panel">
        <div class="live-casino-provider-grid">
          <article v-for="provider in liveCasinoProviders" :key="provider.id" class="live-casino-provider-card">
            <div class="live-casino-provider-image">
              <img :src="getPublicImage(provider.imageUrl)" :alt="t(provider.titleKey)" class="live-casino-provider-img"
                loading="lazy" />

              <div class="live-casino-provider-shade"></div>

              <div class="live-casino-provider-logo">
                <img v-if="provider.logoUrl" :src="getPublicImage(provider.logoUrl)" :alt="t(provider.titleKey)" />

                <span v-else>
                  {{ provider.shortName }}
                </span>
              </div>
            </div>

            <div class="live-casino-provider-body">
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
import { useI18n } from "vue-i18n";
import { getPublicImage } from "../utils/imagePath";

const { t } = useI18n();

const liveCasinoProviders = [
  {
    id: 1,
    titleKey: "liveCasinoLobby.providers.dgTitle",
    descKey: "liveCasinoLobby.providers.dgDesc",
    shortName: "DG",
    imageUrl: "/images/live-casino/dg-live-banner.png",
    logoUrl: "/images/providers/dg-logo.png",
  },
  {
    id: 2,
    titleKey: "liveCasinoLobby.providers.pmTitle",
    descKey: "liveCasinoLobby.providers.pmDesc",
    shortName: "PM",
    imageUrl: "/images/live-casino/pm-live-banner.png",
    logoUrl: "/images/providers/pm-logo.png",
  },
  {
    id: 3,
    titleKey: "liveCasinoLobby.providers.agTitle",
    descKey: "liveCasinoLobby.providers.agDesc",
    shortName: "AG",
    imageUrl: "/images/live-casino/ag-live-banner.png",
    logoUrl: "/images/providers/ag-logo.png",
  },
];
</script>
