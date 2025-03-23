<template>
  <div id="map" class="w-3/4 h-[500px]"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';


onMounted(() => {

  const map = L.map('map').setView([-25.3604, 27.1775], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
});
</script>
