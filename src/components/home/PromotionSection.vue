<template>
  <section class="promotion-showcase-page">
    <div class="promotion-showcase-container">
      <!-- Header -->
      <div class="promotion-showcase-head">
        <div class="promotion-showcase-left">
          <div class="promotion-showcase-title-wrap">
            <h2>{{ t("promotionShowcase.title") }}</h2>
          </div>
        </div>

        <RouterLink to="/promotions" class="promotion-showcase-lobby-btn">
          {{ t("promotionShowcase.viewAll") }}
          <i class="bi bi-chevron-right"></i>
        </RouterLink>
      </div>

      <!-- Promotion Cards -->
      <div class="promotion-showcase-grid">
        <article v-for="promotion in promotions" :key="promotion.id" class="promotion-showcase-card">
          <div class="promotion-showcase-card-media">
            <img :src="getPublicImage(promotion.imageUrl)" :alt="t(promotion.titleKey)"
              class="promotion-showcase-card-img" loading="lazy" />

            <div class="promotion-showcase-card-shade"></div>

            <span class="promotion-showcase-badge">
              {{ t(promotion.tagKey) }}
            </span>
          </div>

          <div class="promotion-showcase-card-body">
            <h3>{{ t(promotion.titleKey) }}</h3>
            <p>{{ t(promotion.descKey) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { getPublicImage } from "../../utils/imagePath";

const { t } = useI18n();

const promotions = [
  {
    id: 1,
    tagKey: "promotion.tags.sport",
    titleKey: "promotion.fifaTitle",
    descKey: "promotion.fifaDesc",
    imageUrl: "/images/activities/activity-1.png",
  },
  {
    id: 2,
    tagKey: "promotion.tags.casino",
    titleKey: "promotion.casinoTitle",
    descKey: "promotion.casinoDesc",
    imageUrl: "/images/activities/activity-2.png",
  },
  {
    id: 3,
    tagKey: "promotion.tags.esport",
    titleKey: "promotion.esportTitle",
    descKey: "promotion.esportDesc",
    imageUrl: "/images/activities/activity-3.png",
  },
];
</script>