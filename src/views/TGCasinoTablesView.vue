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
              @click="activeCategory = tab.key"
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
      <div class="tg-casino-grid">
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
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { tgCasinoCategoryTabs, tgCasinoTables } from "../data/tgCasinoTables";

const { t } = useI18n();

const activeCategory = ref("all");

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
</script>
