<template>
  <section class="tournament-card">
    <!-- Tournament Header -->
    <div class="tournament-image-header">
      <img
        :src="tournamentWordImage"
        :alt="tournamentAltText"
        class="tournament-header-word"
        :class="{ 'is-zh': isZh }"
      />
    </div>

    <!-- Tournament Date -->
    <!-- Tournament Date -->
    <div class="tournament-date-bar">
      <div class="tournament-date-pill">
        {{ tournamentDateText }}
      </div>
    </div>

    <!-- Ranking Table -->
    <div class="tournament-simple-table">
      <div class="tournament-simple-head">
        <span>{{ t("tournament.rank") }}</span>
        <span>{{ t("tournament.username") }}</span>
        <span>{{ t("tournament.points") }}</span>
      </div>

      <div class="tournament-simple-viewport">
        <div class="tournament-simple-list">
          <div
            v-for="item in rankingList"
            :key="`${item.rank}-${item.username}`"
            class="tournament-simple-row"
          >
            <span class="tournament-simple-rank">
              {{ String(item.rank).padStart(2, "0") }}
            </span>

            <span class="tournament-simple-name">
              {{ item.username }}
            </span>

            <span class="tournament-simple-points">
              {{ formatPoints(item.points) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const isZh = computed(() => String(locale.value).startsWith("zh"));

const tournamentWordImage = computed(() => {
  return isZh.value
    ? "/images/tournament/tournament-word-zh.png"
    : "/images/tournament/tournament-word-en.png";
});

const tournamentAltText = computed(() => {
  return isZh.value ? "争霸赛" : "Tournament";
});

const tournamentStartDate = "2026.06.01";
const tournamentEndDate = "2026.06.30";

const tournamentDateText = computed(() => {
  return isZh.value
    ? `活动时间：${tournamentStartDate} - ${tournamentEndDate}`
    : `Tournament Period: ${tournamentStartDate} - ${tournamentEndDate}`;
});

const rankingList = [
  { rank: 1, username: "m***27", points: 2073370 },
  { rank: 2, username: "m***01", points: 277049 },
  { rank: 3, username: "t***82", points: 255960 },
  { rank: 4, username: "m***88", points: 176483 },
  { rank: 5, username: "m***68", points: 156671 },
  { rank: 6, username: "m***15", points: 134233 },
  { rank: 7, username: "k***39", points: 126420 },
  { rank: 8, username: "a***76", points: 118590 },
  { rank: 9, username: "j***22", points: 112340 },
  { rank: 10, username: "p***41", points: 109870 },
  { rank: 11, username: "n***18", points: 103520 },
  { rank: 12, username: "q***55", points: 99810 },
  { rank: 13, username: "w***73", points: 95430 },
  { rank: 14, username: "s***09", points: 91760 },
  { rank: 15, username: "z***66", points: 88320 },
  { rank: 16, username: "h***14", points: 85200 },
  { rank: 17, username: "c***80", points: 82460 },
  { rank: 18, username: "x***37", points: 79620 },
  { rank: 19, username: "b***11", points: 77110 },
  { rank: 20, username: "r***29", points: 74580 },
];

function formatPoints(value) {
  return Number(value).toLocaleString("en-US");
}
</script>
