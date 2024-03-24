<template>
  <v-container><h1>Note</h1></v-container>
  <Importants />
  <Form />
  <BottomNavigation />
</template>

<script setup>
  import Form from '@/components/notes/Form';
  import Importants from '@/components/notes/Importants';
  import BottomNavigation from '@/components/notes/BottomNavigation';
</script>
