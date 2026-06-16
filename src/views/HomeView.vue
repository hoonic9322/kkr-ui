<template>
  <section class="home-page">
    <!-- Hero Banner + Jackpot First -->
    <section class="home-hero-layout">
      <section
        class="hero-section"
        :class="[
          `hero-content-${activeHeroBanner.contentSide}`,
          { 'hero-no-copy': activeHeroBanner.contentSide === 'hidden' },
        ]"
        @mouseenter="stopHeroAutoPlay"
        @mouseleave="startHeroAutoPlay"
      >
        <transition name="hero-fade" mode="out-in">
          <img
            :key="activeHeroBanner.id"
            :src="activeHeroBanner.imageUrl"
            :alt="t(activeHeroBanner.titleKey)"
            class="hero-bg-image"
            :style="{ objectPosition: activeHeroBanner.imagePosition }"
          />
        </transition>

        <div class="hero-bg-overlay"></div>

        <button
          class="hero-arrow hero-arrow-left"
          type="button"
          @click="previousHeroBanner"
        >
          <i class="bi bi-chevron-left"></i>
        </button>

        <div v-if="activeHeroBanner.contentSide !== 'hidden'" class="hero-copy">
          <p>{{ t(activeHeroBanner.subtitleKey) }}</p>
          <h1>{{ t(activeHeroBanner.titleKey) }}</h1>

          <div class="hero-action-row">
            <button type="button" class="platform-btn primary lg hero-cta">
              {{ t(activeHeroBanner.primaryButtonKey) }}
            </button>
          </div>
        </div>

        <button
          class="hero-arrow hero-arrow-right"
          type="button"
          @click="nextHeroBanner"
        >
          <i class="bi bi-chevron-right"></i>
        </button>

        <div class="hero-dots">
          <button
            v-for="(banner, index) in heroBanners"
            :key="banner.id"
            type="button"
            :class="{ active: index === activeHeroIndex }"
            @click="goToHeroBanner(index)"
          ></button>
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

import TournamentSection from "../components/home/TournamentSection.vue";
import TGCasinoSection from "../components/home/TGCasinoSection.vue";
import PromotionSection from "../components/home/PromotionSection.vue";
import SlotSection from "../components/home/SlotSection.vue";
import SportSection from "../components/home/SportSection.vue";
import LiveCasinoSection from "../components/home/LiveCasinoSection.vue";
import Footer from "../components/Footer.vue";

const { t } = useI18n();

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
    contentSide: "left",
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

const jackpots = [
  {
    id: 1,
    name: "Mega Fortune",
    provider: "Slot",
    amount: "€2.8M",
  },
  {
    id: 2,
    name: "Baccarat King",
    provider: "Live",
    amount: "€918K",
  },
  {
    id: 3,
    name: "Lucky Spin",
    provider: "Arcade",
    amount: "€305K",
  },
];

const tabs = [
  {
    key: "providers",
    label: "home.providers",
    icon: "bi bi-layers",
  },
  {
    key: "top",
    label: "home.top",
    icon: "bi bi-crown",
  },
  {
    key: "new",
    label: "home.new",
    icon: "bi bi-lightning-charge",
  },
  {
    key: "popular",
    label: "home.popular",
    icon: "bi bi-fire",
  },
  {
    key: "exclusive",
    label: "home.exclusive",
    icon: "bi bi-gem",
  },
  {
    key: "topLiveCasino",
    label: "home.topLiveCasino",
    icon: "bi bi-phone",
  },
  {
    key: "roulette",
    label: "home.roulette",
    icon: "bi bi-life-preserver",
  },
  {
    key: "gameShows",
    label: "home.gameShows",
    icon: "bi bi-mic",
  },
  {
    key: "blackjack",
    label: "home.blackjack",
    icon: "bi bi-window",
  },
];

const games = [
  {
    id: 1,
    title: "Piggy Banks",
    provider: "Slot",
    badge: "new",
    theme: "theme-cyan",
  },
  {
    id: 2,
    title: "Book Of Ra",
    provider: "Classic",
    badge: "",
    theme: "theme-brown",
  },
  {
    id: 3,
    title: "100 Super Hot",
    provider: "Jackpot",
    badge: "",
    theme: "theme-red",
  },
  {
    id: 4,
    title: "Coin Spark",
    provider: "Arcade",
    badge: "",
    theme: "theme-volcano",
  },
  {
    id: 5,
    title: "Hot Step 2",
    provider: "New",
    badge: "new",
    theme: "theme-orange",
  },
  {
    id: 6,
    title: "Coin Win",
    provider: "Bonus",
    badge: "new",
    theme: "theme-blue",
  },
  {
    id: 7,
    title: "Thunder Max",
    provider: "Exclusive",
    badge: "",
    theme: "theme-purple",
  },
];

const liveTables = [
  {
    id: 1,
    name: "Speed Baccarat",
    type: "Baccarat",
    limit: "$10 - $5,000",
  },
  {
    id: 2,
    name: "Lightning Roulette",
    type: "Roulette",
    limit: "$1 - $2,000",
  },
  {
    id: 3,
    name: "VIP Blackjack",
    type: "Blackjack",
    limit: "$20 - $10,000",
  },
  {
    id: 4,
    name: "Mega Sic Bo",
    type: "Sic Bo",
    limit: "$5 - $3,000",
  },
];
</script>
