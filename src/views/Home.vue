<template>
  {{ notes }}
  <Form />
  <v-bottom-navigation>
  <v-btn value="recent">
    <v-icon>mdi-history</v-icon>

    <span>Recent</span>
  </v-btn>

    <v-btn value="favorites">
      <v-icon>mdi-heart</v-icon>

      <span>Favorites</span>
    </v-btn>

    <v-btn value="nearby">
      <v-icon>mdi-map-marker</v-icon>

      <span>Nearby</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
  import { useTheme } from 'vuetify';
  import { storeToRefs } from 'pinia';
  import Form from '@/components/notes/Form';
  import { useNotesStore } from '@/stores/notes';

  const theme = useTheme();
  const notesStore = useNotesStore();
  const { notes } = storeToRefs(notesStore);
</script>
