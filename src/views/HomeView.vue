<template>
  <section class="home-page">
    <section class="hero-section">
      <button class="hero-arrow hero-arrow-left" type="button">
        <i class="bi bi-chevron-left"></i>
      </button>

      <div class="hero-copy">
        <div class="hero-label">{{ t("home.welcomeBonus") }}</div>
        <h1>{{ t("home.bonusTitle") }}</h1>
        <button class="hero-button" type="button">
          {{ t("home.joinNow") }}
        </button>
      </div>

      <div class="hero-players">
        <div class="player player-one"></div>
        <div class="player player-two"></div>
        <div class="player player-three"></div>
      </div>

      <button class="hero-arrow hero-arrow-right" type="button">
        <i class="bi bi-chevron-right"></i>
      </button>

      <div class="hero-dots">
        <span class="active"></span>
        <span></span>
      </div>
    </section>

    <section class="category-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="category-tab"
      >
        <i :class="tab.icon"></i>
        <span>{{ t(tab.label) }}</span>
      </button>
    </section>

    <section class="game-section">
      <div class="section-header">
        <h2>{{ t("home.topGames") }}</h2>
        <button type="button">
          {{ t("common.seeAll") }} (708)
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <div class="game-grid">
        <article
          v-for="game in games"
          :key="game.id"
          class="game-card"
        >
          <div class="game-badge" v-if="game.badge">
            {{ game.badge }}
          </div>

          <div class="game-image" :class="game.theme">
            <div class="game-title">{{ game.title }}</div>
          </div>

          <div class="game-overlay">
            <button type="button">
              <i class="bi bi-play-fill"></i>
            </button>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
    badge: "new",
    theme: "theme-cyan",
  },
  {
    id: 2,
    title: "Book Of Ra",
    badge: "",
    theme: "theme-brown",
  },
  {
    id: 3,
    title: "100 Super Hot",
    badge: "",
    theme: "theme-red",
  },
  {
    id: 4,
    title: "Coin Spark",
    badge: "",
    theme: "theme-volcano",
  },
  {
    id: 5,
    title: "Hot Step 2",
    badge: "new",
    theme: "theme-orange",
  },
  {
    id: 6,
    title: "Coin Win",
    badge: "new",
    theme: "theme-blue",
  },
  {
    id: 7,
    title: "Thunder Max",
    badge: "",
    theme: "theme-purple",
  },
];
</script>