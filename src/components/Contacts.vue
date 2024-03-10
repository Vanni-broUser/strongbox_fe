<template>
  <v-container>
    <v-card elevation="20">
      <v-card-title>
        {{ $t('Contacts.title') }}
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-btn href="https://u.wechat.com/kKWcHWxpWD6K0s1KpYKf9p8" block target="_blank" color="primary">
              {{ $t('Contacts.button1') }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-icon icon="mdi-wechat" color="primary" style="float: left;" />
            <p class="contact__text">WeChat</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-icon icon="mdi-phone-classic" color="primary" style="float: left;" />
            <p class="contact__text">Telefono</p>
          </v-col>
          <v-col cols="12" md="6">
            <v-icon icon="mdi-email" color="primary" style="float: left;" />
            <p class="contact__text">Mail</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-icon icon="mdi-phone" color="primary" style="float: left;" />
            <p class="contact__text">Cellulare</p>
          </v-col>
          <v-col cols="12" md="6">
            <v-icon icon="mdi-map-marker" color="primary" style="float: left;" />
            <p class="contact__text">Indirizzo</p>
          </v-col>
        </v-row><br>
        <hr :style="{ height: '5px', backgroundColor: theme.current.value.colors.primary }" />
        <br><b>
          {{ $t('Contacts.subtitle') }}
        </b><br><br>
        <v-form fast-fail @submit.prevent="sendMail">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="name" :rules="validation.requiredRules" variant="outlined">
                <v-text-field-label>
                  {{ $t('Contacts.label1') }}
                </v-text-field-label>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" :rules="validation.emailRules" variant="outlined">
                <v-text-field-label>
                  {{ $t('Contacts.label2') }}
                </v-text-field-label>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-textarea :label="$t('Contacts.label3')" rows="4" v-model="body" :rules="validation.requiredRules" variant="outlined" />
            </v-col>
          </v-row><br>
          <v-btn block text="Invia" type="submit" color="primary">
            {{ $t('Contacts.button2') }}
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import { useTheme } from 'vuetify';
  import validation from '@/utils/validation';

  const name = ref('');
  const body = ref('');
  const email = ref('');
  const theme = useTheme();

  const sendMail = () => {
    if (
      !validation.validateInput(email.value, validation.emailRules) &&
      !validation.validateInput(name.value, validation.requiredRules) &&
      !validation.validateInput(body.value, validation.requiredRules)
    ) {
      alert("Mail inviata\nTi ringraziamo per il contatto");
    }
  };
</script>

<style scoped>
  .contact__text {
    margin-left:10px;
    float: left;
  }
</style>
