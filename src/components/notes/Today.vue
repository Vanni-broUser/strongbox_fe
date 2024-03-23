<template>
  <v-dialog width="500">
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-date-picker show-adjacent-months v-model="today" @update:model-value="setDate(isActive)" style="margin:auto;" />
      </v-card>
    </template>
    <template v-slot:activator="{ props }">
      <v-container>
        <v-card elevation="20" height="600">
          <v-card-title style="white-space: normal;">
            Visualizzazione giornaliera - {{ selectedDate.toLocaleDateString('en-GB') }}
          </v-card-title>
          <v-card-text class="body">
            <v-expansion-panels multiple>
              <v-expansion-panel v-for="hour in Object.keys(dailyNotes)" :title="hour">
                <v-expansion-panel-text>
                  <v-list>
                    <v-list-item v-for="note in dailyNotes[hour]" :title="note.title" :subtitle="note.content">
                      <template v-slot:append>
                        <v-btn icon="mdi-pencil" variant="text" @click="updateEditedNote(note)" />
                        <v-btn icon="mdi-delete" variant="text" @click="deleteNote(note)"/>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
          <v-card-actions class="actions">
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
  const { initNotes, updateEditedNote, updateSelectedDate } = notesStore;

  const deleteNote = (note) => {
    http.getRequest(`instances/Note/${note.id}`, {}, function (data) {
      initNotes('daily');
    }, 'DELETE');
  };

  initNotes('daily');
  const { dailyNotes, selectedDate } = storeToRefs(notesStore);

  const setDate = (isActive) => {
    isActive.value = false;
    updateSelectedDate(today.value);
    initNotes('daily');
  };
</script>

<style scoped>
  .actions {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .body {
    overflow-y: auto;
    height: 450px;
  }
</style>
