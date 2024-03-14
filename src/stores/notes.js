import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [
      {
        name: 'Prova',
        datetime: '20/07/1997'
      },
      {
        name: 'Prova2',
        datetime: '20/07/1997'
      }
    ]
  })
});
