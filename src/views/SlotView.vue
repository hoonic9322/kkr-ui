<template>
  <section class="home-game-showcase">
    <div class="showcase-topbar">
      <div class="showcase-topbar-left">
        <button type="button" class="showcase-tab active">
          {{ t("home.hotGames") }}
        </button>

        <div class="showcase-provider">
          <img
            src="/images/providers/PG-logo-light.png"
            alt="PG Logo"
            class="showcase-provider-logo"
          />
          <span>{{ t("home.officialDirect") }}</span>
        </div>
      </div>

      <button type="button" class="showcase-lobby-btn">
        {{ t("home.goGameLobby") }}
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <Transition :name="transitionName" mode="out-in">
      <div :key="pageIndex" class="showcase-grid">
        <article
          v-for="game in visibleGames"
          :key="game.id"
          class="showcase-game-card"
        >
          <img
            :src="game.imageUrl"
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
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const pageSize = 24;
const pageIndex = ref(0);
const transitionName = ref("showcase-slide-next");

const games = [
  {
    id: 1,
    titleKey: "slot.games.mahjongWays",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot1.png",
    badgeKey: "slot.badges.exclusive",
  },
  {
    id: 2,
    titleKey: "slot.games.bountyShowdown",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot2.png",
    badgeKey: "slot.badges.promo",
  },
  {
    id: 3,
    titleKey: "slot.games.treasuresOfAztec",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot3.png",
    badgeKey: "",
  },
  {
    id: 4,
    titleKey: "slot.games.undeadBandit",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot4.png",
    badgeKey: "",
  },
  {
    id: 5,
    titleKey: "slot.games.mahjongWays2",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot5.png",
    badgeKey: "slot.badges.exclusive",
  },
  {
    id: 6,
    titleKey: "slot.games.bountyQueen",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot6.png",
    badgeKey: "",
  },
  {
    id: 7,
    titleKey: "slot.games.shaolinSoccer",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot7.png",
    badgeKey: "",
  },
  {
    id: 8,
    titleKey: "slot.games.fortuneCat",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot8.png",
    badgeKey: "",
  },
  {
    id: 9,
    titleKey: "slot.games.flirtingScholar",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot9.png",
    badgeKey: "",
  },
  {
    id: 10,
    titleKey: "slot.games.apeUniverse",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot10.png",
    badgeKey: "",
  },
  {
    id: 11,
    titleKey: "slot.games.goldenShooter",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot11.png",
    badgeKey: "",
  },
  {
    id: 12,
    titleKey: "slot.games.anubis",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot12.png",
    badgeKey: "",
  },
  {
    id: 13,
    titleKey: "slot.games.godOfWealth",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot13.png",
    badgeKey: "",
  },
  {
    id: 14,
    titleKey: "slot.games.gemMiner",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot14.png",
    badgeKey: "",
  },
  {
    id: 15,
    titleKey: "slot.games.bountyCaptain",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot15.png",
    badgeKey: "",
  },
  {
    id: 16,
    titleKey: "slot.games.kirinTreasure",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot16.png",
    badgeKey: "",
  },
  {
    id: 17,
    titleKey: "slot.games.dragonHunt",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot17.png",
    badgeKey: "slot.badges.latest",
  },
  {
    id: 18,
    titleKey: "slot.games.doubleHappiness",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot18.png",
    badgeKey: "slot.badges.latest",
  },
  {
    id: 19,
    titleKey: "slot.games.iceSnowRush",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot19.png",
    badgeKey: "",
  },
  {
    id: 20,
    titleKey: "slot.games.fortuneGod",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot20.png",
    badgeKey: "",
  },
  {
    id: 21,
    titleKey: "slot.games.macauDream",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot21.png",
    badgeKey: "",
  },
  {
    id: 22,
    titleKey: "slot.games.goldenBull",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot22.png",
    badgeKey: "",
  },
  {
    id: 23,
    titleKey: "slot.games.goldenMoneyTree",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot23.png",
    badgeKey: "",
  },
  {
    id: 24,
    titleKey: "slot.games.egyptSecrets",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot24.png",
    badgeKey: "",
  },
  {
    id: 25,
    titleKey: "slot.games.phoenixLegend",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot25.png",
    badgeKey: "slot.badges.latest",
  },
  {
    id: 26,
    titleKey: "slot.games.fireTreeFortune",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot26.png",
    badgeKey: "",
  },
  {
    id: 27,
    titleKey: "slot.games.thaiWaterMagic",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot27.png",
    badgeKey: "",
  },
  {
    id: 28,
    titleKey: "slot.games.baliJourney",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot28.png",
    badgeKey: "",
  },
  {
    id: 29,
    titleKey: "slot.games.dinosaurEmpire",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot29.png",
    badgeKey: "",
  },
  {
    id: 30,
    titleKey: "slot.games.nightBeauty",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot30.png",
    badgeKey: "",
  },
  {
    id: 31,
    titleKey: "slot.games.tigerFortune",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot31.png",
    badgeKey: "",
  },
  {
    id: 32,
    titleKey: "slot.games.speedWinner",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot32.png",
    badgeKey: "",
  },
  {
    id: 33,
    titleKey: "slot.games.mafiaStorm",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot33.png",
    badgeKey: "",
  },
  {
    id: 34,
    titleKey: "slot.games.underworldGlory",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot34.png",
    badgeKey: "",
  },
  {
    id: 35,
    titleKey: "slot.games.werewolfLegend",
    providerKey: "slot.providers.pg",
    imageUrl: "/images/slots/slot35.png",
    badgeKey: "",
  },
];

const totalPages = computed(() => {
  return Math.ceil(games.length / pageSize);
});

const visibleGames = computed(() => {
  const start = pageIndex.value * pageSize;
  const end = start + pageSize;

  return games.slice(start, end);
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
