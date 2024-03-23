<template>
  <v-container>
    <v-card elevation="20" title="Importanti">
      <v-list>
        <v-list-item v-for="note in importantNotes" :title="note.title" :subtitle="note.content">
          <template v-slot:append>
            <v-btn icon="mdi-pencil" variant="text" @click="updateEditedNote(note)" />
            <v-btn icon="mdi-delete" variant="text" @click="deleteNote(note)"/>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
  import http from '@/utils/http';
  import { storeToRefs } from 'pinia';
  import { useNotesStore } from '@/stores/notes';

  const notesStore = useNotesStore();
  const { initNotes, updateEditedNote } = notesStore;
  const { importantNotes } = storeToRefs(notesStore);

  initNotes('important');

  const deleteNote = (note) => {
    http.getRequest(`instances/Note/${note.id}`, {}, function (data) {
      initNotes('important');
    }, 'DELETE');
  };
</script>
