<template class="app-bar">
  <v-navigation-drawer v-model="drawer" location="bottom" style="height: 150px;" temporary>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" @click="link(item.path)">
        {{ $t(item.title) }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar :elevation="2" color="primary">
    <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
    <v-app-bar-title @click="link('/#home')"><b>
      {{ $t('AppBar.title') }}
    </b></v-app-bar-title>
    <div v-if="!isMobile" class="desktop-menu" v-for="(item, index) in items" :key="index">
      <v-btn variant="text" @click="link(item.path)">
        {{ $t(item.title) }}
      </v-btn>
    </div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" style="margin-right: 10px;" variant="outlined">
          <v-img src="@/assets/china_flag.png" v-if="languageFlag" />
          <v-img src="@/assets/italy_flag.png" v-else />
        </v-avatar>
      </template>
      <v-list>
        <v-list-item v-for="(language, j) in languages" :key="j">
          <v-list-item-title @click="set_language(language)">{{ language }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
  import { ref } from 'vue';
  import i18n from '@/plugins/i18n';
  import utils from '@/utils/mobile';
  import { useRouter } from 'vue-router';

  const drawer = ref(null);
  const languageFlag = ref(true);
  const router = ref(useRouter());
  const isMobile = utils.setupMobileUtils();

  const link = (path) => {
    router.value.push(path);
  }

  const items = ref([
    {
      title: 'AppBar.menu1',
      path: '/#services'
    },
    {
      title: 'AppBar.menu2',
      path: '/#contacts'
    }
  ]);

  const languages = ref([
    '中国人',
    'Italiano'
  ]);

  const set_language = (language) => {
    languageFlag.value = language == '中国人';
    i18n.global.locale = languageFlag.value ? 'zh' : 'it';
  };
</script>

<style scoped>
  .desktop-menu {
    padding-right: 20px;
  }
  .router-link-exact-active,
  .router-link-active,
  .router-link-exact-active a {
    text-decoration: none;
    color: inherit;
  }
  .router-link:hover {
    text-decoration: underline;
  }
</style>
