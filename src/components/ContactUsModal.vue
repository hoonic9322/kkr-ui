<template>
  <Teleport to="body">
    <div v-if="modelValue" class="contact-modal-mask" @click.self="closeModal">
      <div class="contact-modal">
        <button type="button" class="contact-modal-close" @click="closeModal">
          <i class="bi bi-x-lg"></i>
        </button>

        <div class="contact-modal-layout">
          <!-- Left Visual Panel -->
          <div class="contact-modal-visual">
            <div class="contact-visual-glow"></div>

            <div class="contact-visual-content">
              <p class="contact-visual-kicker">
                {{ tt("contact.kicker", "Customer Support") }}
              </p>

              <h2>
                {{ tt("contact.title", "Contact Us") }}
              </h2>

              <p class="contact-visual-desc">
                {{
                  tt(
                    "contact.subtitle",
                    "Choose your preferred contact method to reach our customer service team."
                  )
                }}
              </p>

              <div class="contact-download-card">
                <span>{{ tt("contact.downloadTitle", "Download Our App") }}</span>

                <div class="contact-download-row">
                  <button type="button">
                    <i class="bi bi-apple"></i>
                    App Store
                  </button>

                  <button type="button">
                    <i class="bi bi-google-play"></i>
                    Google Play
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Contact List -->
          <div class="contact-modal-main">
            <div class="contact-modal-head">
              <h3>
                {{ tt("contact.welcomeTitle", "欢迎通过以下方式联系客服") }}
              </h3>

              <p>
                {{
                  tt(
                    "contact.welcomeSubtitle",
                    "Select one of the channels below for assistance."
                  )
                }}
              </p>
            </div>

            <div class="contact-channel-list">
              <a
                v-for="item in contactItems"
                :key="item.key"
                class="contact-channel-card"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="contact-channel-icon" :class="item.theme">
                  <i :class="item.icon"></i>
                </span>

                <span class="contact-channel-info">
                  <strong>{{ tt(item.labelKey, item.fallbackLabel) }}</strong>
                  <b>{{ item.value }}</b>
                </span>

                <i class="bi bi-chevron-right contact-channel-arrow"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { t, te } = useI18n();

const tt = (key, fallback) => {
  return te(key) ? t(key) : fallback;
};

const contactItems = [
  {
    key: "huichong",
    labelKey: "contact.huichong",
    fallbackLabel: "汇旺充值客服",
    value: "@K8cs10",
    icon: "bi bi-send-fill",
    theme: "telegram",
    href: "https://t.me/K8cs10",
  },
  {
    key: "wechat",
    labelKey: "contact.wechat",
    fallbackLabel: "下载默往APP添加下方默往号",
    value: "k6688vip",
    icon: "bi bi-chat-dots-fill",
    theme: "wechat",
    href: "javascript:void(0)",
  },
  {
    key: "whatsapp",
    labelKey: "contact.whatsapp",
    fallbackLabel: "whatsApp",
    value: "+85588895138",
    icon: "bi bi-whatsapp",
    theme: "whatsapp",
    href: "https://wa.me/85588895138",
  },
  {
    key: "telegram",
    labelKey: "contact.telegram",
    fallbackLabel: "telegram",
    value: "@K8cs1",
    icon: "bi bi-telegram",
    theme: "telegram",
    href: "https://t.me/K8cs1",
  },
];

watch(
  () => props.modelValue,
  (isOpen) => {
    document.body.classList.toggle("contact-modal-open", isOpen);
  },
);

onBeforeUnmount(() => {
  document.body.classList.remove("contact-modal-open");
});

function closeModal() {
  emit("update:modelValue", false);
}
</script>