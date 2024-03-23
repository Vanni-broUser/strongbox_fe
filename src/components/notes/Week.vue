<template>
  <v-dialog width="500">
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-date-picker show-adjacent-months v-model="start" @update:model-value="setDate(isActive)" style="margin:auto;" />
      </v-card>
    </template>
    <template v-slot:activator="{ props }">
      <v-container>
        <v-card elevation="20" height="600">
          <v-card-title>
            Visualizzazione settimanale<br>
            Inizio: {{ start.toLocaleDateString('en-GB') }}
          </v-card-title>
          <v-card-text class="list-body">
            <v-expansion-panels multiple>
              <v-expansion-panel v-for="day in Object.keys(weeklyNotes)" :title="day">
                <v-expansion-panel-text>
                  <v-list>
                    <NoteListItem v-for="note in weeklyNotes[day]" :note="note" :title="note.title"
                      :subtitle="`${note.daily ? '' : datetime.displayTime(note.datetime)}${note.content ? (note.daily ? '' : ' - ') + note.content : ''}`" />
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
  import { storeToRefs } from 'pinia';
  import datetime from '@/utils/datetime';
  import NoteListItem from './NoteListItem.vue';
  import { useNotesStore } from '@/stores/notes';

  const notesStore = useNotesStore();
  const { initNotes, updateSelectedWeeklyDate } = notesStore;

  
  initNotes('weekly');
  const { weeklyNotes, selectedWeeklyDate } = storeToRefs(notesStore);
  const start = ref(selectedWeeklyDate);

  const setDate = (isActive) => {
    isActive.value = false;
    updateSelectedWeeklyDate(start.value);
    initNotes('weekly');
  };
</script>
