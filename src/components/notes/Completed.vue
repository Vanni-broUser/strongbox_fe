<template>
  <v-container>
    <v-card title="Completate" elevation="20" height="600">
      <v-data-table :items="completedNotes" :headers="headers" height="450" />
    </v-card>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useNotesStore } from '@/stores/notes';

  const notesStore = useNotesStore();
  const { initNotes } = notesStore;
  const headers = [
    {title: 'Titolo', key: 'title'},
    {title: 'Contenuto', key: 'content'},
    {title: 'Ultima modifica', key: 'updated_at'},
    {title: 'Data e ora', key: 'datetime'}
  ];

  initNotes('completed');
  const { completedNotes } = storeToRefs(notesStore);
</script>
