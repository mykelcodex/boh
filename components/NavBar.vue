<template>
  <header
    class="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md transition-shadow duration-200"
    :class="scrolled ? 'shadow-e2' : ''"
  >
    <div class="wrap flex h-[68px] items-center justify-between gap-6">
      <NuxtLink to="/" class="flex items-center gap-2.5 no-underline" aria-label="Bridge of Hope — home">
        <img src="/images/logo.png" alt="Bridge of Hope logo" class="block h-[34px] w-auto" />
      </NuxtLink>

      <nav class="hidden items-center gap-7 lg:flex" aria-label="Main">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="border-b-2 py-1 font-sans text-[15px] no-underline transition-colors duration-150"
          :class="isActive(link.to)
            ? 'border-gold-500 font-semibold text-green-700'
            : 'border-transparent font-medium text-body hover:text-green-700'"
        >{{ link.label }}</NuxtLink>
      </nav>

      <div class="hidden items-center gap-2.5 lg:flex">
        <NuxtLink to="/contact" class="btn-secondary !px-4 !py-2.5 !text-sm no-underline">Volunteer</NuxtLink>
        <button class="btn-gold !px-[18px] !py-2.5 !text-sm" @click="give.open()">Donate</button>
      </div>

      <button
        class="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] border border-line-strong bg-white text-green-700 lg:hidden"
        :aria-expanded="menuOpen"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="20" />
      </button>
    </div>

    <div v-if="menuOpen" class="border-t border-line bg-white lg:hidden">
      <div class="wrap flex flex-col py-2">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="border-b border-line py-3.5 font-sans text-base font-medium text-ink no-underline"
          @click="menuOpen = false"
        >{{ link.label }}</NuxtLink>
        <div class="flex gap-2.5 py-4">
          <button class="btn-gold flex-1" @click="give.open(); menuOpen = false">Donate</button>
          <NuxtLink to="/contact" class="btn-secondary flex-1 no-underline" @click="menuOpen = false">Volunteer</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const give = useGive()
const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/what-we-do', label: 'What we do' },
  { to: '/contact', label: 'Contact' }
]

const isActive = (to: string) => to === '/' ? route.path === '/' : route.path.startsWith(to)

const onScroll = () => { scrolled.value = window.scrollY > 8 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.path, () => { menuOpen.value = false })
</script>
