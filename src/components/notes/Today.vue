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
          <v-card-title>
            Visualizzazione giornaliera<br>{{ today.toLocaleDateString('en-GB') }}
          </v-card-title>
          <v-card-text class="list-body">
            <v-card title="Attività giornaliera" elevation="5" style="margin-bottom: 10px;" v-if="dailyNotes['Attività giornaliera']">
              <NoteListItem v-for="note in dailyNotes['Attività giornaliera']" :note="note" :title="note.title" :subtitle="displaySubtitle(note)" />
            </v-card>
            <v-card v-for="hour in Object.keys(dailyNotes).sort().filter(x => x != 'Attività giornaliera')" :title="`Orario ${hour}`" elevation="5" style="margin-bottom: 10px;">
              <NoteListItem v-for="note in dailyNotes[hour]" :note="note" :title="note.title" :subtitle="displaySubtitle(note)" />
            </v-card>
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
  const { initNotes, updateSelectedDate } = notesStore;

  initNotes('daily');
  const { dailyNotes, selectedDate } = storeToRefs(notesStore);
  const today = ref(selectedDate);

  const setDate = (isActive) => {
    isActive.value = false;
    updateSelectedDate(today.value);
    initNotes('daily');
  };

  const displaySubtitle = (note) => {
    return `${note.daily ? '' : datetime.displayTime(note.datetime)}${note.content ? (note.daily ? '' : ' - ') + note.content : ''}`
  };
</script>
