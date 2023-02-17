<template>
  <v-app>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
  </v-app>
</template>

<script>
import { useTheme } from "vuetify";

export default {
  setup() {
    const theme = useTheme();

    return {
      theme,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? "light"
          : "dark"),
    };
  },
};
</script>
