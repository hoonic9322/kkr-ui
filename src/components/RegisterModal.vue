<template>
  <Teleport to="body">
    <div v-if="modelValue" class="register-modal-mask">
      <div class="register-modal">
        <button type="button" class="register-modal-close" @click="closeModal">
          <i class="bi bi-x-lg"></i>
        </button>

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
            :class="{ active: activeTab === 'mobileOtp' }"
            @click="activeTab = 'mobileOtp'"
          >
            {{ t("register.mobileOtpRegister") }}
          </button>
        </div>

        <!-- Account Register -->
        <form
          v-if="activeTab === 'account'"
          class="register-form"
          @submit.prevent="submitRegister"
        >
          <div class="register-field">
            <span class="register-required">*</span>

            <div class="register-input-wrap">
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
                <i
                  :class="
                    showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'
                  "
                ></i>
              </button>
            </div>
          </div>

          <div class="register-field">
            <span class="register-required">*</span>

            <div class="register-input-wrap">
              <input
                v-model.trim="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                :placeholder="t('register.confirmPasswordPlaceholder')"
              />

              <button
                type="button"
                class="register-eye-btn"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i
                  :class="
                    showConfirmPassword
                      ? 'bi bi-eye-fill'
                      : 'bi bi-eye-slash-fill'
                  "
                ></i>
              </button>
            </div>
          </div>

          <p class="register-field-tip">
            <span>*</span>
            {{ t("register.requiredTipText") }}
          </p>

          <div class="register-action-row">
            <button
              type="button"
              class="register-btn cancel"
              @click="closeModal"
            >
              {{ t("register.cancel") }}
            </button>

            <button type="submit" class="register-btn submit">
              {{ t("common.register") }}
            </button>
          </div>

          <div class="register-promo-banner">
            <div class="register-promo-image-wrap">
              <img
                src="/images/activities/activity-1.png"
                alt="Register Promotion"
                loading="lazy"
              />
            </div>

            <div class="register-promo-content">
              <h3>{{ t("promotion.fifaTitle") }}</h3>
              <p>{{ t("promotion.fifaDesc") }}</p>
            </div>
          </div>
        </form>

        <!-- Mobile OTP Register -->
        <form v-else class="register-form" @submit.prevent="submitRegister">
          <div class="register-phone-row register-phone-row-full">
            <div class="register-phone-code">
              <span class="register-required">*</span>

              <select
                v-model="form.countryCode"
                class="register-country-select"
              >
                <option
                  v-for="country in iddOptions"
                  :key="country.value"
                  :value="country.value"
                >
                  {{ t(country.labelKey) }} {{ country.value }}
                </option>
              </select>
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

          <div class="register-field register-otp-field">
            <span class="register-required">*</span>

            <div class="register-input-wrap">
              <input
                v-model.trim="form.otp"
                type="text"
                inputmode="numeric"
                autocomplete="one-time-code"
                :placeholder="t('register.otpPlaceholder')"
              />

              <button
                type="button"
                class="register-otp-btn"
                :disabled="otpCountdown > 0"
                @click="sendOtp"
              >
                {{
                  otpCountdown > 0 ? `${otpCountdown}s` : t("register.sendOtp")
                }}
              </button>
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
                <i
                  :class="
                    showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'
                  "
                ></i>
              </button>
            </div>
          </div>

          <div class="register-field">
            <span class="register-required">*</span>

            <div class="register-input-wrap">
              <input
                v-model.trim="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                :placeholder="t('register.confirmPasswordPlaceholder')"
              />

              <button
                type="button"
                class="register-eye-btn"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i
                  :class="
                    showConfirmPassword
                      ? 'bi bi-eye-fill'
                      : 'bi bi-eye-slash-fill'
                  "
                ></i>
              </button>
            </div>
          </div>

          <p class="register-field-tip">
            <span>*</span>
            {{ t("register.requiredTipText") }}
          </p>

          <div class="register-action-row">
            <button
              type="button"
              class="register-btn cancel"
              @click="closeModal"
            >
              {{ t("register.cancel") }}
            </button>

            <button type="submit" class="register-btn submit">
              {{ t("common.register") }}
            </button>
          </div>

          <div class="register-promo-banner">
            <div class="register-promo-image-wrap">
              <img
                src="/images/activities/activity-1.png"
                alt="Register Promotion"
                loading="lazy"
              />
            </div>

            <div class="register-promo-content">
              <h3>{{ t("promotion.fifaTitle") }}</h3>
              <p>{{ t("promotion.fifaDesc") }}</p>
            </div>
          </div>
        </form>

        <div class="register-login-link">
          {{ t("register.hasAccount") }}
          <button type="button" @click="switchToLogin">
            {{ t("common.login") }}
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

const emit = defineEmits(["update:modelValue", "switch-login"]);

const { t } = useI18n();

const activeTab = ref("account");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const otpCountdown = ref(0);

let otpTimer = null;

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
  confirmPassword: "",
  countryCode: "+855",
  phone: "",
  otp: "",
});

watch(
  () => props.modelValue,
  (isOpen) => {
    document.body.classList.toggle("register-modal-open", isOpen);
  },
);

onBeforeUnmount(() => {
  document.body.classList.remove("register-modal-open");

  if (otpTimer) {
    window.clearInterval(otpTimer);
    otpTimer = null;
  }
});

function closeModal() {
  emit("update:modelValue", false);
}

function switchToLogin() {
  emit("update:modelValue", false);
  emit("switch-login");
}

function sendOtp() {
  if (!form.phone || otpCountdown.value > 0) {
    return;
  }

  otpCountdown.value = 60;

  otpTimer = window.setInterval(() => {
    otpCountdown.value -= 1;

    if (otpCountdown.value <= 0) {
      window.clearInterval(otpTimer);
      otpTimer = null;
    }
  }, 1000);
}

function submitRegister() {
  console.log("Register form:", {
    type: activeTab.value,
    ...form,
  });
}
</script>
