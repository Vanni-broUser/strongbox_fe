<template>
  <v-card elevation="20" :title="day">
    Ciao
  </v-card>
</template>

<script setup>
  const { notes, day } = defineProps(['notes', 'day']);
</script>
