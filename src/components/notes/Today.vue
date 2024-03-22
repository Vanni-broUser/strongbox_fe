<template>
  <v-dialog width="500">
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-date-picker show-adjacent-months v-model="today" @update:model-value="isActive.value = false" style="margin:auto;" />
      </v-card>
    </template>
    <template v-slot:activator="{ props }">
      <v-container>
        <v-card elevation="20">
          <v-card-title style="white-space: normal;">
            Visualizzazione giornaliera - {{ today.toLocaleDateString('en-GB') }}
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="note in dailyNotes" :title="note.title" :subtitle="note.content">
                <template v-slot:append>
                  <v-btn icon="mdi-pencil" variant="text" @click="updateEditedNote(note)" />
                  <v-btn icon="mdi-delete" variant="text" @click="deleteNote(note)"/>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions style="float: right;">
            <v-btn text="Cambia giorno" variant="outlined" v-bind="props" />
          </v-card-actions>
        </v-card>
      </v-container>
    </template>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue';
  import http from '@/utils/http';
  import { storeToRefs } from 'pinia';
  import { useNotesStore } from '@/stores/notes';

  const today = ref(new Date());
  const notesStore = useNotesStore();
  const { initNotes, updateEditedNote } = notesStore;
  initNotes('daily');
  const { dailyNotes } = storeToRefs(notesStore);

  const deleteNote = (note) => {
    http.getRequest(`instances/Note/${note.id}`, {}, function (data) {
      initNotes('daily');
    }, 'DELETE');
  };
</script>
