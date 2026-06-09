<template>
    <section class="home-game-showcase">
        <div class="showcase-topbar">
            <div class="showcase-topbar-left">
                <button type="button" class="showcase-tab active">
                    {{ t("home.hotGames") }}
                </button>

                <div class="showcase-provider">
                    <img src="/images/providers/PG-logo-light.png" alt="PG Logo" class="showcase-provider-logo" />
                    <span>{{ t("home.officialDirect") }}</span>
                </div>
            </div>

            <button type="button" class="showcase-lobby-btn">
                {{ t("home.goGameLobby") }}
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>

        <div class="showcase-grid">
            <article v-for="game in games" :key="game.id" class="showcase-game-card">
                <img :src="game.imageUrl" :alt="t(game.titleKey)" class="showcase-game-img" />

                <span v-if="game.badgeKey" class="showcase-game-badge">
                    {{ t(game.badgeKey) }}
                </span>

                <div class="showcase-game-overlay">
                    <h3>{{ t(game.titleKey) }}</h3>
                    <p>{{ t(game.providerKey) }}</p>
                </div>


            </article>
        </div>

        <div class="showcase-carousel-dots">
            <button type="button" class="showcase-dot-nav">
                <i class="bi bi-chevron-left"></i>
            </button>

            <button type="button" class="showcase-dot active"></button>
            <button type="button" class="showcase-dot"></button>
            <button type="button" class="showcase-dot"></button>

            <button type="button" class="showcase-dot-nav">
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
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
        titleKey: "slot.games.mahjongMania2",
        providerKey: "slot.providers.ygg",
        imageUrl: "/images/slots/slot15.png",
        badgeKey: "",
    },
    {
        id: 16,
        titleKey: "slot.games.mahjongOrigin",
        providerKey: "slot.providers.ps",
        imageUrl: "/images/slots/slot16.png",
        badgeKey: "",
    },
    {
        id: 17,
        titleKey: "slot.games.fireInTheHole2",
        providerKey: "slot.providers.nlc",
        imageUrl: "/images/slots/slot17.png",
        badgeKey: "slot.badges.latest",
    },
    {
        id: 18,
        titleKey: "slot.games.sanQuentin",
        providerKey: "slot.providers.nlc",
        imageUrl: "/images/slots/slot18.png",
        badgeKey: "slot.badges.latest",
    },
    {
        id: 19,
        titleKey: "slot.games.fortuneToad",
        providerKey: "slot.providers.db",
        imageUrl: "/images/slots/slot19.png",
        badgeKey: "",
    },
    {
        id: 20,
        titleKey: "slot.games.superAce",
        providerKey: "slot.providers.db",
        imageUrl: "/images/slots/slot20.png",
        badgeKey: "",
    },
    {
        id: 21,
        titleKey: "slot.games.mahjongFiveDragons",
        providerKey: "slot.providers.fiveG",
        imageUrl: "/images/slots/slot21.png",
        badgeKey: "",
    },
    {
        id: 22,
        titleKey: "slot.games.fiveLionsMegaways",
        providerKey: "slot.providers.pp",
        imageUrl: "/images/slots/slot22.png",
        badgeKey: "",
    },
    {
        id: 23,
        titleKey: "slot.games.mahjongBigWin",
        providerKey: "slot.providers.pp",
        imageUrl: "/images/slots/slot23.png",
        badgeKey: "",
    },
    {
        id: 24,
        titleKey: "slot.games.tombstoneRip",
        providerKey: "slot.providers.nlc",
        imageUrl: "/images/slots/slot24.png",
        badgeKey: "",
    },
];
</script>