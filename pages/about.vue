<template>
  <main>
    <div class="border-b border-line bg-green-50">
      <div class="wrap py-[72px]">
        <div class="max-w-[820px]">
          <p class="eyebrow mb-4">About us</p>
          <h1 class="h-display mb-4">
            Built on the belief that a sentence should not decide a future
          </h1>
          <p class="lead">
            Bridge of Hope is a Nigerian organisation working with young people in
            juvenile centres and correctional facilities — through education,
            training, leadership, and the long work of coming home.
          </p>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="wrap grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div>
          <p class="eyebrow mb-3">Mission</p>
          <h2 class="h-section">Our mission</h2>
        </div>
        <div>
          <p
            class="m-0 font-serif text-[clamp(18px,4vw,24px)] leading-[1.5] text-ink"
          >
            {{ missionStatement }}
          </p>
        </div>
      </div>
    </section>

    <section class="section bg-green-700 text-white">
      <div class="wrap grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div>
          <p class="eyebrow mb-3 !text-gold-500">Vision</p>
          <h2 class="h-section !text-white">Our vision</h2>
        </div>
        <div>
          <p
            class="m-0 font-serif text-[clamp(18px,4vw,24px)] leading-[1.5] text-white"
          >
            {{ visionStatement }}
          </p>
        </div>
      </div>
    </section>

    <section class="section border-t border-line bg-sand-50">
      <div class="wrap">
        <p class="eyebrow mb-3">Core values</p>
        <h2 class="h-section mb-10">What we hold to</h2>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="v in coreValues" :key="v.title" class="card gap-3">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-[4px] bg-gold-100 text-gold-ink"
            >
              <AppIcon :name="v.icon" :size="22" />
            </span>
            <h3 class="m-0 font-sans text-[19px] font-semibold text-ink">
              {{ v.title }}
            </h3>
            <p class="m-0 text-[15px] leading-normal">{{ v.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section border-t border-line">
      <div
        class="wrap grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
      >
        <div>
          <p class="eyebrow mb-3">Our story</p>
          <h2 class="h-section mb-4">Why we exist</h2>
          <p class="lead mb-4">
            No mistake made at sixteen should decide who a person becomes at
            thirty. Behind every number on a uniform is a name, a story, and a
            future still waiting to be written. Bridge of Hope exists to stand in
            that gap — to remind young people that where they are today is not
            where they have to end.
          </p>
          <p class="text-base leading-[1.7]">
            Hope is not something you wait for; it is something you hand to
            someone else. Give a young person a reason to keep going, the skills
            to rebuild, and someone who believes in them, and they will surprise
            you every time. We are here because second chances change lives — and
            because the world is better when no one is written off.
          </p>
        </div>
        <div class="aspect-[4/5] overflow-hidden rounded-[10px] shadow-e3">
          <img
            src="/images/hope.png"
            alt="A young person in a prison uniform gripping cell bars, the word HOPE written across their fingers"
            class="block h-full w-full object-cover"
          />
        </div>
      </div>
    </section>

    <section v-if="team.length" class="section border-t border-line bg-sand-50">
      <div class="wrap">
        <p class="eyebrow mb-3">Leadership</p>
        <h2 class="h-section mb-10">The team</h2>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="member in team" :key="member.name" class="card gap-4">
            <div class="h-24 w-24 overflow-hidden rounded-full bg-sand-100">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="member.name"
                class="block h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 class="m-0 mb-1 font-sans text-lg font-semibold text-ink">
                {{ member.name }}
              </h3>
              <p class="m-0 text-sm font-semibold text-gold-ink">
                {{ member.role }}
              </p>
              <p class="mt-2.5 text-[15px] leading-normal">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section border-t border-line">
      <div class="wrap">
        <p class="eyebrow mb-3">Partners &amp; affiliations</p>
        <h2 class="h-section mb-3">Who we work with</h2>
        <p class="lead mb-8 max-w-[620px]">We partner across the sectors that make rehabilitation and reentry possible — justice, education, mental health, and philanthropy.</p>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div
            v-for="partner in partnerCategories"
            :key="partner"
            class="flex h-[88px] items-center justify-center rounded-md border border-dashed border-line-strong px-4 text-center text-[13px] text-muted grayscale opacity-70 transition hover:opacity-100"
          >
            {{ partner }}
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { team } = useAppConfig();

// Target partner categories — swap each for a monochromatic partner logo once confirmed.
const partnerCategories = [
  "Juvenile justice departments & state agencies",
  "Educational & vocational training institutions",
  "Community mental health & counselling organisations",
  "Corporate sponsors & philanthropic foundations",
];

useSeoMeta({
  title: "About Bridge of Hope — Mission, vision, and values",
  description: "Our mission, vision, core values, story, and leadership team.",
});
</script>
