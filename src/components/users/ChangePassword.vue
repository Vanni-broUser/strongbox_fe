<template>
  <v-card elevation="20" title="Recupera la password" width="700">
    <v-card-text>
      <v-form @submit.prevent="askChangePassword">
        <v-row><v-col></v-col></v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Email" v-model="mail" type="email" :rules="validation.emailRules" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-btn text="Invia" block variant="outlined" type="submit" />
          </v-col>
        </v-row>
        <v-row v-if="message">
          <v-col cols="12" md="12">
            {{ message }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <a href="#" @click="changeStatus(1)">Torna al login</a>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue';
  import http from '@/utils/http';
  import validation from '@/utils/validation';

  const mail = ref('');
  const message = ref('');
  const emits = defineEmits(['changeStatus']);

  const changeStatus = (value) => {
    emits('changeStatus', value);
  }

  const askChangePassword = () => {
    if (!validation.validateInput(mail.value, validation.emailRules)) {
      message.value = '';
      http.postRequest('ask-change-password', {
        email: mail.value
      }, function (data) {
        if (data.status == 'ok')
          message.value = data.message;
        else
          message.value = data.error;
      });
    }
  };
</script>
