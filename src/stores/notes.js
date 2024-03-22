import http from '@/utils/http';
import { defineStore } from 'pinia';


export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),
  actions: {
    initNotes() {
      http.getRequest('get-notes', {}, function (data) {
        this.notes = data;
      });
    }
  }
});
