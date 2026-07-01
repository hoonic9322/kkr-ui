<template>
  <section class="home-page">
    <!-- Hero Banner + Jackpot First -->
    <section class="home-hero-layout">
      <section class="hero-section" :class="[
        `hero-content-${activeHeroBanner.contentSide}`,
        { 'hero-no-copy': activeHeroBanner.contentSide === 'hidden' },
      ]" @mouseenter="stopHeroAutoPlay" @mouseleave="startHeroAutoPlay">
        <transition name="hero-fade" mode="out-in">
          <img :key="activeHeroBanner.id" :src="getPublicImage(activeHeroBanner.imageUrl)"
            :alt="t(activeHeroBanner.titleKey)" class="hero-bg-image"
            :style="{ objectPosition: activeHeroBanner.imagePosition }" />
        </transition>

        <div class="hero-bg-overlay"></div>

        <button class="hero-arrow hero-arrow-left" type="button" @click="previousHeroBanner">
          <i class="bi bi-chevron-left"></i>
        </button>

        <div v-if="activeHeroBanner.contentSide !== 'hidden'" class="hero-copy">
          <p>{{ t(activeHeroBanner.subtitleKey) }}</p>
          <h1>{{ t(activeHeroBanner.titleKey) }}</h1>

          <div class="hero-action-row">
            <button type="button" class="platform-btn lg hero-cta hero-theme-btn">
              {{ t(activeHeroBanner.primaryButtonKey) }}
            </button>
          </div>
        </div>

        <button class="hero-arrow hero-arrow-right" type="button" @click="nextHeroBanner">
          <i class="bi bi-chevron-right"></i>
        </button>

        <div class="hero-dots">
          <button v-for="(banner, index) in heroBanners" :key="banner.id" type="button"
            :class="{ active: index === activeHeroIndex }" @click="goToHeroBanner(index)"></button>
        </div>
      </section>

      <!-- Reserved Right Tournament Section -->
      <aside class="jackpot-panel">
        <TournamentSection />
      </aside>
    </section>
    <!-- TG Casino Section -->
    <TGCasinoSection />
    <!-- Promotion Section -->
    <PromotionSection />
    <!-- Slot Section -->
    <SlotSection />
    <!-- Sport Section -->
    <SportSection />
    <!-- Live Casino Section -->
    <LiveCasinoSection />
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { getPublicImage } from "../utils/imagePath";

import TournamentSection from "../components/home/TournamentSection.vue";
import TGCasinoSection from "../components/home/TGCasinoSection.vue";
import PromotionSection from "../components/home/PromotionSection.vue";
import SlotSection from "../components/home/SlotSection.vue";
import SportSection from "../components/home/SportSection.vue";
import LiveCasinoSection from "../components/home/LiveCasinoSection.vue";
import Footer from "../components/Footer.vue";

const { t } = useI18n();

const asset = (path) => {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
};

/**
 * Banner ratio: 5:3
 * Image size example: 2500 x 1500
 *
 * contentSide:
 * - "right": text on right, good when model/object is on left
 * - "left": text on left, good when model/object is on right
 * - "center": text in center
 * - "hidden": no text, good when banner image already has text
 *
 * imagePosition:
 * - "center center": default
 * - "left center": keep left subject visible
 * - "right center": keep right subject visible
 *
 * Note:
 * After adding the right jackpot section, the banner area becomes narrower.
 * Use imagePosition to protect the important object/model from being cropped.
 */
const heroBanners = [
  {
    id: 1,
    imageUrl: "/images/banners/banner1.png",
    titleKey: "home.bonusTitle",
    subtitleKey: "home.welcomeBonus",
    primaryButtonKey: "home.joinNow",
    contentSide: "right",
    imagePosition: "right center",
  },
  {
    id: 2,
    imageUrl: "/images/banners/banner2.png",
    titleKey: "home.casinoBannerTitle",
    subtitleKey: "home.casinoBannerSubtitle",
    primaryButtonKey: "home.playNow",
    contentSide: "right",
    imagePosition: "left center",
  },
  {
    id: 3,
    imageUrl: "/images/banners/banner3.png",
    titleKey: "home.esportBannerTitle",
    subtitleKey: "home.esportBannerSubtitle",
    primaryButtonKey: "home.joinNow",
    contentSide: "left",
    imagePosition: "center center",
  },
];

const activeHeroIndex = ref(0);
let heroTimer = null;

const activeHeroBanner = computed(() => {
  return heroBanners[activeHeroIndex.value] || heroBanners[0];
});

const goToHeroBanner = (index) => {
  activeHeroIndex.value = index;
};

const nextHeroBanner = () => {
  activeHeroIndex.value =
    activeHeroIndex.value >= heroBanners.length - 1
      ? 0
      : activeHeroIndex.value + 1;
};

const previousHeroBanner = () => {
  activeHeroIndex.value =
    activeHeroIndex.value <= 0
      ? heroBanners.length - 1
      : activeHeroIndex.value - 1;
};

const startHeroAutoPlay = () => {
  stopHeroAutoPlay();

  if (heroBanners.length <= 1) {
    return;
  }

  heroTimer = window.setInterval(() => {
    nextHeroBanner();
  }, 5000);
};

const stopHeroAutoPlay = () => {
  if (heroTimer) {
    window.clearInterval(heroTimer);
    heroTimer = null;
  }
};

onMounted(() => {
  startHeroAutoPlay();
});

onBeforeUnmount(() => {
  stopHeroAutoPlay();
});

</script>
