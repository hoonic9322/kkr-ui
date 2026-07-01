<template>
  <section class="vip-page">
    <div class="vip-container">
      <!-- Current VIP Status -->
      <!-- Only show when user is logged in -->
      <section v-if="isLoggedIn" class="vip-status-card">
        <div class="vip-status-left">
          <div class="vip-current-medal">
            <img :src="getPublicImage(currentVip.imageUrl)" :alt="t('vip.level', { level: currentVip.level })"
              class="vip-current-medal-img" />
          </div>

          <div class="vip-current-info">
            <p class="vip-kicker">{{ t("vip.currentVip") }}</p>

            <h1>{{ t("vip.level", { level: currentVip.level }) }}</h1>

            <div class="vip-progress-meta">
              <span>
                {{ currentVip.currentTurnover }} /
                {{ currentVip.targetTurnover }}
              </span>

              <b>{{ currentVip.percent }}%</b>
            </div>

            <div class="vip-progress-track">
              <div class="vip-progress-fill" :style="{ width: `${currentVip.percent}%` }"></div>

              <em :style="{ left: `${currentVip.percent}%` }">
                {{ currentVip.currentTurnover }}
              </em>
            </div>

            <div class="vip-status-bottom">
              <span>
                {{
                  t("vip.retainRemain", {
                    amount: currentVip.retainRemain,
                  })
                }}
              </span>

              <span>
                {{
                  t("vip.upgradeRemain", {
                    amount: currentVip.upgradeRemain,
                  })
                }}
              </span>
            </div>
          </div>
        </div>

        <div class="vip-daily-reward">
          <p>{{ t("vip.dailyReward") }}</p>

          <div class="vip-reward-amount-row">
            <strong>$ {{ currentVip.dailyReward }}</strong>

            <button type="button">
              {{ t("vip.claim") }}
            </button>
          </div>

          <span>
            {{
              t("vip.claimRemain", {
                amount: currentVip.claimRemain,
              })
            }}
          </span>
        </div>
      </section>

      <!-- VIP Table + Rules -->
      <section class="vip-table-panel">
        <div class="vip-panel-head">
          <div>
            <p>{{ t("vip.panelKicker") }}</p>
            <h2>{{ t("vip.benefitTitle") }}</h2>
          </div>

          <span>{{ t("vip.benefitSubtitle") }}</span>
        </div>

        <div class="vip-table-scroll">
          <div class="vip-table">
            <!-- Header -->
            <div class="vip-grid-header">
              <div class="vip-feature-head">
                {{ t("vip.levelPrivilege") }}
              </div>

              <div v-for="level in vipLevels" :key="level.key" class="vip-tier-head" :style="{
                '--vip-tier-color': level.color,
                '--vip-tier-glow': level.glow,
                '--vip-tier-soft': level.soft,
              }">
                <div class="vip-tier-medal">
                  <img :src="getPublicImage(level.imageUrl)" :alt="level.name" class="vip-tier-medal-img" loading="lazy" />
                </div>

                <strong>{{ level.name }}</strong>
              </div>
            </div>

            <!-- Sections -->
            <template v-for="section in tableSections" :key="section.key">
              <div class="vip-section-row">
                <div class="vip-section-title">
                  {{ t(section.titleKey) }}
                </div>

                <div v-for="level in vipLevels" :key="`${section.key}-${level.key}`" class="vip-section-fill"></div>
              </div>

              <div v-for="row in section.rows" :key="row.key" class="vip-grid-row">
                <div class="vip-feature-cell">
                  {{ t(row.labelKey) }}
                </div>

                <div v-for="(value, valueIndex) in row.values" :key="`${row.key}-${valueIndex}`" class="vip-value-cell">
                  {{ value }}
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Divider -->
        <div class="vip-panel-divider"></div>

        <!-- Rules inside same panel -->
        <div class="vip-rules-block">
          <h3>{{ t("vip.rulesTitle") }}</h3>

          <ol>
            <li v-for="rule in ruleKeys" :key="rule">
              {{ t(rule) }}
            </li>
          </ol>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { getPublicImage } from "../utils/imagePath";

const { t } = useI18n();

/* Temporary login flag
   Later when real login API is ready, replace this with user/auth store */
const isLoggedIn = computed(() => {
  return localStorage.getItem("kkrr_is_logged_in") === "1";
});

/* Keep this line as requested */
localStorage.removeItem("kkrr_is_logged_in");

const VIP_IMAGE_BASE = "/images/vip";

const currentVip = {
  level: 0,
  imageUrl: `${VIP_IMAGE_BASE}/vip0.png`,
  currentTurnover: "43.50",
  targetTurnover: "1500.00",
  percent: 6,
  retainRemain: "$ 0.00",
  upgradeRemain: "$ 1456.50",
  claimRemain: "$ 0.00",
  dailyReward: "0.00",
};

const vipLevels = [
  {
    key: "vip0",
    name: "VIP0",
    imageUrl: `${VIP_IMAGE_BASE}/vip0.png`,
    color: "#cfd5dd",
    glow: "rgba(207, 213, 221, 0.22)",
    soft: "rgba(207, 213, 221, 0.08)",
  },
  {
    key: "vip1",
    name: "VIP1",
    imageUrl: `${VIP_IMAGE_BASE}/vip1.png`,
    color: "#d8dde4",
    glow: "rgba(216, 221, 228, 0.24)",
    soft: "rgba(216, 221, 228, 0.08)",
  },
  {
    key: "vip2",
    name: "VIP2",
    imageUrl: `${VIP_IMAGE_BASE}/vip2.png`,
    color: "#ddd3a6",
    glow: "rgba(221, 211, 166, 0.24)",
    soft: "rgba(221, 211, 166, 0.08)",
  },
  {
    key: "vip3",
    name: "VIP3",
    imageUrl: `${VIP_IMAGE_BASE}/vip3.png`,
    color: "#e3cf93",
    glow: "rgba(227, 207, 147, 0.25)",
    soft: "rgba(227, 207, 147, 0.08)",
  },
  {
    key: "vip4",
    name: "VIP4",
    imageUrl: `${VIP_IMAGE_BASE}/vip4.png`,
    color: "#e6c97c",
    glow: "rgba(230, 201, 124, 0.26)",
    soft: "rgba(230, 201, 124, 0.09)",
  },
  {
    key: "vip5",
    name: "VIP5",
    imageUrl: `${VIP_IMAGE_BASE}/vip5.png`,
    color: "#ebc15f",
    glow: "rgba(235, 193, 95, 0.28)",
    soft: "rgba(235, 193, 95, 0.1)",
  },
  {
    key: "vip6",
    name: "VIP6",
    imageUrl: `${VIP_IMAGE_BASE}/vip6.png`,
    color: "#f0be4e",
    glow: "rgba(240, 190, 78, 0.3)",
    soft: "rgba(240, 190, 78, 0.1)",
  },
  {
    key: "vip7",
    name: "VIP7",
    imageUrl: `${VIP_IMAGE_BASE}/vip7.png`,
    color: "#f3c34a",
    glow: "rgba(243, 195, 74, 0.32)",
    soft: "rgba(243, 195, 74, 0.11)",
  },
  {
    key: "vip8",
    name: "VIP8",
    imageUrl: `${VIP_IMAGE_BASE}/vip8.png`,
    color: "#f6cb57",
    glow: "rgba(246, 203, 87, 0.34)",
    soft: "rgba(246, 203, 87, 0.11)",
  },
  {
    key: "vip9",
    name: "VIP9",
    imageUrl: `${VIP_IMAGE_BASE}/vip9.png`,
    color: "#f9d56f",
    glow: "rgba(249, 213, 111, 0.36)",
    soft: "rgba(249, 213, 111, 0.12)",
  },
  {
    key: "vip10",
    name: "VIP10",
    imageUrl: `${VIP_IMAGE_BASE}/vip10.png`,
    color: "#ffe08f",
    glow: "rgba(255, 224, 143, 0.4)",
    soft: "rgba(255, 224, 143, 0.13)",
  },
];

const tableSections = [
  {
    key: "vipBenefit",
    titleKey: "vip.sections.vipBenefit",
    rows: [
      {
        key: "upgradeTurnover",
        labelKey: "vip.rows.upgradeTurnover",
        values: [
          "$0",
          "$1,500",
          "$5,000",
          "$12,000",
          "$25,000",
          "$75,000",
          "$200,000",
          "$500,000",
          "$1,000,000",
          "$2,000,000",
          "$5,000,000",
        ],
      },
      {
        key: "retainTurnover",
        labelKey: "vip.rows.retainTurnover",
        values: [
          "$0",
          "$1,000",
          "$2,000",
          "$4,000",
          "$6,000",
          "$10,000",
          "$20,000",
          "$50,000",
          "$100,000",
          "$200,000",
          "$500,000",
        ],
      },
      {
        key: "dailyReward",
        labelKey: "vip.rows.dailyReward",
        values: [
          "$0",
          "$1",
          "$2",
          "$3",
          "$4",
          "$6",
          "$8",
          "$10",
          "$15",
          "$20",
          "$30",
        ],
      },
      {
        key: "upgradeReward",
        labelKey: "vip.rows.upgradeReward",
        values: [
          "$0",
          "$4",
          "$6",
          "$8",
          "$12",
          "$18",
          "$25",
          "$40",
          "$60",
          "$100",
          "$200",
        ],
      },
    ],
  },
];

const ruleKeys = [
  "vip.rules.rule1",
  "vip.rules.rule2",
  "vip.rules.rule3",
  "vip.rules.rule4",
  "vip.rules.rule5",
  "vip.rules.rule6",
];
</script>