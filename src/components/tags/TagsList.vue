<template>
  <v-container>
    <v-card elevation="20">
      <v-card-text class="list-body">
        <v-list>
          <v-list-item v-for="tag in tags" :title="tag.name">
            <template v-slot:append>
              <v-btn icon="mdi-pencil" variant="text" @click="updateEditedTag(tag)" />
              <v-btn icon="mdi-delete" variant="text" @click="deleteTag(tag)"/>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import http from '@/utils/http';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { useTagsStore } from '@/stores/tags';

  const route = useRoute();

  const tagsStore = useTagsStore();
  const { initTags, updateEditedTag } = tagsStore;
  initTags(route.params.userId);
  const { tags } = storeToRefs(tagsStore);

  const deleteTag = (tag) => {
    http.getRequest(`instances/Tag/${tag.id}`, {}, function (data) {
      initTags(route.params.userId);
    }, 'DELETE');
  };
</script>
