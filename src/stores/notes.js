import http from '@/utils/http';
import { defineStore } from 'pinia';
import datetime from '@/utils/datetime';

const pushIntoArrayObject = (obj, key, note) => {
  if (!obj[key])
    obj[key] = [];
  obj[key].push(note);
};

const getEndWeeklyDay = (input) => {
  let start = new Date(input);
  start.setDate(start.getDate() + 7);
  return start;
}

const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
};

export const useNotesStore = defineStore('notes', {
  state: () => ({
    editedNote: undefined,
    selectedDate: new Date(),
    selectedWeeklyDate: new Date(),
    dailyNotes: {},
    weeklyNotes: {},
    importantNotes: [],
    completedNotes: []
  }),
  actions: {
    initNotes(type) {
      if (type == 'daily')
        http.getRequest('notes', {
          date: formatDate(this.selectedDate)
        }, this.updateDailyNotes);
      else if (type == 'weekly') {
        const start = this.selectedWeeklyDate;
        http.getRequest('notes', {
          start: formatDate(start),
          end: formatDate(getEndWeeklyDay(start))
        }, this.updateWeeklyNotes);
      }
      else if (type == 'important')
        http.getRequest('notes', {main: true}, this.updateImportantsNotes)
      else if (type == 'completed')
        http.getRequest('notes', {completed: true}, this.updateCompletedNotes)
    },
    updateCompletedNotes(notes) {
      notes.forEach(note => {
        note.updated_at = new Date(note.updated_at).toLocaleDateString('en-GB');
        note.datetime = new Date(note.datetime).toLocaleDateString('en-GB');
      });
      this.completedNotes = notes;
    },
    updateDailyNotes(notes) {
      let groupedNotes = {};
      notes.forEach(note => {
        note.datetime = new Date(note.datetime);
        if (note.daily)
          pushIntoArrayObject(groupedNotes, 'Attività giornaliera', note);
        else {
          const hour = note.datetime.getUTCHours().toString().padStart(2, '0');
          pushIntoArrayObject(groupedNotes, hour, note);
        }
      });
      Object.keys(groupedNotes).forEach(key => {
        groupedNotes[key].sort((a, b) => {
          return a.datetime - b.datetime;
        });
      });
      this.dailyNotes = groupedNotes;
    },
    updateImportantsNotes(notes) {
      notes.forEach(note => {
        if (note.datetime) 
          note.datetime = new Date(note.datetime);
        note.updated_at = new Date(note.updated_at);
      });
      notes.sort((a, b) => {
        return b.updated_at - a.updated_at;
      });
      this.importantNotes = notes;
    },
    updateWeeklyNotes(notes) {
      let groupedNotes = {};
      let tempObject = {};
      notes.forEach(note => {
        note.datetime = new Date(note.datetime);
        const day = datetime.displayWeekDayName(note.datetime);
        pushIntoArrayObject(tempObject, day, note);
      });
      Object.keys(tempObject).sort().forEach(key => {
        groupedNotes[key] = tempObject[key];
      });
      Object.keys(groupedNotes).forEach(key => {
        groupedNotes[key].sort((a, b) => {
          return a.datetime - b.datetime;
        });
      });
      this.weeklyNotes = groupedNotes;
    },
    updateEditedNote(note) {
      this.editedNote = note;
    },
    updateSelectedDate(date) {
      this.selectedDate = date;
    },
    updateSelectedWeeklyDate(date) {
      this.selectedWeeklyDate = date;
    }
  }
});
