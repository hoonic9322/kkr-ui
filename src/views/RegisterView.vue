<template>
  <section class="register-page">
    <div class="register-bg-pattern"></div>

    <div class="register-card">
      <!-- Tabs -->
      <div class="register-tabs">
        <button
          type="button"
          class="register-tab"
          :class="{ active: activeTab === 'account' }"
          @click="activeTab = 'account'"
        >
          {{ t("register.accountRegister") }}
        </button>

        <button
          type="button"
          class="register-tab"
          :class="{ active: activeTab === 'email' }"
          @click="activeTab = 'email'"
        >
          {{ t("register.emailRegister") }}
        </button>
      </div>

      <!-- Account Register Form -->
      <form v-if="activeTab === 'account'" class="register-form" @submit.prevent="submitRegister">
        <div class="register-field">
          <span class="register-required">*</span>

          <div class="register-input-wrap">
            <span class="register-prefix">m</span>

            <input
              v-model.trim="form.username"
              type="text"
              autocomplete="username"
              :placeholder="t('register.usernamePlaceholder')"
            />
          </div>
        </div>

        <div class="register-field">
          <span class="register-required">*</span>

          <div class="register-input-wrap">
            <input
              v-model.trim="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              :placeholder="t('register.passwordPlaceholder')"
            />

            <button
              type="button"
              class="register-eye-btn"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"></i>
            </button>
          </div>
        </div>

        <div class="register-phone-row">
          <div class="register-phone-code">
            <span class="register-required">*</span>

            <button type="button" class="register-country-btn">
              {{ selectedCountry }}
            </button>
          </div>

          <div class="register-phone-input-wrap">
            <input
              v-model.trim="form.phone"
              type="tel"
              autocomplete="tel"
              :placeholder="t('register.phonePlaceholder')"
            />
          </div>
        </div>

        <p class="register-field-tip">
          {{ t("register.requiredTip") }}
        </p>

        <div class="register-action-row">
          <button type="button" class="register-btn cancel" @click="resetForm">
            {{ t("common.cancel") }}
          </button>

          <button type="submit" class="register-btn submit">
            {{ t("common.register") }}
          </button>
        </div>

        <p class="register-terms">
          {{ t("register.agreeText") }}
          <RouterLink to="/terms">
            {{ t("register.terms") }}
          </RouterLink>
        </p>

        <div class="register-promo-banner">
          <img
            :src="getPublicImage('/images/register/register-promo-banner.png')"
            alt="Register Promotion"
            loading="lazy"
          />
        </div>
      </form>

      <!-- Email Register Form -->
      <form v-else class="register-form" @submit.prevent="submitRegister">
        <div class="register-field">
          <span class="register-required">*</span>

          <div class="register-input-wrap">
            <input
              v-model.trim="form.email"
              type="email"
              autocomplete="email"
              :placeholder="t('register.emailPlaceholder')"
            />
          </div>
        </div>

        <div class="register-field">
          <span class="register-required">*</span>

          <div class="register-input-wrap">
            <input
              v-model.trim="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              :placeholder="t('register.passwordPlaceholder')"
            />

            <button
              type="button"
              class="register-eye-btn"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"></i>
            </button>
          </div>
        </div>

        <p class="register-field-tip">
          {{ t("register.requiredTip") }}
        </p>

        <div class="register-action-row">
          <button type="button" class="register-btn cancel" @click="resetForm">
            {{ t("common.cancel") }}
          </button>

          <button type="submit" class="register-btn submit">
            {{ t("common.register") }}
          </button>
        </div>

        <p class="register-terms">
          {{ t("register.agreeText") }}
          <RouterLink to="/terms">
            {{ t("register.terms") }}
          </RouterLink>
        </p>

        <div class="register-promo-banner">
          <img
            :src="getPublicImage('/images/register/register-promo-banner.png')"
            alt="Register Promotion"
            loading="lazy"
          />
        </div>
      </form>

      <div class="register-login-link">
        {{ t("register.hasAccount") }}
        <RouterLink to="/login">
          {{ t("common.login") }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { getPublicImage } from "../utils/imagePath";

const { t } = useI18n();

const activeTab = ref("account");
const showPassword = ref(false);
const selectedCountry = ref("中国 +86");

const form = reactive({
  username: "",
  password: "",
  phone: "",
  email: "",
});

function resetForm() {
  form.username = "";
  form.password = "";
  form.phone = "";
  form.email = "";
}

function submitRegister() {
  // Demo only. Replace with API later.
  console.log("Register form:", {
    type: activeTab.value,
    ...form,
  });
}
</script>