import http from '@/utils/http';
import { defineStore } from 'pinia';


export const useNotesStore = defineStore('notes', {
  state: () => ({
    editedNote: undefined,
    selectedDate: new Date(),
    dailyNotes: [],
    weeklyNotes: [],
    importantNotes: []
  }),
  actions: {
    initNotes(type) {
      if (type == 'daily')
        http.getRequest('notes', {
          date: `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth() + 1}-${this.selectedDate.getDate()}`
        }, this.updateDailyNotes);
      else if (type == 'weekly')
        http.getRequest('notes', this.updateWeeklyNotes);
      else if (type == 'important')
        http.getRequest('notes', {main: true}, this.updateImportantsNotes)
    },
    updateDailyNotes(notes) {
      let groupedNotes = {};
      notes.forEach(note => {
        const hour = (new Date(note.datetime)).getHours();
        if (!groupedNotes[hour])
          groupedNotes[hour] = [];
        groupedNotes[hour].push(note);
      });
      this.dailyNotes = groupedNotes;
    },
    updateImportantsNotes(notes) {
      this.importantNotes = notes;
    },
    updateWeeklyNotes(notes) {
      this.weeklyNotes = notes;
    },
    updateEditedNote(note) {
      this.editedNote = note;
    },
    updateSelectedDate(date) {
      this.selectedDate = date;
    }
  }
});
