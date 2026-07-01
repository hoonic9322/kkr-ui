<template>
  <section class="tg-lobby-page">
    <div class="tg-lobby-container">
      <!-- Top Banner -->
      <section class="tg-lobby-hero">
        <img :src="getPublicImage('/images/banners/tg-live-banner.png')" alt="TG Live Banner"
          class="tg-lobby-hero-img" />

        <div class="tg-lobby-hero-overlay"></div>

        <div class="tg-lobby-gold-dust" aria-hidden="true">
          <span v-for="index in 28" :key="index"></span>
        </div>
      </section>

      <!-- Lobby Panel -->
      <section class="tg-lobby-panel">
        <div class="tg-lobby-toolbar">
          <div class="tg-lobby-main-tabs">
            <button v-for="tab in mainTabs" :key="tab.key" type="button" class="tg-lobby-main-tab" :class="[
              `is-${tab.theme || 'blue'}`,
              { active: activeMainTab === tab.key },
            ]" @click="selectMainTab(tab.key)">
              <i :class="tab.icon"></i>
              <span>{{ t(tab.labelKey) }}</span>
            </button>
          </div>
        </div>

        <div v-if="filteredTables.length" class="tg-lobby-grid">
          <article v-for="table in filteredTables" :key="table.id" class="tg-lobby-card">
            <button type="button" class="tg-lobby-favorite-btn" :class="{ active: isFavourite(table.id) }" :aria-label="isFavourite(table.id) ? 'Remove favourite' : 'Add favourite'
              " @click.stop="toggleFavourite(table.id)">
              <i :class="isFavourite(table.id) ? 'bi bi-heart-fill' : 'bi bi-heart'
                "></i>
            </button>

            <div v-if="table.onlineCount" class="tg-lobby-online-badge">
              {{ table.onlineCount }}
            </div>

            <div class="tg-lobby-card-media">
              <img :src="getPublicImage(table.image)" :alt="table.name || table.code" class="tg-lobby-card-img"
                loading="lazy" />

              <div class="tg-lobby-card-shade"></div>

              <div class="tg-lobby-card-content">
                <div class="tg-lobby-table-title-block">
                  <h3>{{ getCategoryName(table.category) }}</h3>
                  <p>{{ table.code }}</p>
                </div>
              </div>
            </div>

            <div class="tg-lobby-card-road-panel">
              <div class="tg-lobby-road-board">
                <span v-for="cell in getRoadCells(table.roads)" :key="`${table.id}-road-${cell.index}`"
                  class="tg-lobby-road-cell" :class="cell.color ? ['has-result', `is-${cell.color}`] : ''" :style="{
                    gridColumn: cell.column,
                    gridRow: cell.row,
                  }"></span>
              </div>
            </div>

            <div class="tg-lobby-card-bottom">
              <span class="tg-lobby-status" :class="`is-${table.statusColor || 'blue'}`">
                {{ t(table.statusKey) }}
              </span>

              <button type="button" class="tg-lobby-play-btn">
                {{ t("tgCasino.playNow") }}
              </button>
            </div>
          </article>
        </div>

        <div v-else class="tg-lobby-empty">
          <i class="bi bi-broadcast"></i>
          <p>{{ t("tgCasino.noTables") }}</p>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { tgCasinoCategoryTabs, tgCasinoTables } from "../data/tgCasinoTables";
import { getPublicImage } from "../utils/imagePath";

const { t } = useI18n();

const TG_CASINO_FAVORITE_STORAGE_KEY = "kkr_tg_casino_favourite_tables";

const activeMainTab = ref("all");
const activeProvider = ref("tg");
const favouriteIds = ref(getStoredFavouriteIds());

const categoryTabs = tgCasinoCategoryTabs;
const casinoTables = tgCasinoTables;

const mainTabs = [
  {
    key: "all",
    labelKey: "tgCasino.all",
    icon: "bi bi-grid-3x3-gap-fill",
    theme: "blue",
  },
  ...categoryTabs
    .filter((tab) => tab.key !== "all")
    .map((tab) => ({
      ...tab,
      icon:
        tab.key === "baccarat"
          ? "bi bi-flower1"
          : tab.key === "dragonTiger"
            ? "bi bi-fire"
            : tab.key === "niuniu"
              ? "bi bi-suit-spade-fill"
              : tab.icon || "bi bi-circle-fill",
      theme: tab.theme || "blue",
    })),
];
const providers = [
  {
    key: "tg",
    labelKey: "tgCasino.providers.tg",
    shortName: "TG",
    logo: "/images/providers/tg-live-logo.png",
    logoClass: "tg-lobby-provider-logo-tg",
  },
];

const filteredTables = computed(() => {
  return casinoTables.filter((table) => {
    const currentProvider = getProviderValue(table);

    const matchProvider = currentProvider === activeProvider.value;

    const matchTab =
      activeMainTab.value === "all" ||
      table.category === activeMainTab.value ||
      table.tags?.includes(activeMainTab.value);

    return matchProvider && matchTab;
  });
});

const ROAD_ROWS = 6;
const ROAD_COLUMNS = 16;

function getRoadCells(roads = []) {
  const cells = [];

  for (let column = 1; column <= ROAD_COLUMNS; column += 1) {
    for (let row = 1; row <= ROAD_ROWS; row += 1) {
      const index = (column - 1) * ROAD_ROWS + (row - 1);

      cells.push({
        index,
        column,
        row,
        color: roads[index] || "",
      });
    }
  }

  return cells;
}

function getCategoryName(category) {
  const categoryMap = {
    baccarat: t("tgCasino.baccarat"),
    dragonTiger: t("tgCasino.dragonTiger"),
    niuniu: t("tgCasino.niuniu"),
  };

  return categoryMap[category] || category;
}

function getProviderValue(table) {
  return String(table.provider || "tg").toLowerCase();
}

function getStoredFavouriteIds() {
  try {
    const raw = localStorage.getItem(TG_CASINO_FAVORITE_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed)
      ? parsed
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id) && id > 0)
      : [];
  } catch {
    return [];
  }
}

function saveFavouriteIds() {
  localStorage.setItem(
    TG_CASINO_FAVORITE_STORAGE_KEY,
    JSON.stringify(favouriteIds.value),
  );
}

function isFavourite(tableId) {
  return favouriteIds.value.includes(Number(tableId));
}

function toggleFavourite(tableId) {
  const id = Number(tableId);

  if (!Number.isFinite(id)) {
    return;
  }

  if (isFavourite(id)) {
    favouriteIds.value = favouriteIds.value.filter(
      (favouriteId) => favouriteId !== id,
    );
  } else {
    favouriteIds.value = [...favouriteIds.value, id];
  }

  saveFavouriteIds();
}

function selectMainTab(tabKey) {
  activeMainTab.value = tabKey;
}

function selectProvider(providerKey) {
  activeProvider.value = providerKey;
}
</script>
