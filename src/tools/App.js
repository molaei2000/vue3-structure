import storage from "./Storage";

// Application Class
// this class handle app control and settings
const app = {
  app_name: "My-Structure",
  supper_key: "@app_system:",
  fonts: {
    en: "Raleway, sans-serif !important;",
    fa: "Tahoma, sans-serif !important;",
  },
  default_lang: "en",
  test_data: false,
  languages: ["en"],
  limit: 12,
  rtl_lang: ["fa"],
  lang_items: [
    {
      key: "en",
      title: "English",
    },
  ],

  // load data with key
  load(key) {
    return storage.get(this.supper_key + key);
  },

  // Save data with key
  save(key, value) {
    storage.set(this.supper_key + key, value);
  },
};

export default app;
