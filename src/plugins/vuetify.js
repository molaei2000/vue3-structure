import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import dark from "./colors/dark";
import light from "./colors/light";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light,
      dark,
    },
  },
});

export default vuetify;
