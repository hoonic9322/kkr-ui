<template>
  <Teleport to="body">
    <div v-if="modelValue" class="contact-modal-mask" @click.self="closeModal">
      <div class="contact-modal">
        <button type="button" class="contact-modal-close" @click="closeModal">
          <i class="bi bi-x-lg"></i>
        </button>

        <div class="contact-modal-layout">
          <!-- Left Image Panel -->
          <div class="contact-modal-visual">
            <div class="contact-visual-glow"></div>

            <img
              src="/images/contact/contact-left.jpg"
              :alt="t('contact.title')"
              class="contact-visual-img"
              loading="lazy"
            />

            <div class="contact-visual-content">
              <p class="contact-visual-kicker">
                {{ t("contact.kicker") }}
              </p>

              <h2>
                {{ t("contact.title") }}
              </h2>

              <p class="contact-visual-desc">
                {{ t("contact.subtitle") }}
              </p>
            </div>
          </div>

          <!-- Right Contact List -->
          <div class="contact-modal-main">
            <div class="contact-modal-head">
              <h3>
                {{ t("contact.welcomeTitle") }}
              </h3>

              <p>
                {{ t("contact.welcomeSubtitle") }}
              </p>
            </div>

            <div class="contact-channel-list">
              <a
                v-for="item in contactItems"
                :key="item.key"
                class="contact-channel-card"
                :href="item.href"
                :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener noreferrer' : undefined"
                @click="handleContactClick($event, item)"
              >
                <span class="contact-channel-icon" :class="item.theme">
                  <i :class="item.icon"></i>
                </span>

                <span class="contact-channel-info">
                  <strong>{{ t(item.labelKey) }}</strong>
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

const { t } = useI18n();

const contactItems = [
  {
    key: "huichong",
    labelKey: "contact.huichong",
    value: "@K8cs10",
    icon: "bi bi-send-fill",
    theme: "telegram",
    href: "https://t.me/K8cs10",
    external: true,
  },
  {
    key: "mowang",
    labelKey: "contact.mowang",
    value: "k6688vip",
    icon: "bi bi-chat-dots-fill",
    theme: "wechat",
    href: "#",
    external: false,
  },
  {
    key: "whatsapp",
    labelKey: "contact.whatsapp",
    value: "+85588895138",
    icon: "bi bi-whatsapp",
    theme: "whatsapp",
    href: "https://wa.me/85588895138",
    external: true,
  },
  {
    key: "telegram",
    labelKey: "contact.telegram",
    value: "@K8cs1",
    icon: "bi bi-telegram",
    theme: "telegram",
    href: "https://t.me/K8cs1",
    external: true,
  },
];

watch(
  () => props.modelValue,
  (isOpen) => {
    document.body.classList.toggle("contact-modal-open", isOpen);
  },
  {
    immediate: true,
  },
);

onBeforeUnmount(() => {
  document.body.classList.remove("contact-modal-open");
});

function closeModal() {
  emit("update:modelValue", false);
}

function handleContactClick(event, item) {
  if (!item.external) {
    event.preventDefault();
  }
}
</script>