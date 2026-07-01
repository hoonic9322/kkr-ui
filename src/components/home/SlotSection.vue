<template>
  <section class="home-game-showcase">
    <div class="showcase-topbar">
      <div class="showcase-topbar-left">
        <button type="button" class="showcase-tab active">
          {{ t("home.hotGames") }}
        </button>

        <div class="showcase-provider">
          <img
            :src="providerLogo"
            alt="PG Logo"
            class="showcase-provider-logo"
          />

          <span>{{ t("home.officialDirect") }}</span>
        </div>
      </div>

      <RouterLink to="/slots" class="showcase-lobby-btn">
        {{ t("home.goGameLobby") }}
        <i class="bi bi-chevron-right"></i>
      </RouterLink>
    </div>

    <Transition :name="transitionName" mode="out-in">
      <div :key="pageIndex" class="showcase-grid">
        <article
          v-for="game in visibleGames"
          :key="game.id"
          class="showcase-game-card"
        >
          <img
            :src="getGameImage(game)"
            :alt="t(game.titleKey)"
            class="showcase-game-img"
          />

          <span v-if="game.badgeKey" class="showcase-game-badge">
            {{ t(game.badgeKey) }}
          </span>

          <div class="showcase-game-overlay">
            <h3>{{ t(game.titleKey) }}</h3>
            <p>{{ t(game.providerKey) }}</p>
          </div>
        </article>
      </div>
    </Transition>

    <div v-if="totalPages > 1" class="showcase-carousel-dots">
      <button
        type="button"
        class="showcase-dot-nav"
        :disabled="pageIndex === 0"
        @click="prevPage"
      >
        <i class="bi bi-chevron-left"></i>
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        class="showcase-dot"
        :class="{ active: pageIndex === page - 1 }"
        @click="goToPage(page - 1)"
      ></button>

      <button
        type="button"
        class="showcase-dot-nav"
        :disabled="pageIndex === totalPages - 1"
        @click="nextPage"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { slotGames } from "../../data/slotGames";
import { getPublicImage } from "../../utils/imagePath";

const { t, locale } = useI18n();

const pageSize = 24;
const pageIndex = ref(0);
const transitionName = ref("showcase-slide-next");

const displayMode = ref(
  document.documentElement.getAttribute("data-display-mode") ||
    localStorage.getItem("kkrr_display_mode") ||
    "dark",
);

const providerLogo = computed(() => {
  const logoPath =
    displayMode.value === "light"
      ? "/images/providers/PG-logo.png"
      : "/images/providers/PG-logo-light.png";

  return getPublicImage(logoPath);
});

let displayModeObserver = null;

onMounted(() => {
  displayModeObserver = new MutationObserver(() => {
    displayMode.value =
      document.documentElement.getAttribute("data-display-mode") || "dark";
  });

  displayModeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-display-mode"],
  });
});

onBeforeUnmount(() => {
  if (displayModeObserver) {
    displayModeObserver.disconnect();
    displayModeObserver = null;
  }
});

const getCurrentLang = () => {
  return String(locale.value).startsWith("zh") ? "zh" : "en";
};

const getGameImage = (game) => {
  const currentLang = getCurrentLang();

  const imagePath = game.imageLocale?.[currentLang] || game.imageUrl;

  return getPublicImage(imagePath);
};

const homeGames = computed(() => {
  return slotGames.filter((game) => game.isHomeHot);
});

const totalPages = computed(() => {
  return Math.ceil(homeGames.value.length / pageSize);
});

const visibleGames = computed(() => {
  const start = pageIndex.value * pageSize;
  const end = start + pageSize;

  return homeGames.value.slice(start, end);
});

const goToPage = (index) => {
  if (index === pageIndex.value) {
    return;
  }

  transitionName.value =
    index > pageIndex.value ? "showcase-slide-next" : "showcase-slide-prev";

  pageIndex.value = index;
};

const nextPage = () => {
  if (pageIndex.value < totalPages.value - 1) {
    transitionName.value = "showcase-slide-next";
    pageIndex.value += 1;
  }
};

const prevPage = () => {
  if (pageIndex.value > 0) {
    transitionName.value = "showcase-slide-prev";
    pageIndex.value -= 1;
  }
};
</script>