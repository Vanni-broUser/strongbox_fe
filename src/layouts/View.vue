<template>
  <v-main :style="{ backgroundColor: theme.current.value.colors.secondary }">
    <router-view />
  </v-main>
</template>

<script setup>
  import { useTheme } from 'vuetify';

  const theme = useTheme();
</script>
