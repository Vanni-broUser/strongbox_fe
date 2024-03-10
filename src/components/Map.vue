<template>
  <v-container>
    <v-card elevation="20">
      <v-card-title>
        {{ $t('Map.title') }}
      </v-card-title>
      <v-container>
        <div id="map" />
      </v-container>
    </v-card>
  </v-container>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import L from 'leaflet';
  
  const map = ref(null);
  
  onMounted(() => {
    map.value = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map.value);
  });
</script>
  
<style scoped>
  #map {
    border: solid 1px grey;
    border-radius: 5px;
    height: 400px;
    width: 100%;
  }
</style>
  