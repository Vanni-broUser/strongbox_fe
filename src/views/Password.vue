<template>
  <v-container class="login-container">
    <v-card elevation="20" title="Crea una password" width="700">
      <v-card-text>
        <v-form @submit.prevent="changePassword">
          <v-row><v-col></v-col></v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Password" v-model="pass" :rules="validation.passwordRules" type="password" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Conferma password" v-model="confirmPass" :rules="validation.passwordRules" type="password" />
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
              <a href="#" @click="goToLogin">Torna al login</a>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import http from '@/utils/http';
  import { SHA256 } from 'crypto-js';
  import validation from '@/utils/validation';
  import { useRouter, useRoute } from 'vue-router';

  const pass = ref('');
  const message = ref('');
  const route = useRoute();
  const router = useRouter();
  const confirmPass = ref('');

  const goToLogin = () => {
    router.push('/');
  }

  const changePassword = () => {
    if (
      !validation.validateInput(pass.value, validation.passwordRules) &&
      !validation.validateInput(confirmPass.value, validation.passwordRules)
    ) {
      if (pass.value != confirmPass.value)
        message.value = 'Le password non coincidono';
      else {
        message.value = '';
        http.postRequest('change-password', {
          pass_token: route.params.token,
          new_password: SHA256(pass.value).toString()
        }, function (data) {
          if (data.status == 'ok')
            message.value = data.message;
          else
            message.value = data.error;
        });
      }
    }
  };
</script>
