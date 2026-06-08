<template>
  <section class="promotion-page">
    <div class="promotion-grid">
      <article
        v-for="promotion in promotions"
        :key="promotion.id"
        class="promotion-card"
      >
        <div class="promotion-image" :class="promotion.theme">
          <img
            :src="promotion.imageUrl"
            :alt="t(promotion.titleKey)"
            class="promotion-card-img"
          />

         <span class="promotion-tag">{{ t(promotion.tagKey) }}</span>
        </div>

        <div class="promotion-body">
          <h3>{{ t(promotion.titleKey) }}</h3>
          <p>{{ t(promotion.descKey) }}</p>
        </div>

        <div class="promotion-actions">
          <button
            type="button"
            class="platform-btn secondary sm"
            @click="openDetail(promotion)"
          >
            {{ t("promotion.learnMore") }}
          </button>

          <button
            v-if="!promotion.joined"
            type="button"
            class="platform-btn primary sm"
            @click="joinPromotion(promotion)"
          >
            {{ t("promotion.joinNow") }}
          </button>

          <button
            v-else
            type="button"
            class="platform-btn disabled sm"
            disabled
          >
            <i class="bi bi-check-circle-fill"></i>
            {{ t("promotion.joined") }}
          </button>
        </div>
      </article>
    </div>

    <!-- Detail Modal -->
    <div v-if="selectedPromotion" class="promotion-modal-mask">
      <div class="promotion-modal">
        <div class="promotion-modal-header">
          <div>
            <div class="promotion-modal-kicker">
              {{ selectedPromotion.tag }}
            </div>

            <h3>{{ t(selectedPromotion.titleKey) }}</h3>
          </div>

          <button
            type="button"
            class="promotion-modal-close"
            @click="selectedPromotion = null"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="promotion-modal-hero">
          <img
            :src="selectedPromotion.imageUrl"
            :alt="t(selectedPromotion.titleKey)"
            class="promotion-modal-hero-img"
          />

          <div class="promotion-modal-hero-overlay">
            <span>{{ selectedPromotion.imageTitle }}</span>
            <strong>{{ selectedPromotion.code }}</strong>
          </div>
        </div>

        <div class="promotion-modal-body">
          <div class="promotion-detail-row">
            <span>{{ t("promotion.bonusPercent") }}</span>
            <strong>{{ selectedPromotion.bonusPercent }}</strong>
          </div>

          <div class="promotion-detail-row">
            <span>{{ t("promotion.maximumBonus") }}</span>
            <strong>{{ selectedPromotion.maximumBonus }}</strong>
          </div>

          <div class="promotion-detail-row">
            <span>{{ t("promotion.turnover") }}</span>
            <strong>{{ selectedPromotion.turnover }}</strong>
          </div>

          <div class="promotion-detail-row">
            <span>{{ t("promotion.validPeriod") }}</span>
            <strong>{{ selectedPromotion.validPeriod }}</strong>
          </div>

          <p class="promotion-modal-desc">
            {{ t(selectedPromotion.descKey) }}
          </p>
        </div>

        <div class="promotion-modal-actions">
          <button
            type="button"
            class="platform-btn secondary"
            @click="selectedPromotion = null"
          >
            {{ t("common.close") }}
          </button>

          <button
            v-if="!selectedPromotion.joined"
            type="button"
            class="platform-btn primary"
            @click="joinPromotion(selectedPromotion)"
          >
            {{ t("promotion.joinNow") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toastMessage" class="promotion-toast">
      <i class="bi bi-check-circle-fill"></i>
      {{ toastMessage }}
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const selectedPromotion = ref(null);
const toastMessage = ref("");

const promotions = ref([
  {
    id: 1,
    tagKey: "promotion.tags.sport",
    code: "FIFA100BONUS",
    imageTitle: "FIFA BONUS",
    titleKey: "promotion.fifaTitle",
    descKey: "promotion.fifaDesc",
    bonusPercent: "100%",
    maximumBonus: "USD 500",
    turnover: "10x",
    validPeriod: "7 Days",
    theme: "promotion-sport",
    imageUrl: "/images/activities/activity-1.png",
    joined: false,
  },
  {
    id: 2,
    tagKey: "promotion.tags.casino",
    code: "LUCKY888",
    imageTitle: "LUCKY 888",
    titleKey: "promotion.casinoTitle",
    descKey: "promotion.casinoDesc",
    bonusPercent: "88%",
    maximumBonus: "USD 888",
    turnover: "10x",
    validPeriod: "7 Days",
    theme: "promotion-casino",
    imageUrl: "/images/activities/activity-2.png",
    joined: true,
  },
  {
    id: 3,
    tagKey: "promotion.tags.esport",
    code: "ESPORT50",
    imageTitle: "ESPORT BONUS",
    titleKey: "promotion.esportTitle",
    descKey: "promotion.esportDesc",
    bonusPercent: "50%",
    maximumBonus: "USD 1,000",
    turnover: "10x",
    validPeriod: "7 Days",
    theme: "promotion-esport",
    imageUrl: "/images/activities/activity-3.png",
    joined: true,
  },
]);

const openDetail = (promotion) => {
  selectedPromotion.value = promotion;
};

const joinPromotion = (promotion) => {
  const target = promotions.value.find((item) => item.id === promotion.id);

  if (!target || target.joined) {
    return;
  }

  target.joined = true;

  if (selectedPromotion.value?.id === promotion.id) {
    selectedPromotion.value = target;
  }

  showToast(t("promotion.joinSuccess"));
};

const showToast = (message) => {
  toastMessage.value = message;

  window.setTimeout(() => {
    toastMessage.value = "";
  }, 2200);
};
</script>