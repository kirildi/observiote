<template>
  <div id="myMap"></div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import L from "leaflet"

export default {
  name: "Map",
  data() {
    return {
      center: [42.103, 23.0]
    }
  },
  mounted() {
    this.setupLeafletMap()
  },
  methods: {
    setupLeafletMap() {
      const mapDiv = L.map("myMap").setView(this.center, 4)
      L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
          zoom: 12
        }
      ).addTo(mapDiv)
      L.control.scale().addTo(mapDiv)

      L.circle([41.361434, 23.117885], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 5000
      }).addTo(mapDiv)
    }
  }
}
</script>

<style scoped>
/* Locations map */
#myMap {
  min-width: 100%;
  min-height: 100%;
}
</style>
