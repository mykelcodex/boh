/**
 * Editable site content. Staff can change these values without touching
 * component markup. Swap for a CMS/content source when the admin panel lands.
 */
export default defineAppConfig({
  programsLayout: "cards" as "cards" | "accordion",

  contact: {
    addressLine1: "Street address placeholder, Area",
    addressLine2: "City, State, Nigeria",
    phone: "+234 000 000 0000",
    email: "hello@bohreform.org",
    partnersEmail: "partners@bohreform.org",
    volunteerEmail: "volunteer@bohreform.org",
    giveEmail: "give@bohreform.org",
    hours: "Mon–Fri, 9:00–17:00 WAT",
    hoursNote: "Facility visits by appointment",
  },

  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    x: "#",
  },

  bank: {
    name: "Bank name placeholder",
    accountName: "Bridge of Hope",
    accountNumber: "0000000000",
  },

  // Add entries as photos and bios are confirmed; the section hides while empty.
  team: [] as { name: string; role: string; bio: string; photo?: string }[],
});
