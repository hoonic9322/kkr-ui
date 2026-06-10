<template>
  <section class="slot-lobby-page">
    <!-- Top category tabs - follow image 1 design -->
    <div class="slot-lobby-main-tabs">
      <button
        v-for="tab in mainTabs"
        :key="tab.key"
        type="button"
        class="slot-main-tab"
        :class="{ active: activeMainTab === tab.key }"
        @click="activeMainTab = tab.key"
      >
        {{ t(tab.labelKey) }}
      </button>
    </div>

    <!-- Provider buttons - follow image 2 design -->
    <div class="slot-lobby-provider-bar">
      <button
        v-for="provider in providers"
        :key="provider.key"
        type="button"
        class="slot-provider-tab"
        :class="{ active: activeProvider === provider.key }"
        @click="activeProvider = provider.key"
      >
        <img
          v-if="provider.logo"
          :src="provider.logo"
          :alt="provider.shortName"
          class="slot-provider-logo"
        />

        <span v-else class="slot-provider-short">
          {{ provider.shortName }}
        </span>

        <small>{{ t(provider.labelKey) }}</small>
      </button>
    </div>

    <!-- Section title -->
    <div class="slot-lobby-section-title">
      <h2>{{ t("home.hotGames") }}</h2>

      <div class="slot-lobby-provider-name">
        <img
          v-if="activeProviderLogo"
          :src="activeProviderLogo"
          :alt="activeProviderShort"
          class="slot-lobby-title-logo"
        />
        <strong v-else>{{ activeProviderShort }}</strong>

        <span>{{ activeProviderLabel }}</span>
      </div>
    </div>

    <!-- Game grid -->
    <div class="slot-lobby-grid">
      <article
        v-for="game in filteredGames"
        :key="game.id"
        class="slot-lobby-card"
      >
        <button type="button" class="slot-favorite-btn">
          <i class="bi bi-heart"></i>
        </button>

        <img
          :src="getGameImage(game)"
          :alt="t(game.titleKey)"
          class="slot-lobby-img"
        />

        <div class="slot-lobby-overlay">
          <h3>{{ t(game.titleKey) }}</h3>
          <p>{{ t(game.providerKey) }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { slotGames } from "../data/slotGames";

const { t, locale } = useI18n();

const activeMainTab = ref("providers");
const activeProvider = ref("pg");

const mainTabs = [
  {
    key: "providers",
    labelKey: "slot.lobby.providers",
  },
  {
    key: "top",
    labelKey: "slot.lobby.top",
  },
  {
    key: "new",
    labelKey: "slot.lobby.new",
  },
  {
    key: "popular",
    labelKey: "slot.lobby.popular",
  },
  {
    key: "exclusive",
    labelKey: "slot.lobby.exclusive",
  },
];

const providers = [
  {
    key: "pg",
    labelKey: "slot.providers.pg",
    shortName: "PG",
    logo: "/images/providers/PG-logo-light.png",
  },
  {
    key: "pp",
    labelKey: "slot.providers.pp",
    shortName: "PP",
    logo: "",
  },
  {
    key: "ygg",
    labelKey: "slot.providers.ygg",
    shortName: "YGG",
    logo: "",
  },
  {
    key: "cq9",
    labelKey: "slot.providers.cq9",
    shortName: "CQ9",
    logo: "",
  },
  {
    key: "db",
    labelKey: "slot.providers.db",
    shortName: "DB",
    logo: "",
  },
  {
    key: "jili",
    labelKey: "slot.providers.jili",
    shortName: "JILI",
    logo: "",
  },
];

const getCurrentLang = () => {
  return String(locale.value).startsWith("zh") ? "zh" : "en";
};

const getGameImage = (game) => {
  const currentLang = getCurrentLang();
  return game.imageLocale?.[currentLang] || game.imageUrl;
};

const activeProviderInfo = computed(() => {
  return providers.find((item) => item.key === activeProvider.value) || providers[0];
});

const activeProviderLogo = computed(() => {
  return activeProviderInfo.value?.logo || "";
});

const activeProviderShort = computed(() => {
  return activeProviderInfo.value?.shortName || "";
});

const activeProviderLabel = computed(() => {
  return activeProviderInfo.value ? t(activeProviderInfo.value.labelKey) : "";
});

const filteredGames = computed(() => {
  let result = slotGames.filter((game) => game.provider === activeProvider.value);

  // 这里先保留 UI 切换，之后如果你要真实筛选，再给 slotGames 加 tags
  if (activeMainTab.value === "providers") {
    return result;
  }

  if (activeMainTab.value === "top") {
    return result;
  }

  if (activeMainTab.value === "new") {
    return result.filter((game) => game.badgeKey === "slot.badges.latest");
  }

  if (activeMainTab.value === "exclusive") {
    return result.filter((game) => game.badgeKey === "slot.badges.exclusive");
  }

  if (activeMainTab.value === "popular") {
    return result;
  }

  return result;
});
</script>