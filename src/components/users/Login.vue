<template>
  <v-card elevation="20" title="Accedi" width="700">
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-row><v-col></v-col></v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="Email" v-model="mail" type="email" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Password" v-model="pass" type="password" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-btn text="Login" block variant="outlined" type="submit" />
          </v-col>
        </v-row>
        <v-row v-if="message">
          <v-col cols="12" md="12">
            {{ message }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            Non hai un account? <a href="#" @click="changeStatus(2)">Registrati qui</a><br>
            Non ricordi la password? <a href="#" @click="changeStatus(3)">Clicca qui</a>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue';
  import http from '@/utils/http';
  import { SHA256 } from 'crypto-js';
  import cookie from '@/utils/cookie';
  import { useRouter } from 'vue-router';

  const mail = ref('');
  const pass = ref('');
  const message = ref('');
  const router = useRouter();
  const emits = defineEmits(['changeStatus']);

  const login = () => {
    if (mail.value && pass.value) {
      message.value = '';
      http.postRequest('login', {
        email: mail.value,
        password: SHA256(pass.value).toString()
      }, function (data) {
        if (data.status == 'ok') {
          cookie.setCookie('strongbox_session_token', data.session_token);
          router.push(`/notes/${data.user_id}`);
        } else
          message.value = data.error;
      });
    }
  };

  const changeStatus = (value) => {
    emits('changeStatus', value);
  }
</script>
