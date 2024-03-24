<template>
  <v-navigation-drawer v-if="drawerEnabled" expand-on-hover>
    <v-list>
      <v-list-item prepend-icon="mdi-account-hard-hat-outline" subtitle="colasanto.giovanni.inf@gmail.com" title="Vanni" />
    </v-list>
    <v-divider />
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-calendar-text-outline" title="Note" @click="goTo('notes')" />
      <v-list-item prepend-icon="mdi-text-box-multiple" title="Documenti" value="shared" @click="goTo('documents')" />
      <v-list-item prepend-icon="mdi-finance" title="Finanza personale" value="starred" @click="goTo('finances')" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { ref } from 'vue';
  import cookie from '@/utils/cookie';
  import { useRouter, useRoute } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const drawerEnabled = ref(cookie.getCookie('strongbox_session_token') != null);

  const goTo = (page) => {
    router.push(`/${page}/${route.params.user_id}`);
  };
</script>
