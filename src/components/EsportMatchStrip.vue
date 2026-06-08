<template>
  <section class="esport-strip">
    <div class="esport-top-line">
      

      <div class="esport-main-nav">
        <button
          v-for="item in navItems"
          :key="item.key"
          type="button"
          class="esport-nav-item"
          :class="{ active: item.key === 'matches' }"
        >
          {{ t(item.label) }}
        </button>
      </div>
    </div>

    <div class="esport-cards-row">
      <article
        v-for="match in matches"
        :key="match.id"
        class="match-card"
        :class="match.theme"
      >
        <div class="match-header">
          <div>
            <div class="match-title">{{ match.title }}</div>
            <div class="match-meta">
              {{ match.time }} | BO{{ match.bo }} | {{ t("esport.mapWinner") }}
            </div>
          </div>

          <span class="match-status">Inplay</span>
        </div>

        <div class="match-versus">
          <div class="team-logo">{{ match.homeLogo }}</div>
          <div class="vs-text">VS</div>
          <div class="team-logo">{{ match.awayLogo }}</div>
        </div>

        <div class="match-team-row">
          <div class="team-name">{{ match.home }}</div>
          <div class="team-name right">{{ match.away }}</div>
        </div>

        <div class="match-odds-row">
          <button type="button" class="odds-box">{{ match.homeOdd }}</button>
          <button type="button" class="odds-box">{{ match.awayOdd }}</button>
        </div>
      </article>
    </div>

    <div class="esport-tab-bar">
      <div class="esport-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="esport-tab"
          :class="{ active: tab.key === 'inplay' }"
        >
          {{ t(tab.label) }} {{ tab.count }}
        </button>
      </div>

      <div class="esport-actions">
        <button type="button" class="esport-action-btn hot">
          <i class="bi bi-lightning-charge-fill"></i>
          {{ t("esport.hotBetting") }}
        </button>

        <button type="button" class="esport-action-btn">
          <i class="bi bi-trophy-fill"></i>
          {{ t("esport.masterRankings") }}
        </button>

        <button type="button" class="esport-action-btn lucky">
          <i class="bi bi-clover-fill"></i>
          {{ t("esport.luckyCombo") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const navItems = [
  { key: "matches", label: "esport.matches" },
  { key: "results", label: "esport.results" },
  { key: "rules", label: "esport.rules" },
];

const tabs = [
  { key: "today", label: "esport.today", count: "(2)" },
  { key: "inplay", label: "esport.inplay", count: "(0)" },
  { key: "early", label: "esport.early", count: "(1)" },
  { key: "combo", label: "esport.combo", count: "(1)" },
  { key: "outright", label: "esport.outright", count: "(0)" },
];

const matches = [
  {
    id: 1,
    title: "2026 League of Legends",
    time: "15:10",
    bo: 5,
    home: "KT Rolster",
    away: "Dplus KIA",
    homeLogo: "KT",
    awayLogo: "DK",
    homeOdd: "1.86",
    awayOdd: "1.92",
    theme: "blue",
  },
  {
    id: 2,
    title: "2026 BLAST Slam 7",
    time: "16:00",
    bo: 3,
    home: "BetBoom",
    away: "ex-HEROIC",
    homeLogo: "BB",
    awayLogo: "HX",
    homeOdd: "1.56",
    awayOdd: "2.38",
    theme: "red",
  },
  {
    id: 3,
    title: "2026 League Cup",
    time: "16:00",
    bo: 5,
    home: "TOP Esports",
    away: "Team WE",
    homeLogo: "TOP",
    awayLogo: "WE",
    homeOdd: "1.50",
    awayOdd: "2.53",
    theme: "blue",
  },
  {
    id: 4,
    title: "2026 Intel Masters",
    time: "19:30",
    bo: 1,
    home: "Monte",
    away: "Aurora",
    homeLogo: "MT",
    awayLogo: "AR",
    homeOdd: "2.69",
    awayOdd: "1.45",
    theme: "dark",
  },
];
</script>