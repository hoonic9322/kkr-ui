<template>
  <section class="slot-lobby-page">
    <div class="slot-lobby-container">
      <!-- Top Banner + Jackpot -->
      <section class="slot-lobby-hero">
        <img :src="getPublicImage('/images/banners/slot-lobby-banner.png')" alt="Slot Lobby Banner"
          class="slot-lobby-hero-img" />

        <div class="slot-lobby-hero-overlay"></div>

        <!-- Fire Particles Layer -->
        <div class="slot-fire-particles" aria-hidden="true">
          <span v-for="index in 34" :key="index"></span>
        </div>

        <!-- Jackpot Image + Sequential Rolling Digits -->
        <div class="slot-lobby-jp-card">
          <img :src="getPublicImage('/images/banners/slot-lobby-jackpot.png')" alt="Progressive Jackpot"
            class="slot-lobby-jp-img" />

          <div class="slot-lobby-jp-amount" :aria-label="jackpotAmountText">
            <span v-for="char in jackpotRollChars" :key="char.key" class="slot-jp-cell"
              :class="{ 'is-separator': char.type === 'separator' }">
              <span v-if="char.type === 'separator'" class="slot-jp-separator">
                {{ char.value }}
              </span>

              <span v-else class="slot-jp-window">
                <span class="slot-jp-reel" :style="{
                  transform: `translateY(-${char.position * DIGIT_HEIGHT}px)`,
                }">
                  <span v-for="(digit, digitIndex) in digitReelValues" :key="digitIndex" class="slot-jp-number">
                    {{ digit }}
                  </span>
                </span>
              </span>
            </span>
          </div>
        </div>
      </section>

      <!-- Lobby Panel -->
      <section class="slot-lobby-panel">
        <div class="slot-lobby-toolbar">
          <div class="slot-lobby-main-tabs">
            <button v-for="tab in mainTabs" :key="tab.key" type="button" class="slot-main-tab"
              :class="{ active: activeMainTab === tab.key }" @click="selectMainTab(tab.key)">
              {{ t(tab.labelKey) }}
            </button>
          </div>

          <div class="slot-lobby-search">
            <input v-model.trim="searchKeyword" type="text" :placeholder="t('slot.searchPlaceholder')" />

            <i class="bi bi-search"></i>
          </div>
        </div>

        <div v-if="activeMainTab !== 'favourite'" class="slot-lobby-provider-bar">
          <button v-for="provider in providers" :key="provider.key" type="button" class="slot-provider-tab"
            :class="{ active: activeProvider === provider.key }" @click="selectProvider(provider.key)">
            <img v-if="provider.logo" :src="getPublicImage(provider.logo)" :alt="provider.shortName"
              class="slot-provider-logo" :class="provider.logoClass" />

            <span v-else class="slot-provider-short">
              {{ provider.shortName }}
            </span>

            <small>{{ t(provider.labelKey) }}</small>
          </button>
        </div>

        <div v-if="filteredGames.length" class="slot-lobby-grid">
          <article v-for="game in filteredGames" :key="game.id" class="slot-lobby-card">
            <button type="button" class="slot-favorite-btn" :class="{ active: isFavourite(game.id) }" :aria-label="isFavourite(game.id) ? 'Remove favourite' : 'Add favourite'
              " @click.stop="toggleFavourite(game.id)">
              <i :class="isFavourite(game.id) ? 'bi bi-heart-fill' : 'bi bi-heart'
                "></i>
            </button>

            <img :src="getGameImage(game)" :alt="t(game.titleKey)" class="slot-lobby-img" loading="lazy" />

            <span v-if="game.badgeKey" class="slot-lobby-badge">
              {{ t(game.badgeKey) }}
            </span>

            <div class="slot-lobby-overlay">
              <h3>{{ t(game.titleKey) }}</h3>
              <p>{{ t(game.providerKey) }}</p>
            </div>
          </article>
        </div>

        <div v-else class="slot-lobby-empty">
          <i class="bi bi-controller"></i>

          <p v-if="activeMainTab === 'favourite'">
            {{ t("slot.noFavouriteGames") }}
          </p>

          <p v-else>
            {{ t("slot.noGames") }}
          </p>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { SLOT_FAVORITE_STORAGE_KEY, slotGames } from "../data/slotGames";
import { getPublicImage } from "../utils/imagePath";

const { t, locale } = useI18n();

const activeMainTab = ref("all");
const activeProvider = ref("pg");
const searchKeyword = ref("");

/*
  Jackpot rule:
  - Every 2 seconds, randomly increase 0.10 - 0.99
  - Only changed digits roll
  - Unchanged digits stay still
  - Digits roll upward by numeric order: 1,2,3...9,0,1
  - No Vue Transition
  - No running light / bulb ring
*/
const DIGIT_HEIGHT = 34;
const REEL_LENGTH = 300;
const REEL_SAFE_START = 120;
const REEL_SAFE_END = 260;
const JACKPOT_WAIT_MS = 2000;

const jackpotWhole = ref(1006816);
const jackpotDecimal = ref(41);
const jackpotRollChars = ref([]);

let jackpotTimer = null;

const digitReelValues = Array.from({ length: REEL_LENGTH }, (_, index) =>
  String(index % 10),
);

const jackpotAmountText = computed(() => {
  const wholeText = jackpotWhole.value.toLocaleString("en-US");
  const decimalText = String(jackpotDecimal.value).padStart(2, "0");

  return `${wholeText}.${decimalText}`;
});

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
    logo: "/images/providers/cq9-logo.png",
    logoClass: "slot-provider-logo-cq9",
  },
  {
    key: "onlyplay",
    labelKey: "slot.providers.onlyplay",
    shortName: "ONLYPLAY",
    logo: "/images/providers/onlyplay-logo.png",
    logoClass: "slot-provider-logo-onlyplay",
  },
  {
    key: "tgturbo",
    labelKey: "slot.providers.tgturbo",
    shortName: "TGTURBO",
    logo: "/images/providers/tgturbo-logo.png",
    logoClass: "slot-provider-logo-tgturbo",
  },
  {
    key: "spribe",
    labelKey: "slot.providers.spribe",
    shortName: "SPRIBE",
    logo: "/images/providers/spribe-logo-light.png",
    logoClass: "slot-provider-logo-spribe",
  },
  {
    key: "fishing",
    labelKey: "slot.providers.fishing",
    shortName: "FISHING",
    logo: "/images/providers/cq9-logo.png",
    logoClass: "slot-provider-logo-cq9",
  },
];

const providerMap = {
  "slot.providers.pg": "pg",
  "slot.providers.cq9": "cq9",
  "slot.providers.jili": "jili",
  "slot.providers.onlyplay": "onlyplay",
  "slot.providers.tgturbo": "tgturbo",
  "slot.providers.spribe": "spribe",
  "slot.providers.spribe": "fishing",
};

const favouriteIds = ref(getStoredFavouriteIds());

const filteredGames = computed(() => {
  const keyword = searchKeyword.value.toLowerCase();

  return slotGames.filter((game) => {
    const gameName = t(game.titleKey).toLowerCase();
    const providerName = t(game.providerKey).toLowerCase();
    const currentProvider = getProviderValue(game);
    const gameId = Number(game.id);

    const matchSearch =
      !keyword ||
      gameName.includes(keyword) ||
      providerName.includes(keyword) ||
      currentProvider.includes(keyword);

    const matchProvider =
      activeMainTab.value === "favourite" ||
      currentProvider === activeProvider.value;

    const matchTab =
      activeMainTab.value === "all" ||
      game.tags?.includes(activeMainTab.value) ||
      (activeMainTab.value === "favourite" && isFavourite(gameId));

    return matchSearch && matchProvider && matchTab;
  });
});

onMounted(() => {
  startJackpotCounter();
});

onBeforeUnmount(() => {
  stopJackpotCounter();
});

/* =========================================================
   Jackpot Logic
   ========================================================= */

function isDigitChar(value) {
  return /^\d$/.test(value);
}

function getSafeBasePosition(digit) {
  const digitNumber = Number(digit);

  for (
    let position = REEL_SAFE_START;
    position < REEL_SAFE_END;
    position += 1
  ) {
    if (position % 10 === digitNumber) {
      return position;
    }
  }

  return digitNumber;
}

function createInitialRollChars(text) {
  return text.split("").map((value, index) => {
    if (!isDigitChar(value)) {
      return {
        key: `separator-${index}-${value}`,
        index,
        value,
        type: "separator",
        position: 0,
      };
    }

    return {
      key: `digit-${index}`,
      index,
      value,
      type: "digit",
      position: getSafeBasePosition(value),
    };
  });
}

function getNextDigitPosition(previousPosition, previousValue, nextValue) {
  const previousDigit = Number(previousValue);
  const nextDigit = Number(nextValue);

  if (previousDigit === nextDigit) {
    return previousPosition;
  }

  let step = nextDigit - previousDigit;

  if (step < 0) {
    step += 10;
  }

  const nextPosition = previousPosition + step;

  if (nextPosition >= REEL_SAFE_END) {
    return getSafeBasePosition(nextValue);
  }

  return nextPosition;
}

function syncJackpotRollChars() {
  const nextText = jackpotAmountText.value;
  const previousChars = jackpotRollChars.value;

  if (!previousChars.length || previousChars.length !== nextText.length) {
    jackpotRollChars.value = createInitialRollChars(nextText);
    return;
  }

  jackpotRollChars.value = nextText.split("").map((nextValue, index) => {
    const previousChar = previousChars[index];

    if (!isDigitChar(nextValue)) {
      return {
        key: `separator-${index}-${nextValue}`,
        index,
        value: nextValue,
        type: "separator",
        position: 0,
      };
    }

    if (!previousChar || previousChar.type !== "digit") {
      return {
        key: `digit-${index}`,
        index,
        value: nextValue,
        type: "digit",
        position: getSafeBasePosition(nextValue),
      };
    }

    return {
      key: previousChar.key,
      index,
      value: nextValue,
      type: "digit",
      position: getNextDigitPosition(
        previousChar.position,
        previousChar.value,
        nextValue,
      ),
    };
  });
}

function updateJackpotAmount() {
  const decimalIncrement = Math.floor(Math.random() * 90) + 10;

  jackpotDecimal.value += decimalIncrement;

  while (jackpotDecimal.value >= 100) {
    jackpotDecimal.value -= 100;
    jackpotWhole.value += 1;
  }

  syncJackpotRollChars();
}

function startJackpotCounter() {
  stopJackpotCounter();
  syncJackpotRollChars();

  jackpotTimer = window.setInterval(() => {
    updateJackpotAmount();
  }, JACKPOT_WAIT_MS);
}

function stopJackpotCounter() {
  if (jackpotTimer) {
    clearInterval(jackpotTimer);
    jackpotTimer = null;
  }
}

/* =========================================================
   Game Filter / Provider / Image
   ========================================================= */

function getProviderValue(game) {
  if (game.provider) {
    return String(game.provider).toLowerCase();
  }

  if (game.providerKey && providerMap[game.providerKey]) {
    return providerMap[game.providerKey];
  }

  if (game.providerKey) {
    return String(game.providerKey).split(".").pop().toLowerCase();
  }

  return "";
}

function getCurrentLang() {
  return String(locale.value).startsWith("zh") ? "zh" : "en";
}

function getGameImage(game) {
  const currentLang = getCurrentLang();

  const imagePath = game.imageLocale?.[currentLang] || game.imageUrl;

  return getPublicImage(imagePath);
}

/* =========================================================
   Favourite Local Storage
   ========================================================= */

function getStoredFavouriteIds() {
  try {
    const raw = localStorage.getItem(SLOT_FAVORITE_STORAGE_KEY);
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
    SLOT_FAVORITE_STORAGE_KEY,
    JSON.stringify(favouriteIds.value),
  );
}

function isFavourite(gameId) {
  return favouriteIds.value.includes(Number(gameId));
}

function toggleFavourite(gameId) {
  const id = Number(gameId);

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

/* =========================================================
   Tabs / Provider Actions
   ========================================================= */

function selectMainTab(tabKey) {
  activeMainTab.value = tabKey;
}

function selectProvider(providerKey) {
  activeProvider.value = providerKey;

  if (activeMainTab.value === "favourite") {
    activeMainTab.value = "all";
  }
}
</script>
