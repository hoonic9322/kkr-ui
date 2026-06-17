<template>
  <Teleport to="body">
    <div v-if="modelValue" class="login-modal-mask">
      <div class="login-modal">
        <button type="button" class="login-modal-close" @click="closeModal">
          <i class="bi bi-x-lg"></i>
        </button>

        <div class="login-tabs">
          <button
            type="button"
            class="login-tab"
            :class="{ active: activeTab === 'account' }"
            @click="activeTab = 'account'"
          >
            {{ t("login.accountLogin") }}
          </button>

          <button
            type="button"
            class="login-tab"
            :class="{ active: activeTab === 'mobile' }"
            @click="activeTab = 'mobile'"
          >
            {{ t("login.mobileLogin") }}
          </button>
        </div>

        <!-- Account Login -->
        <form
          v-if="activeTab === 'account'"
          class="login-form"
          @submit.prevent="submitLogin"
        >
          <div class="login-field">
            <span class="login-required">*</span>

            <div class="login-input-wrap">
              <input
                v-model.trim="form.username"
                type="text"
                autocomplete="username"
                :placeholder="t('login.usernamePlaceholder')"
              />
            </div>
          </div>

          <div class="login-field">
            <span class="login-required">*</span>

            <div class="login-input-wrap">
              <input
                v-model.trim="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                :placeholder="t('login.passwordPlaceholder')"
              />

              <button
                type="button"
                class="login-eye-btn"
                @click="showPassword = !showPassword"
              >
                <i
                  :class="
                    showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'
                  "
                ></i>
              </button>
            </div>
          </div>

          <div class="login-option-row">
            <label class="login-remember">
              <input v-model="form.remember" type="checkbox" />
              <span>{{ t("login.rememberPassword") }}</span>
            </label>

            <button type="button" class="login-forgot-btn">
              {{ t("login.forgotPassword") }}
            </button>
          </div>

          <button type="submit" class="login-submit-btn">
            {{ t("common.login") }}
          </button>

          <div class="login-promo-banner">
            <div class="login-promo-image-wrap">
              <img
                src="/images/activities/activity-1.png"
                alt="Login Promotion"
                loading="lazy"
              />
            </div>

            <div class="login-promo-content">
              <h3>{{ t("promotion.fifaTitle") }}</h3>
              <p>{{ t("promotion.fifaDesc") }}</p>
            </div>
          </div>
        </form>

        <!-- Mobile Login -->
        <form v-else class="login-form" @submit.prevent="submitLogin">
          <div class="login-phone-row">
            <div class="login-phone-code">
              <span class="login-required">*</span>

              <select v-model="form.countryCode" class="login-country-select">
                <option
                  v-for="country in iddOptions"
                  :key="country.value"
                  :value="country.value"
                >
                  {{ t(country.labelKey) }} {{ country.value }}
                </option>
              </select>
            </div>

            <div class="login-phone-input-wrap">
              <input
                v-model.trim="form.phone"
                type="tel"
                inputmode="tel"
                autocomplete="off"
                name="kkr_login_mobile_no"
                :placeholder="t('login.phonePlaceholder')"
              />
            </div>
          </div>

          <div class="login-field">
            <span class="login-required">*</span>

            <div class="login-input-wrap">
              <input
                v-model.trim="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                :placeholder="t('login.passwordPlaceholder')"
              />

              <button
                type="button"
                class="login-eye-btn"
                @click="showPassword = !showPassword"
              >
                <i
                  :class="
                    showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'
                  "
                ></i>
              </button>
            </div>
          </div>

          <div class="login-option-row is-right">
            <button type="button" class="login-forgot-btn">
              {{ t("login.forgotPassword") }}
            </button>
          </div>

          <button type="submit" class="login-submit-btn">
            {{ t("common.login") }}
          </button>

          <div class="login-promo-banner">
            <div class="login-promo-image-wrap">
              <img
                src="/images/activities/activity-1.png"
                alt="Login Promotion"
                loading="lazy"
              />
            </div>

            <div class="login-promo-content">
              <h3>{{ t("promotion.fifaTitle") }}</h3>
              <p>{{ t("promotion.fifaDesc") }}</p>
            </div>
          </div>
        </form>

        <div class="login-register-link">
          {{ t("login.noAccount") }}
          <button type="button" @click="switchToRegister">
            {{ t("login.registerNow") }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "switch-register"]);

const { t } = useI18n();

const activeTab = ref("account");
const showPassword = ref(false);

const iddOptions = [
  {
    labelKey: "register.iddCambodia",
    value: "+855",
  },
  {
    labelKey: "register.iddChina",
    value: "+86",
  },
];

const form = reactive({
  username: "",
  password: "",
  countryCode: "+855",
  phone: "",
  remember: true,
});

watch(
  () => props.modelValue,
  (isOpen) => {
    document.body.classList.toggle("login-modal-open", isOpen);
  },
);

onBeforeUnmount(() => {
  document.body.classList.remove("login-modal-open");
});

function closeModal() {
  emit("update:modelValue", false);
}

function switchToRegister() {
  emit("update:modelValue", false);
  emit("switch-register");
}

function submitLogin() {
  console.log("Login form:", {
    type: activeTab.value,
    ...form,
  });
}
</script>