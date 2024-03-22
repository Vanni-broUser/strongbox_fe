<template>
  <v-app>
    <v-layout>
      <Navigation />
      <View />
    </v-layout>
    <Footer />
  </v-app>
</template>

<script setup>
  import View from './View';
  import Footer from './Footer';
  import Navigation from './Navigation';
</script>
