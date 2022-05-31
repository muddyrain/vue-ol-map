<template>
  <div class="home" id="leafletMap"></div>
</template>

<script>
import L from 'leaflet'
import markerIcon from './markerIcon.png'
require('./util/tileLayer.baidu.js')
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    initMap() {
      let map = L.map('leafletMap', {
        minZoom: 10,
        maxZoom: 14,
        center: [30.25308298, 120.2155118],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.Baidu,
      })
      L.marker([30.277981, 120.1523], {
        icon: L.icon({
          iconUrl: markerIcon,
          iconSize: L.point(30, 40),
        }),
      }).addTo(map)
      L.tileLayer.baidu({ layer: 'vec' }).addTo(map)
    },
  },
  mounted() {
    this.initMap()
  },
}
</script>

<style>
html,
body,
.home {
  width: 100%;
  height: 100%;
}
</style>
