<template>
  <footer class="relative overflow-hidden bg-green-800 px-0 pb-7 pt-16 text-white">
    <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" aria-hidden="true"></div>
    <div class="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-gold-500/20" aria-hidden="true"></div>
    <div class="wrap">
      <div class="mb-12 grid items-end gap-7 border-b border-white/15 pb-12 lg:grid-cols-[1fr_auto]">
        <div class="max-w-2xl">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">Building pathways to a better future</p>
          <h2 class="m-0 font-serif text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
            Every young person deserves a way forward.
          </h2>
        </div>
        <NuxtLink to="/contact" class="btn-gold w-fit">Talk to our team</NuxtLink>
      </div>

      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.7fr_0.8fr_1.2fr] lg:gap-16">
        <div class="max-w-md">
          <img src="/images/logo_white.png" alt="Bridge of Hope" class="mb-5 block h-9 w-auto" />
          <p class="m-0 text-[15px] leading-7 text-green-200">
            Empowering young people in juvenile centres and correctional facilities across Nigeria — through education, training, and reintegration.
          </p>
        </div>

        <div>
          <h3 class="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-500">Explore</h3>
          <nav aria-label="Footer navigation" class="grid justify-items-start gap-3">
            <NuxtLink to="/" class="font-sans text-[15px] text-green-200 no-underline transition-colors hover:text-white">Home</NuxtLink>
            <NuxtLink to="/about" class="font-sans text-[15px] text-green-200 no-underline transition-colors hover:text-white">About us</NuxtLink>
            <NuxtLink to="/what-we-do" class="font-sans text-[15px] text-green-200 no-underline transition-colors hover:text-white">What we do</NuxtLink>
            <NuxtLink to="/contact" class="font-sans text-[15px] text-green-200 no-underline transition-colors hover:text-white">Contact</NuxtLink>
          </nav>
        </div>

        <div>
          <h3 class="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-500">Get in touch</h3>
          <address class="grid gap-4 text-[15px] not-italic text-green-200">
            <span class="flex gap-3">
              <AppIcon name="mapPin" :size="18" class="mt-0.5 shrink-0 text-gold-500" />
              <span>{{ contact.addressLine1 }}<br />{{ contact.addressLine2 }}</span>
            </span>
            <a :href="`tel:${contact.phone}`" class="flex items-center gap-3 text-green-200 no-underline transition-colors hover:text-white">
              <AppIcon name="phone" :size="18" class="shrink-0 text-gold-500" />{{ contact.phone }}
            </a>
            <a :href="`mailto:${contact.email}`" class="flex items-center gap-3 text-green-200 no-underline transition-colors hover:text-white">
              <AppIcon name="mail" :size="18" class="shrink-0 text-gold-500" />{{ contact.email }}
            </a>
          </address>
          <div class="mt-5 border-t border-white/10 pt-4 text-sm text-green-200">
            <span class="block text-white">Office hours</span>
            <span>{{ contact.hours }}</span>
          </div>
        </div>
      </div>

      <div class="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-[13px] text-green-200">
        <span>© {{ year }} Bridge of Hope. All rights reserved.</span>
        <span>Reformation · Capacity development · Reintegration</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { contact } = useAppConfig()
const year = new Date().getFullYear()
</script>
