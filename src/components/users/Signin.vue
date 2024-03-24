<template>
  <v-card elevation="20" title="Registrati qui" width="700">
    <v-card-text>
      <v-form @submit.prevent="registerUser">
        <v-row><v-col></v-col></v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="Nome" v-model="name" :rules="validation.requiredRules" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Email" v-model="mail" type="email" :rules="validation.emailRules" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-btn text="Registrati" block variant="outlined" type="submit" />
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
  const name = ref('');
  const message = ref('');
  const emits = defineEmits(['changeStatus']);

  const changeStatus = (value) => {
    emits('changeStatus', value);
  }

  const registerUser = () => {
    if (
      !validation.validateInput(mail.value, validation.emailRules) &&
      !validation.validateInput(name.value, validation.requiredRules)
    ) {
      message.value = '';
      http.postRequest('register-user', {
        name: name.value,
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
