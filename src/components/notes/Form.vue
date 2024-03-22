<template>
  <v-container>
    <v-form fast-fail @submit.prevent="saveNote">
      <v-card elevation="20" title="Crea una nota">
        <v-card-text>
          <v-text-field v-model="title" label="Titolo" variant="outlined" :rules="validation.requiredRules" />
          <v-textarea v-model="content" label="Contenuto" variant="outlined" />
        </v-card-text>
        <v-card-actions style="float: right;">
          <v-btn text="Salva" variant="outlined" />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import http from '@/utils/http';
  import validation from '@/utils/validation';

  const title = ref('');
  const content = ref('');

  const saveNote = () => {
    if (!validation.validateInput(title.value, validation.requiredRules)) {
      title.value = '';
      content.value = '';
      http.postRequest('instances/Note', {
        params: {
          title: title.value,
          content: content.value
        }
      }, function (data) {

      });
    }
  };
</script>
