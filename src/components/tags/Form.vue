<template>
  <v-container>
    <v-card elevation="20" title="Crea un tag">
      <v-card-text>
        <v-form fast-fail @submit.prevent="saveTag">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field label="Nome" variant="outlined" v-model="name" :rules="validation.requiredRules" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-btn text="Salva" block variant="outlined" type="submit" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import http from '@/utils/http';
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import validation from '@/utils/validation';
  import { useTagsStore } from '@/stores/tags';

  const name = ref('');
  const route = useRoute();

  const tagsStore = useTagsStore();
  const { initTags, updateEditedTag } = tagsStore;
  const { editedTag } = storeToRefs(tagsStore);

  watch(editedTag, function (newValue) {
    if (newValue)
      name.value = newValue.name;
  });

  const saveTag = () => {
    if (!validation.validateInput(name.value, validation.requiredRules)) {
      http.postRequest(`instances/Tag${editedTag.value ? '/' + editedTag.value.id : ''}`, {
        params: {
          name: name.value,
          user_id: route.params.userId
        }
      }, function (data) {
        name.value = '';
        updateEditedTag(undefined);
        initTags(route.params.userId);
      }, editedTag.value ? 'PATCH' : 'POST');
    }
  };
</script>
