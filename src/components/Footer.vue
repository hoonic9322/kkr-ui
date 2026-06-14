<template>
  <footer class="new-footer">
    <div class="new-footer-container">
      <!-- Security -->

      <div class="footer-brand-group">
        <h4 class="footer-group-title">
          {{ t("footer.security") }}
        </h4>

        <div class="footer-logo-list footer-logo-list-vertical">
          <div class="footer-logo-row">
            <img src="/images/footer/iovation-gray.png" alt="Iovation" />
            <img src="/images/footer/threat-metrix.svg" alt="ThreatMetrix" />
          </div>
        </div>
      </div>

      <!-- Payment Method -->

      <div class="footer-brand-group">
        <h4 class="footer-group-title">
          {{ t("footer.paymentMethod") }}
        </h4>

        <div class="footer-payment-grid">
          <img src="/images/footer/aba.png" alt="ABA" />
          <img src="/images/footer/acleda.png" alt="Acleda" />
          <img src="/images/footer/wing.png" alt="Wing Bank" />
          <img src="/images/footer/khqr.png" alt="KHQR" />
          <img src="/images/footer/ftr_usdt_grey.svg" alt="USDT" />
        </div>
      </div>

      <!-- Responsible Gaming -->
      <div class="footer-brand-group">
        <h4 class="footer-group-title">
          {{ t("footer.responsibleGaming") }}
        </h4>

        <div class="footer-logo-list footer-logo-list-vertical">
          <div class="footer-logo-row">
            <img src="/images/footer/18-above.svg" alt="18+" />
            <img src="/images/footer/gamcare.svg" alt="GamCare" />
            <img src="/images/footer/bga.svg" alt="Be Gamble Aware" />
          </div>
        </div>
      </div>

      <!-- Certification -->

      <div class="footer-brand-group">
        <h4 class="footer-group-title">
          {{ t("footer.certification") }}
        </h4>

        <div class="footer-cert-grid">
          <img src="/images/footer/bmm-gray.png" alt="BMM" />
          <img src="/images/footer/itechlab-gray.png" alt="iTech Labs" />
          <img src="/images/footer/global-gray.png" alt="GLI" />
          <img src="/images/footer/payouts-gray.png" alt="Approved" />
        </div>
      </div>
    </div>

    <!-- Bottom Link Section -->
    <div class="new-footer-bottom">
      <div class="new-footer-bottom-inner">
        <div class="footer-left-group">
          <div class="footer-brand-mini">
            <img src="/images/logo.png" alt="KKR" />
          </div>

          <div class="footer-copyright-group">
            <p class="footer-copyright">
              {{ t("footer.copyright") }}
            </p>

            <img
              src="/images/footer/18-above.svg"
              alt="18+"
              class="footer-age-icon"
            />
          </div>
        </div>

        <nav class="footer-link-nav">
          <template v-for="(link, index) in footerLinks" :key="link.key">
            <a href="#">
              {{ t(link.labelKey) }}
            </a>

            <span v-if="index < footerLinks.length - 1"></span>
          </template>
        </nav>

        <div class="footer-social-list">
          <a href="#" class="footer-social-item youtube" aria-label="YouTube">
            <i class="bi bi-youtube"></i>
          </a>

          <a href="#" class="footer-social-item facebook" aria-label="Facebook">
            <i class="bi bi-facebook"></i>
          </a>

          <a
            href="#"
            class="footer-social-item instagram"
            aria-label="Instagram"
          >
            <i class="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const footerLinks = [
  {
    key: "aboutUs",
    labelKey: "footer.aboutUs",
  },
  {
    key: "openAccount",
    labelKey: "footer.openAccount",
  },
  {
    key: "termsConditions",
    labelKey: "footer.termsConditions",
  },
  {
    key: "responsibleGaming",
    labelKey: "footer.responsibleGaming",
  },
  {
    key: "affiliateProgram",
    labelKey: "footer.affiliateProgram",
  },
];
</script>
