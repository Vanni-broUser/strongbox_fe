<template>
  <v-main :style="{ backgroundColor: theme.current.value.colors.secondary }">
    <v-container><h1>Strongbox</h1></v-container>
    <router-view />
  </v-main>
</template>

<script setup>
  import { useTheme } from 'vuetify';

  const theme = useTheme();
</script>
