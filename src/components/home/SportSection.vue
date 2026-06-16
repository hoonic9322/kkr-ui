<template>
  <section class="sport-section">
    <div class="sport-section-head">
      <div class="sport-title-wrap">
        <h2>{{ t("sportSection.title") }}</h2>
      </div>
    </div>

    <div ref="sportCardsRowRef" class="sport-cards-row">
      <article
        v-for="match in matches"
        :key="match.id"
        class="sport-match-card"
        :class="match.theme"
      >
        <div class="sport-card-top">
          <div>
            <div class="sport-card-league">
              {{ match.league || match.title }}
            </div>

            <div class="sport-card-time">{{ match.date }} {{ match.time }}</div>
          </div>
        </div>

        <div class="sport-card-teams">
          <div class="sport-card-team home">
            <span class="sport-card-flag">{{ match.homeFlag }}</span>
            <span class="sport-card-name">{{ match.home }}</span>
          </div>

          <div class="sport-card-vs">VS</div>

          <div class="sport-card-team away">
            <span class="sport-card-flag">{{ match.awayFlag }}</span>
            <span class="sport-card-name">{{ match.away }}</span>
          </div>
        </div>

        <div class="sport-card-odds">
          <button
            v-for="odd in match.odds"
            :key="odd.key"
            type="button"
            class="sport-card-odd"
            :class="`is-${odd.key}`"
          >
            <span>{{ odd.label }}</span>
            <strong>{{ odd.value }}</strong>
          </button>
        </div>
      </article>
    </div>

    <div class="sport-carousel-control">
      <button
        type="button"
        class="sport-carousel-arrow"
        @click="scrollSports('left')"
      >
        <i class="bi bi-chevron-left"></i>
      </button>

      <span class="sport-carousel-track">
        <span class="sport-carousel-dot active"></span>
        <span class="sport-carousel-dot"></span>
        <span class="sport-carousel-dot"></span>
      </span>

      <button
        type="button"
        class="sport-carousel-arrow"
        @click="scrollSports('right')"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { sportMatches } from "../../data/sportMatches";

const { t } = useI18n();

const matches = sportMatches;
const sportCardsRowRef = ref(null);

function scrollSports(direction) {
  const row = sportCardsRowRef.value;

  if (!row) {
    return;
  }

  row.scrollBy({
    left: direction === "left" ? -360 : 360,
    behavior: "smooth",
  });
}
</script>
