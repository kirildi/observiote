<script setup lang="ts">
import { onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";

const center: LatLngTuple = [42.103, 23.0];
const mapOptions = {
  attribution: 'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  zoom: 12,
};
onMounted(() => {
  let mapDiv = new L.Map("myMap").setView(center, 4);
  L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", mapOptions).addTo(mapDiv);
  L.control.scale().addTo(mapDiv);

  L.circle([41.361434, 23.117885], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 5000,
  }).addTo(mapDiv);
});
</script>
<template>
  <div id="myMap" class="h-72 rounded-2xl object-cover"></div>
</template>

<style scoped></style>
