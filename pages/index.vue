<template>
  <main>
    <div class="bg-gradient-to-b from-green-50 to-white">
      <div class="wrap grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p class="eyebrow mb-[18px]">Empowering youth, building futures</p>
          <h1 class="h-display">Empowering Nigeria's youth beyond their past</h1>
          <p class="lead mt-5 max-w-[560px]">
            Access to quality education, vocational training, leadership development, and pathways to meaningful employment — for young people in juvenile centres and correctional facilities across Nigeria.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <button class="btn-gold" @click="give.open()">
              Donate
              <AppIcon name="arrowRight" :size="18" />
            </button>
            <NuxtLink to="/contact" class="btn-green no-underline">Volunteer or partner</NuxtLink>
          </div>
          <div class="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span>7 programme areas</span>
            <span>Juvenile centres &amp; correctional facilities</span>
            <span>Nigeria</span>
          </div>
        </div>
        <div class="group relative aspect-[4/5] overflow-hidden rounded-[10px] shadow-e4">
          <Transition name="hero-fade" mode="out-in">
            <img
              :key="currentHeroImage.src"
              :src="currentHeroImage.src"
              :alt="currentHeroImage.alt"
              class="block h-full w-full object-cover"
            />
          </Transition>
          <div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 text-white">
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition hover:bg-white hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous hero image"
              @click="showPreviousHeroImage"
            >
              <AppIcon name="chevronLeft" :size="24" />
            </button>
            <div class="flex items-center gap-1.5" aria-hidden="true">
              <span
                v-for="(_, index) in heroImages"
                :key="index"
                class="h-1.5 rounded-full transition-all"
                :class="index === currentHeroImageIndex ? 'w-6 bg-gold-500' : 'w-1.5 bg-white/70'"
              ></span>
            </div>
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition hover:bg-white hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next hero image"
              @click="showNextHeroImage"
            >
              <AppIcon name="chevronRight" :size="24" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <section class="section border-t border-line">
      <div class="wrap max-w-[820px] text-center">
        <p class="eyebrow mb-4">Who we are</p>
        <p class="m-0 font-serif text-[clamp(19px,4.4vw,26px)] leading-[1.45] text-ink">
          Bridge of Hope works inside juvenile centres and correctional facilities across Nigeria, where young people are held with little access to schooling, skills, or support. We run education and vocational programmes on the inside, and stay with each young person through release, work, and return to community life. Our work is built on the belief that a sentence should not decide a future.
        </p>
      </div>
    </section>

    <section class="section border-t border-line bg-sand-50">
      <div class="wrap">
        <div class="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="eyebrow mb-3">Programmes</p>
            <h2 class="h-section">Seven ways we work</h2>
          </div>
          <NuxtLink to="/what-we-do" class="inline-flex items-center gap-1.5 font-sans text-[15px] font-semibold text-green-600">
            See what we do
            <AppIcon name="arrowRight" :size="16" />
          </NuxtLink>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="p in programmes"
            :key="p.n"
            to="/what-we-do"
            class="card card-link gap-3.5 no-underline"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-[4px] bg-green-50 text-green-600">
              <AppIcon :name="p.icon" :size="22" />
            </span>
            <span class="font-sans text-[17px] font-semibold text-ink">{{ p.title }}</span>
            <span class="text-[15px] leading-normal text-body">{{ p.short }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section bg-green-700 text-white">
      <div class="wrap">
        <p class="eyebrow mb-3 !text-gold-500">Impact</p>
        <h2 class="h-section !text-white">What the work adds up to</h2>
        <p class="lead mb-12 mt-3 max-w-[620px] !text-green-200">Placeholder figures — replace each number once reporting is in place.</p>
        <div class="grid gap-px overflow-hidden rounded-[10px] border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="s in stats" :key="s.label" class="bg-green-700 px-7 py-8">
            <div class="font-serif text-[clamp(38px,8vw,52px)] leading-none text-gold-500">{{ s.value }}</div>
            <div class="mt-2.5 text-[15px] text-white">{{ s.label }}</div>
          </div>
        </div>
        <div class="mt-8 grid gap-5 md:grid-cols-2">
          <blockquote v-for="t in testimonials" :key="t.by" class="m-0 rounded-[10px] border border-white/12 bg-white/5 p-8">
            <p class="m-0 mb-[18px] font-serif text-[clamp(18px,3.8vw,22px)] leading-[1.5] text-white">{{ t.quote }}</p>
            <footer class="text-sm text-green-200">{{ t.by }}</footer>
          </blockquote>
        </div>
      </div>
    </section>

    <section class="section border-t border-line bg-sand-50">
      <div class="wrap max-w-[900px] text-center">
        <div class="mx-auto mb-8 h-[3px] w-12 bg-gold-500"></div>
        <p class="eyebrow mb-5">Our vision</p>
        <blockquote class="m-0">
          <p class="m-0 font-serif text-[clamp(21px,4.8vw,32px)] leading-[1.4] text-green-700">{{ visionStatement }}</p>
        </blockquote>
      </div>
    </section>

    <section class="bg-green-500 py-[72px] text-white">
      <div class="wrap flex flex-wrap items-center justify-between gap-10">
        <div class="max-w-[560px]">
          <h2 class="m-0 mb-3 font-serif text-[clamp(26px,5.4vw,36px)] font-semibold leading-tight text-white">Stand with a young person's second chance</h2>
          <p class="m-0 text-[17px] leading-[1.55] text-green-100">Give, give your time, or bring your organisation in as a partner. Every route matters.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button class="btn-gold" @click="give.open()">Donate</button>
          <NuxtLink to="/contact" class="btn-outline-light no-underline">Volunteer</NuxtLink>
          <NuxtLink to="/contact" class="btn-outline-light no-underline">Partner with us</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const give = useGive()

const heroImages = [
  {
    src: 'https://images.pexels.com/photos/32315949/pexels-photo-32315949.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'A focused young woman attending a seminar in Lagos, Nigeria'
  },
  {
    src: 'https://images.pexels.com/photos/29716425/pexels-photo-29716425.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Two young students studying together outdoors in Abuja, Nigeria'
  },
  {
    src: 'https://images.pexels.com/photos/12804469/pexels-photo-12804469.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'A teacher mentoring Nigerian youth students in Port Harcourt'
  },
  {
    src: 'https://unsplash.com/photos/XbGLZgfzp0g/download?force=true&w=1200',
    alt: 'Young men studying together in a Lagos library tutoring session'
  },
  {
    src: 'https://unsplash.com/photos/IgUR1iX0mqM/download?force=true&w=1200',
    alt: 'Young adults learning together at a Lagos skills and rehabilitation workshop'
  }
]

const currentHeroImageIndex = ref(0)
const currentHeroImage = computed(() => heroImages[currentHeroImageIndex.value])

const showNextHeroImage = () => {
  currentHeroImageIndex.value = (currentHeroImageIndex.value + 1) % heroImages.length
}

const showPreviousHeroImage = () => {
  currentHeroImageIndex.value = (currentHeroImageIndex.value - 1 + heroImages.length) % heroImages.length
}

onMounted(() => {
  const interval = window.setInterval(showNextHeroImage, 10000)

  onBeforeUnmount(() => window.clearInterval(interval))
})

const stats = [
  { value: '000', label: 'Youth trained' },
  { value: '000', label: 'Reintegrated after release' },
  { value: '00', label: 'Facilities served' },
  { value: '00', label: 'Employer partners' }
]

const testimonials = [
  { quote: 'Testimonial placeholder — a short quote from a graduate, in their own words, about what changed after training.', by: 'Name withheld · Programme graduate' },
  { quote: 'Testimonial placeholder — a quote from a facility officer, mentor, or employer partner about working with Bridge of Hope.', by: 'Name · Role, organisation' }
]

useSeoMeta({
  title: "Bridge of Hope — Empowering Nigeria's youth beyond their past",
  description: 'Education, vocational training, leadership development, and reintegration support for young people in juvenile centres and correctional facilities across Nigeria.'
})
</script>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 420ms ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
</style>
