<template>
  <InitialArea id="home" />
  <Services id="services" />
  <v-container>
    <hr :style="{ backgroundColor: theme.current.value.colors.primary, height: '5px' }" />
  </v-container>
  <DoubleCards />
  <v-container>
    <hr :style="{ backgroundColor: theme.current.value.colors.primary, height: '5px' }" />
  </v-container>
  <Contacts id="contacts" />
  <MapElement />
</template>

<script setup>
  import { useTheme } from 'vuetify';
  import MapElement from '@/components/Map';
  import Contacts from '@/components/Contacts';
  import Services from '@/components/Services';
  import DoubleCards from '@/components/DoubleCards';
  import InitialArea from '@/components/InitialArea';

  const theme = useTheme();
</script>
