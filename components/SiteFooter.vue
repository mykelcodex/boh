<template>
  <footer class="bg-green-800 px-0 pb-6 pt-16 text-white">
    <div class="wrap">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div class="mb-4 flex items-center gap-2.5">
            <img src="/images/logo_white.png" alt="Bridge of Hope" class="block h-8 w-auto" />
          </div>
          <p class="mb-5 max-w-[300px] text-[15px] leading-relaxed text-green-200">
            Empowering young people in juvenile centres and correctional facilities across Nigeria — through education, training, and reintegration.
          </p>
          <div class="flex flex-wrap gap-x-[18px] gap-y-2 text-sm">
            <a :href="social.facebook" class="text-white">Facebook</a>
            <a :href="social.instagram" class="text-white">Instagram</a>
            <a :href="social.linkedin" class="text-white">LinkedIn</a>
            <a :href="social.x" class="text-white">X</a>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-[13px] uppercase tracking-[0.12em] text-gold-500">Pages</h3>
          <div class="grid justify-items-start gap-2.5">
            <NuxtLink to="/" class="font-sans text-[15px] text-white no-underline hover:underline">Home</NuxtLink>
            <NuxtLink to="/about" class="font-sans text-[15px] text-white no-underline hover:underline">About</NuxtLink>
            <NuxtLink to="/what-we-do" class="font-sans text-[15px] text-white no-underline hover:underline">What we do</NuxtLink>
            <NuxtLink to="/contact" class="font-sans text-[15px] text-white no-underline hover:underline">Contact</NuxtLink>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-[13px] uppercase tracking-[0.12em] text-gold-500">Contact</h3>
          <div class="grid gap-2.5 text-[15px] text-green-200">
            <span>{{ contact.addressLine1 }}<br />{{ contact.addressLine2 }}</span>
            <a :href="`tel:${contact.phone}`" class="text-white">{{ contact.phone }}</a>
            <a :href="`mailto:${contact.email}`" class="text-white">{{ contact.email }}</a>
            <span>{{ contact.hours }}</span>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-[13px] uppercase tracking-[0.12em] text-gold-500">Newsletter</h3>
          <p class="mb-3.5 text-[15px] text-green-200">Quarterly updates on programmes and graduates.</p>
          <form class="flex flex-col gap-2.5" @submit.prevent="subscribe">
            <input
              v-model="email"
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              class="w-full rounded-[4px] border border-white/25 bg-white/5 px-3.5 py-3 font-sans text-[15px] text-white placeholder:text-white/50"
            />
            <button type="submit" class="btn-gold !py-3 !text-[15px]" :disabled="pending">
              {{ subscribed ? 'Subscribed' : pending ? 'Sending…' : 'Subscribe' }}
            </button>
          </form>
          <p v-if="error" class="mt-2 text-sm text-gold-500">{{ error }}</p>
        </div>
      </div>

      <div class="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-green-200">
        <span>© {{ year }} Bridge of Hope. All rights reserved.</span>
        <span class="flex flex-wrap gap-5">
          <a href="#" class="text-green-200">Privacy</a>
          <a href="#" class="text-green-200">Safeguarding policy</a>
          <a href="#" class="text-green-200">Annual report</a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { contact, social } = useAppConfig()
const year = new Date().getFullYear()
const email = ref('')
const subscribed = ref(false)
const pending = ref(false)
const error = ref('')

async function subscribe() {
  if (!email.value || pending.value) return
  pending.value = true
  error.value = ''
  try {
    await $fetch('/api/newsletter', { method: 'POST', body: { email: email.value } })
    subscribed.value = true
    email.value = ''
  } catch (e: any) {
    error.value = e?.data?.message ?? 'Something went wrong. Please try again.'
  } finally {
    pending.value = false
  }
}
</script>
