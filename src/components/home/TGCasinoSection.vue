<template>
  <section class="tg-casino-page">
    <div class="tg-casino-container">
      <!-- Section Header + Category Tabs -->
      <div class="tg-casino-showcase-head">
        <div class="tg-casino-showcase-left">
          <div class="tg-casino-title-wrap">
            <h2>{{ t("tgCasino.title") }}</h2>
          </div>

          <div class="tg-casino-tabs">
            <button
              v-for="tab in categoryTabs"
              :key="tab.key"
              type="button"
              class="tg-casino-tab"
              :class="[
                `is-${tab.theme}`,
                { active: activeCategory === tab.key },
              ]"
              @click="selectCategory(tab.key)"
            >
              <i :class="tab.icon"></i>
              <span>{{ t(tab.labelKey) }}</span>
            </button>
          </div>
        </div>

        <RouterLink to="/tg-live" class="tg-casino-lobby-btn">
          {{ t("tgCasino.goLobby") }}
          <i class="bi bi-chevron-right"></i>
        </RouterLink>
      </div>

      <!-- Table List -->
      <div ref="tgCasinoGridRef" class="tg-casino-grid" @scroll="syncScrollState">
        <article
          v-for="table in filteredTables"
          :key="table.id"
          class="tg-casino-card"
        >
          <div class="tg-casino-card-media">
            <img
              :src="table.image"
              :alt="table.name"
              class="tg-casino-card-img"
            />

            <div class="tg-casino-card-shade"></div>

            <div v-if="table.onlineCount" class="tg-casino-online-badge">
              {{ table.onlineCount }}
            </div>

            <div class="tg-casino-card-content">
              <!-- Category + Code on image -->
              <div class="tg-casino-table-title-block">
                <h3>{{ getCategoryName(table.category) }}</h3>
                <p>{{ table.code }}</p>
              </div>

              <!-- Roadmap + Status -->
              <div class="tg-casino-card-bottom-panel">
                <div class="tg-casino-roadmap">
                  <div class="tg-casino-road-board">
                    <span
                      v-for="cell in getRoadCells(table.roads)"
                      :key="`${table.id}-road-${cell.index}`"
                      class="tg-casino-road-cell"
                      :class="
                        cell.color ? ['has-result', `is-${cell.color}`] : ''
                      "
                      :style="{
                        gridColumn: cell.column,
                        gridRow: cell.row,
                      }"
                    ></span>
                  </div>
                </div>

                <div class="tg-casino-card-bottom">
                  <span
                    class="tg-casino-status"
                    :class="`is-${table.statusColor || 'blue'}`"
                  >
                    {{ t(table.statusKey) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Carousel Control -->
      <div v-if="showCarouselControl" class="tg-casino-carousel-control">
        <button
          type="button"
          class="tg-casino-carousel-arrow"
          :disabled="activePage === 0"
          @click="scrollTables('left')"
        >
          <i class="bi bi-chevron-left"></i>
        </button>

        <span class="tg-casino-carousel-track">
          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            class="tg-casino-carousel-dot"
            :class="{ active: activePage === page - 1 }"
            @click="goToPage(page - 1)"
          ></button>
        </span>

        <button
          type="button"
          class="tg-casino-carousel-arrow"
          :disabled="activePage === totalPages - 1"
          @click="scrollTables('right')"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { tgCasinoCategoryTabs, tgCasinoTables } from "../../data/tgCasinoTables";

const { t } = useI18n();

const activeCategory = ref("all");
const tgCasinoGridRef = ref(null);
const activePage = ref(0);
const totalPages = ref(1);

const categoryTabs = tgCasinoCategoryTabs;
const casinoTables = tgCasinoTables;

const filteredTables = computed(() => {
  if (activeCategory.value === "all") {
    return casinoTables;
  }

  return casinoTables.filter((table) => {
    return table.category === activeCategory.value;
  });
});

const showCarouselControl = computed(() => {
  return filteredTables.value.length > 1 && totalPages.value > 1;
});

const ROAD_ROWS = 6;
const ROAD_COLUMNS = 16;

function selectCategory(categoryKey) {
  activeCategory.value = categoryKey;
  activePage.value = 0;

  nextTick(() => {
    const row = tgCasinoGridRef.value;

    if (!row) {
      return;
    }

    row.scrollTo({
      left: 0,
      behavior: "smooth",
    });

    syncScrollState();
  });
}

function scrollTables(direction) {
  const row = tgCasinoGridRef.value;

  if (!row) {
    return;
  }

  const scrollAmount = row.clientWidth * 0.9;

  row.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
}

function goToPage(pageIndex) {
  const row = tgCasinoGridRef.value;

  if (!row) {
    return;
  }

  const maxScrollLeft = row.scrollWidth - row.clientWidth;
  const targetLeft =
    totalPages.value <= 1
      ? 0
      : (maxScrollLeft / (totalPages.value - 1)) * pageIndex;

  row.scrollTo({
    left: targetLeft,
    behavior: "smooth",
  });

  activePage.value = pageIndex;
}

function syncScrollState() {
  const row = tgCasinoGridRef.value;

  if (!row) {
    return;
  }

  const maxScrollLeft = row.scrollWidth - row.clientWidth;

  if (maxScrollLeft <= 0) {
    totalPages.value = 1;
    activePage.value = 0;
    return;
  }

  const pageCount = Math.max(1, Math.ceil(row.scrollWidth / row.clientWidth));
  totalPages.value = Math.min(pageCount, 4);

  const progress = row.scrollLeft / maxScrollLeft;
  activePage.value = Math.min(
    totalPages.value - 1,
    Math.round(progress * (totalPages.value - 1)),
  );
}

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

nextTick(() => {
  syncScrollState();
});
</script>