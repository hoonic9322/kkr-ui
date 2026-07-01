<template>
  <section class="sport-section">
    <div class="sport-section-head">
      <div class="sport-title-wrap">
        <h2>{{ t("sportSection.title") }}</h2>
      </div>

      <RouterLink to="/sports" class="sport-lobby-btn">
        <span>{{ t("sportSection.goLobby") }}</span>
        <i class="bi bi-chevron-right"></i>
      </RouterLink>
    </div>

    <div ref="sportCardsRowRef" class="sport-cards-row">
      <article v-for="match in matches" :key="match.id" class="sport-match-card" :class="match.theme">
        <div class="sport-card-top">
          <div>
            <div class="sport-card-league">
              {{ match.league }}
            </div>

            <div class="sport-card-time">
              {{ match.date }} {{ match.time }}
            </div>
          </div>
        </div>

        <div class="sport-card-teams">
          <div class="sport-card-team">
            <span v-if="match.homeImgError" class="sport-card-flag">
              {{ match.homeFlag }}
            </span>

            <img v-else class="sport-card-flag-img" :src="getFlagUrl(match.homeLogo)" :alt="match.home"
              @error="match.homeImgError = true" />

            <span class="sport-card-name">{{ match.home }}</span>
          </div>

          <div class="sport-card-vs">VS</div>

          <div class="sport-card-team">
            <span v-if="match.awayImgError" class="sport-card-flag">
              {{ match.awayFlag }}
            </span>

            <img v-else class="sport-card-flag-img" :src="getFlagUrl(match.awayLogo)" :alt="match.away"
              @error="match.awayImgError = true" />

            <span class="sport-card-name">{{ match.away }}</span>
          </div>
        </div>

        <div class="sport-card-odds">
          <button v-for="odd in match.odds" :key="odd.key" type="button" class="sport-card-odd"
            :class="`is-${odd.key}`">
            <span>{{ odd.label }}</span>
            <strong>{{ odd.value }}</strong>
          </button>
        </div>
      </article>
    </div>

    <div class="sport-carousel-control">
      <button type="button" class="sport-carousel-arrow" @click="scrollSports('left')">
        <i class="bi bi-chevron-left"></i>
      </button>

      <span class="sport-carousel-track">
        <span class="sport-carousel-dot active"></span>
        <span class="sport-carousel-dot"></span>
        <span class="sport-carousel-dot"></span>
      </span>

      <button type="button" class="sport-carousel-arrow" @click="scrollSports('right')">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { sportMatches } from "../../data/sportMatches";
import { getPublicImage } from "../../utils/imagePath";

const { t, locale } = useI18n();

const sportCardsRowRef = ref(null);

const matches = computed(() => {
  const isZh = locale.value === "zh";

  return sportMatches.map((match) => ({
    ...match,
    title: isZh ? match.titleZh : match.titleEn,
    league: isZh ? match.leagueZh : match.leagueEn,
    home: isZh ? match.homeZh : match.homeEn,
    away: isZh ? match.awayZh : match.awayEn,
    homeImgError: false,
    awayImgError: false,
  }));
});

function getFlagUrl(flagName) {
  if (!flagName) {
    return "";
  }

  return getPublicImage(`/images/flags/${flagName}.png`);
}

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