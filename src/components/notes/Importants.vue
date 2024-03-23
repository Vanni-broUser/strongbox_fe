<template>
  <v-container>
    <v-card elevation="20" title="Importanti" height="200" style="overflow-y: auto;">
      <v-list>
        <NoteListItem v-for="note in importantNotes" :note="note" :title="displayTitle(note)" :subtitle="note.content" />
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

  const displayTitle = (note) => {
    return `${note.title}${note.datetime ? ' - ' + note.datetime.toLocaleDateString('en-GB') : ''}`;
  };
</script>
