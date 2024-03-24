<template>
  <v-container>
    <v-card elevation="20" title="Importanti" height="200" style="overflow-y: auto;">
      <v-list>
        <NoteListItem v-for="note in importantNotes" :note="note" :title="note.title" :subtitle="displaySubtitle(note)" />
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import NoteListItem from './NoteListItem.vue';
  import { useNotesStore } from '@/stores/notes';

  const notesStore = useNotesStore();
  const { initNotes } = notesStore;
  const { importantNotes } = storeToRefs(notesStore);

  initNotes('important');

  const displaySubtitle = (note) => {
    return `${note.datetime ? note.datetime.toLocaleDateString('en-GB'): ''}${note.content ? (note.datetime ? ' - ' : '') + note.content : ''}`
  };
</script>
