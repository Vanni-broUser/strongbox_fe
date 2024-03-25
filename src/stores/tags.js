import http from '@/utils/http';
import { defineStore } from 'pinia';


export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [],
    editedTag: undefined
  }),
  actions: {
    initTags(userId) {
      http.getRequest('tags', {
        user_id: userId
      }, this.updateTags);
    },
    updateTags(tags) {
      this.tags = tags;
    },
    updateEditedTag(tag) {
      this.editedTag = tag;
    }
  }
});
