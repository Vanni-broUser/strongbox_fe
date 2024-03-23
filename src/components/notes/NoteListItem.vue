<template>
  <v-list-item :title="title" :subtitle="subtitle">
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="outlined" v-bind="props" />
        </template>
        <v-list>
          <v-list-item>
            <v-btn icon="mdi-pencil" variant="text" @click="updateEditedNote(note)" />
          </v-list-item>
          <v-list-item>
            <v-btn icon="mdi-delete" variant="text" @click="deleteNote(note)"/>
          </v-list-item>
          <v-list-item>
            <v-btn icon="mdi-check-circle" variant="text" @click="completeNote(note)"/>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
</template>

<script setup>
  import http from '@/utils/http';
  import { useNotesStore } from '@/stores/notes';

  const { note, title, subtitle } = defineProps(['note', 'title', 'subtitle']);
  const notesStore = useNotesStore();
  const { initNotes, updateEditedNote } = notesStore;

  const deleteNote = (note) => {
    http.getRequest(`instances/Note/${note.id}`, {}, function (data) {
      initNotes('daily');
      initNotes('weekly');
      initNotes('important');
    }, 'DELETE');
  };

  const completeNote = (note) => {
    http.postRequest(`instances/Note/${note.id}`, {
      params: {
        completed: true
      }
    }, function (data) {
      initNotes('daily');
      initNotes('weekly');
      initNotes('important');
    }, 'PATCH');
  };
</script>
