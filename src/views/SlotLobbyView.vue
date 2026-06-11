<template>
  <section class="slot-lobby-page">
    <div class="slot-lobby-container">
      <!-- Top Banner + Jackpot -->
      <section class="slot-lobby-hero">
        <img
          src="/images/banners/slot-lobby-banner.png"
          alt="Slot Lobby Banner"
          class="slot-lobby-hero-img"
        />

        <div class="slot-lobby-hero-overlay"></div>

        <div class="slot-lobby-jackpot-card">
          <div class="slot-lobby-jackpot-label">
            PROGRESSIVE JACKPOT
          </div>

          <div class="slot-lobby-jackpot-brand">
            NEXTSPIN
          </div>

          <div class="slot-lobby-jackpot-amount">
            {{ jackpotAmount }}
          </div>
        </div>
      </section>

      <!-- Lobby Panel -->
      <section class="slot-lobby-panel">
        <div class="slot-lobby-main-tabs">
          <button
            v-for="tab in mainTabs"
            :key="tab.key"
            type="button"
            class="slot-main-tab"
            :class="{ active: activeMainTab === tab.key }"
            @click="selectMainTab(tab.key)"
          >
            {{ t(tab.labelKey) }}
          </button>

          <div class="slot-lobby-search">
            <input
              v-model.trim="searchKeyword"
              type="text"
              :placeholder="t('slot.searchPlaceholder')"
            />

            <button type="button" aria-label="Search">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>

        <div class="slot-lobby-provider-bar">
          <button
            v-for="provider in providers"
            :key="provider.key"
            type="button"
            class="slot-provider-tab"
            :class="{ active: activeProvider === provider.key }"
            @click="selectProvider(provider.key)"
          >
            <img
              v-if="provider.logo"
              :src="provider.logo"
              :alt="provider.shortName"
              class="slot-provider-logo"
              :class="provider.logoClass"
            />

            <span v-else class="slot-provider-short">
              {{ provider.shortName }}
            </span>

            <small>{{ t(provider.labelKey) }}</small>
          </button>
        </div>

        <div class="slot-lobby-grid">
          <article
            v-for="game in filteredGames"
            :key="game.id"
            class="slot-lobby-card"
          >
            <button
              type="button"
              class="slot-favorite-btn"
              :class="{ active: isFavourite(game.id) }"
              @click.stop="toggleFavourite(game.id)"
            >
              <i
                :class="
                  isFavourite(game.id) ? 'bi bi-heart-fill' : 'bi bi-heart'
                "
              ></i>
            </button>

            <img
              :src="getGameImage(game)"
              :alt="t(game.titleKey)"
              class="slot-lobby-img"
            />

            <span v-if="game.badgeKey" class="slot-lobby-badge">
              {{ t(game.badgeKey) }}
            </span>

            <div class="slot-lobby-overlay">
              <h3>{{ t(game.titleKey) }}</h3>
              <p>{{ t(game.providerKey) }}</p>
            </div>
          </article>
        </div>

        <div v-if="filteredGames.length === 0" class="slot-lobby-empty">
          <i class="bi bi-controller"></i>
          <p>{{ t("slot.noGames") }}</p>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { SLOT_FAVORITE_STORAGE_KEY, slotGames } from "../data/slotGames";

const { t, locale } = useI18n();

const activeMainTab = ref("all");
const activeProvider = ref("pg");
const searchKeyword = ref("");

const jackpotAmount = ref("1,006,816.41");

const mainTabs = [
  {
    key: "all",
    labelKey: "slot.tabs.allGames",
  },
  {
    key: "jackpot",
    labelKey: "slot.tabs.jackpot",
  },
  {
    key: "recommend",
    labelKey: "slot.tabs.recommend",
  },
  {
    key: "favourite",
    labelKey: "slot.tabs.favourite",
  },
];

const providers = [
  {
    key: "pg",
    labelKey: "slot.providers.pg",
    shortName: "PG",
    logo: "/images/providers/PG-logo-light.png",
    logoClass: "slot-provider-logo-pg",
  },
  {
    key: "jili",
    labelKey: "slot.providers.jili",
    shortName: "JILI",
    logo: "/images/providers/jili-logo.png",
    logoClass: "slot-provider-logo-jili",
  },
  {
    key: "cq9",
    labelKey: "slot.providers.cq9",
    shortName: "CQ9",
    logo: "",
    logoClass: "",
  },
  {
    key: "onlyplay",
    labelKey: "slot.providers.onlyplay",
    shortName: "OP",
    logo: "",
    logoClass: "",
  },
  {
    key: "tgturbo",
    labelKey: "slot.providers.tgturbo",
    shortName: "TT",
    logo: "",
    logoClass: "",
  },
  {
    key: "sa",
    labelKey: "slot.providers.sa",
    shortName: "SA",
    logo: "",
    logoClass: "",
  },
];

const getCurrentLang = () => {
  return String(locale.value).startsWith("zh") ? "zh" : "en";
};

const getGameImage = (game) => {
  const currentLang = getCurrentLang();

  return game.imageLocale?.[currentLang] || game.imageUrl;
};

const getStoredFavouriteIds = () => {
  try {
    const raw = localStorage.getItem(SLOT_FAVORITE_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const favouriteIds = ref(getStoredFavouriteIds());

const saveFavouriteIds = () => {
  localStorage.setItem(
    SLOT_FAVORITE_STORAGE_KEY,
    JSON.stringify(favouriteIds.value)
  );
};

const isFavourite = (gameId) => {
  return favouriteIds.value.includes(gameId);
};

const toggleFavourite = (gameId) => {
  if (isFavourite(gameId)) {
    favouriteIds.value = favouriteIds.value.filter((id) => id !== gameId);
  } else {
    favouriteIds.value = [...favouriteIds.value, gameId];
  }

  saveFavouriteIds();
};

const selectMainTab = (tabKey) => {
  activeMainTab.value = tabKey;
};

const selectProvider = (providerKey) => {
  activeProvider.value = providerKey;

  if (activeMainTab.value === "favourite") {
    activeMainTab.value = "all";
  }
};

const filteredGames = computed(() => {
  const keyword = searchKeyword.value.toLowerCase();

  return slotGames.filter((game) => {
    const gameName = t(game.titleKey).toLowerCase();
    const providerName = t(game.providerKey).toLowerCase();

    const matchSearch =
      !keyword ||
      gameName.includes(keyword) ||
      providerName.includes(keyword);

    const matchProvider =
      activeMainTab.value === "favourite" ||
      game.provider === activeProvider.value;

    const matchTab =
      activeMainTab.value === "all" ||
      game.tags?.includes(activeMainTab.value) ||
      (activeMainTab.value === "favourite" && isFavourite(game.id));

    return matchSearch && matchProvider && matchTab;
  });
});
</script>