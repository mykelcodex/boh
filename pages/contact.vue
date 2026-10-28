<template>
  <main>
    <div class="border-b border-line bg-green-50">
      <div class="wrap py-[72px]">
        <div class="max-w-[820px]">
          <p class="eyebrow mb-4">Contact</p>
          <h1 class="h-display mb-4">Talk to us</h1>
          <p class="lead">Whether you want to partner, volunteer, donate, or make a press enquiry, tell us how we can help. We will direct your message to the right person.</p>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="wrap grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2 class="m-0 mb-5 font-sans text-xl font-semibold text-ink">Where to find us</h2>
          <dl class="mb-8 grid gap-[18px]">
            <div v-for="row in details" :key="row.label" class="flex gap-3">
              <span class="mt-0.5 shrink-0 text-green-600"><AppIcon :name="row.icon" :size="20" /></span>
              <div>
                <dt class="text-[15px] font-semibold text-ink">{{ row.label }}</dt>
                <dd class="m-0 mt-0.5 text-[15px] text-body">
                  <a v-if="row.href" :href="row.href" class="text-green-600">{{ row.value }}</a>
                  <template v-else>{{ row.value }}<br v-if="row.value2" />{{ row.value2 }}</template>
                </dd>
              </div>
            </div>
          </dl>

        </div>

        <div class="rounded-md border border-line bg-white p-5 shadow-e2 sm:p-8">
          <form v-if="!sent" @submit.prevent="submit">
            <h2 class="m-0 mb-5 font-sans text-xl font-semibold text-ink">Send a message</h2>
            <div class="mb-3.5 grid gap-3.5 sm:grid-cols-2">
              <label class="block">
                <span class="field-label">Name</span>
                <input v-model="form.name" type="text" required placeholder="Your full name" class="field" />
              </label>
              <label class="block">
                <span class="field-label">Email</span>
                <input v-model="form.email" type="email" required placeholder="you@example.com" class="field" />
              </label>
            </div>
            <label class="mb-3.5 block">
              <span class="field-label">Subject</span>
              <select v-model="form.subject" class="field">
                <option>General enquiry</option>
                <option>Partner with us</option>
                <option>Volunteer</option>
                <option>Donate</option>
              </select>
            </label>
            <label class="mb-5 block">
              <span class="field-label">Message</span>
              <textarea v-model="form.message" rows="6" required placeholder="How would you like to work with us?" class="field resize-y"></textarea>
            </label>
            <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
            <button type="submit" class="btn-green w-full" :disabled="pending">{{ pending ? 'Sending…' : 'Send message' }}</button>
            <p v-if="error" class="mt-3 text-sm text-[#B91C1C]">{{ error }}</p>
            <p class="mt-3.5 text-[13px] text-muted">We reply within two working days.</p>
          </form>

          <div v-else class="py-10 text-center">
            <span class="mb-5 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-green-50 text-green-600">
              <AppIcon name="check" :size="26" />
            </span>
            <h2 class="m-0 mb-2.5 font-serif text-[clamp(21px,5vw,26px)] font-semibold text-ink">Message sent</h2>
            <p class="mb-6">Thank you. We will reply within two working days.</p>
            <button class="btn-secondary !py-3 !text-[15px]" @click="sent = false">Send another message</button>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
const { contact } = useAppConfig()

const details = [
  { icon: 'mapPin', label: 'Office', value: contact.addressLine1, value2: contact.addressLine2 },
  { icon: 'phone', label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
  { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: 'clock', label: 'Office hours', value: contact.hours, value2: contact.hoursNote }
]

const sent = ref(false)
const pending = ref(false)
const error = ref('')
const form = reactive({ name: '', email: '', subject: 'General enquiry', message: '', website: '' })

async function submit() {
  if (pending.value) return
  pending.value = true
  error.value = ''
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    sent.value = true
    Object.assign(form, { name: '', email: '', subject: 'General enquiry', message: '', website: '' })
  } catch (e: any) {
    error.value = e?.data?.message ?? 'Something went wrong. Please try again.'
  } finally {
    pending.value = false
  }
}

useSeoMeta({
  title: 'Contact Bridge of Hope — Partner, volunteer, or donate',
  description: 'Reach us for partnerships, volunteering, giving, or press. Office hours Mon–Fri, 9:00–17:00 WAT.'
})
</script>
