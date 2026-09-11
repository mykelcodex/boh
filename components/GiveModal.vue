<template>
  <Teleport to="body">
    <div
      v-if="give.isOpen.value"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(8,17,29,0.6)] p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Bank transfer details"
      @click="give.close()"
    >
      <div
        class="max-h-[calc(100vh-48px)] w-full max-w-[520px] overflow-auto rounded-[10px] bg-white shadow-e4"
        @click.stop
      >
        <div
          class="flex items-start justify-between gap-4 border-b border-line px-5 py-6 sm:px-8"
        >
          <div>
            <p class="eyebrow mb-2">Give</p>
            <h2
              class="m-0 font-serif text-[clamp(21px,5vw,26px)] font-semibold text-ink"
            >
              Bank transfer
            </h2>
          </div>
          <button
            class="cursor-pointer p-1 text-muted"
            aria-label="Close"
            @click="give.close()"
          >
            <AppIcon name="close" :size="22" />
          </button>
        </div>
        <div class="px-5 pb-7 pt-6 sm:px-8">
          <p class="mb-5 text-[15px] leading-relaxed">
            Transfers go directly to the programme account. Send your reference
            by email and we will confirm receipt and issue a receipt.
          </p>
          <dl class="grid gap-3.5">
            <div
              v-for="row in rows"
              :key="row.label"
              class="flex justify-between gap-4 border-b border-line pb-3.5 last:border-0 last:pb-0"
            >
              <dt class="text-sm text-muted">{{ row.label }}</dt>
              <dd class="m-0 text-sm text-ink">{{ row.value }}</dd>
            </div>
          </dl>
          <a
            :href="`mailto:${contact.giveEmail}`"
            class="mt-6 inline-block text-[15px] font-semibold text-green-600"
            >{{ contact.giveEmail }}</a
          >
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const give = useGive();
const { bank, contact } = useAppConfig();

const rows = [
  { label: "Bank", value: bank.name },
  { label: "Account name", value: bank.accountName },
  { label: "Account number", value: bank.accountNumber },
  { label: "Reference", value: "Your name" },
];

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") give.close();
  };
  window.addEventListener("keydown", onKey);
  onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
});
</script>
