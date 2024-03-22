import http from '@/utils/http';
import { defineStore } from 'pinia';


export const useNotesStore = defineStore('notes', {
  state: () => ({
    editedNote: undefined,
    dailyNotes: [],
    weeklyNotes: []
  }),
  actions: {
    initNotes(type) {
      if (type == 'daily')
        http.getRequest('notes', {}, this.updateDailyNotes);
      else if (type == 'weekly')
        http.getRequest('notes', {}, this.updateWeeklyNotes);
    },
    updateDailyNotes(notes) {
      this.dailyNotes = notes;
    },
    updateWeeklyNotes(notes) {
      this.weeklyNotes = notes;
    },
    updateEditedNote(note) {
      this.editedNote = note;
    }
  }
});
