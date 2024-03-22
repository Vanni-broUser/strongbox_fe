<template>
  <Today v-if="view == 1" />
  <Week v-if="view == 2" />
  <Tag v-if="view == 3" />
  <v-bottom-navigation>
    <v-btn value="favorites" @click="view = 1">
      <v-icon icon="mdi-star-box" />
      <span>Oggi</span>
    </v-btn>
    <v-btn value="recent" @click="view = 2">
      <v-icon icon="mdi-calendar-today" />
      <span>Settimana</span>
    </v-btn>
    <v-btn value="nearby" @click="view = 3">
      <v-icon icon="mdi-tag" />
      <span>Tag</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
  import { ref } from 'vue';
  import Tag from '@/components/notes/Tag';
  import Week from '@/components/notes/Week';
  import Today from '@/components/notes/Today';

  const view = ref(1);
</script>
