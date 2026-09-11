<template>
  <main>
    <div class="border-b border-line bg-green-50">
      <div class="wrap max-w-[820px] py-[72px]">
        <p class="eyebrow mb-4">What we do</p>
        <h1 class="h-display mb-4">Seven programme areas, one path back</h1>
        <p class="lead">
          Each programme runs inside juvenile centres and correctional
          facilities, and continues after release. Together they cover skills,
          schooling, work, leadership, healing, reform, and the community a
          young person returns to.
        </p>
      </div>
    </div>

    <section class="section border-b border-line">
      <div class="wrap">
        <div class="mb-10 max-w-[760px]">
          <p class="eyebrow mb-3">Our approach</p>
          <h2 class="h-section mb-4">Support from custody to community life</h2>
          <p class="lead">
            Bridge of Hope provides practical, lawful, and rehabilitative
            support for young people in juvenile centres, and stays involved
            after release so progress does not end at the gate.
          </p>
        </div>
        <div class="grid gap-5 md:grid-cols-3">
          <article
            v-for="item in approach"
            :key="item.title"
            class="card gap-3.5"
          >
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-green-50 text-green-600"
            >
              <AppIcon :name="item.icon" :size="24" />
            </span>
            <h3 class="m-0 font-sans text-[19px] font-semibold text-ink">
              {{ item.title }}
            </h3>
            <p class="m-0 text-[15px] leading-[1.65]">{{ item.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div v-if="layout === 'cards'" class="grid gap-5 md:grid-cols-2">
          <article v-for="p in programmes" :key="p.n" class="card gap-3.5">
            <div class="flex items-center gap-3.5">
              <span
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-green-50 text-green-600"
              >
                <AppIcon :name="p.icon" :size="24" />
              </span>
              <span class="text-xs text-muted">{{ p.n }}</span>
            </div>
            <h2
              class="m-0 font-sans text-[clamp(19px,4vw,22px)] font-semibold text-ink"
            >
              {{ p.title }}
            </h2>
            <p class="m-0 text-base leading-[1.65]">{{ p.body }}</p>
          </article>
        </div>

        <div
          v-else
          class="overflow-hidden rounded-md border border-line bg-white shadow-e1"
        >
          <div
            v-for="p in programmes"
            :key="p.n"
            class="border-b border-line last:border-0"
          >
            <button
              class="flex w-full cursor-pointer items-center gap-4 px-6 py-5 text-left transition-colors duration-150 hover:bg-sand-50"
              :aria-expanded="open === p.n"
              @click="toggle(p.n)"
            >
              <span class="text-xs text-muted">{{ p.n }}</span>
              <span
                class="flex-1 font-sans text-[19px] font-semibold text-ink"
                >{{ p.title }}</span
              >
              <AppIcon
                name="chevronDown"
                :size="20"
                class="text-green-600 transition-transform duration-200"
                :class="open === p.n ? 'rotate-180' : ''"
              />
            </button>
            <p
              v-if="open === p.n"
              class="m-0 max-w-[760px] px-6 pb-6 pl-6 text-base leading-[1.65] sm:pl-14"
            >
              {{ p.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-green-700 text-white">
      <div class="wrap max-w-[900px] text-center">
        <p class="eyebrow mb-4 !text-gold-500">Support a programme</p>
        <h2 class="h-section mb-4 !text-white">
          Back one programme, or bring your organisation in
        </h2>
        <p class="lead mx-auto mb-9 max-w-[620px] !text-green-200">
          Fund a trade workshop, sponsor exam fees for a cohort, mentor a
          graduate through their first year of work, or open a placement at your
          company.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <button class="btn-gold" @click="give.open()">
            Fund a programme
          </button>
          <NuxtLink to="/contact" class="btn-outline-light no-underline"
            >Become a partner or mentor</NuxtLink
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const give = useGive();
const { programsLayout } = useAppConfig();
const layout = programsLayout;
const open = ref<string>("01");
const toggle = (n: string) => {
  open.value = open.value === n ? "" : n;
};

const approach = [
  {
    icon: "scale",
    title: "Lawful release support",
    body: "Where appropriate and legally permitted, we assist eligible non-violent young offenders with bail or release support from juvenile centres.",
  },
  {
    icon: "heart",
    title: "Post-release rehabilitation",
    body: "We are working toward a rehabilitation centre for young people who have no safe place to go after release, giving them structure, care, and stability.",
  },
  {
    icon: "tool",
    title: "Training and follow-up",
    body: "We provide trade training, leadership development, tutoring, education support, and follow-up after rehabilitation is completed.",
  },
];

useSeoMeta({
  title: "What we do — Seven programme areas | Bridge of Hope",
  description:
    "Trade and vocational training, formal schooling access, job placement, leadership, reintegration, advocacy, and community engagement.",
});
</script>
