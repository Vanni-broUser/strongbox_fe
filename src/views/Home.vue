<template>
  {{ notes }}
</template>

<script setup>
  import { useTheme } from 'vuetify';
  import { storeToRefs } from 'pinia';
  import { useNotesStore } from '@/stores/notes';

  const theme = useTheme();
  const notesStore = useNotesStore();
  const { notes } = storeToRefs(notesStore);
</script>
