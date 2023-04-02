import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import router from "./router";
import AppLink from "@/components/AppLink.vue";
import App from "./App.vue";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.component("AppLink", AppLink);

app.mount("#app");
