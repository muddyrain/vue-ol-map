<template>
  <div id="App">
    <div ref="olMap" id="map" class="ol-map" />
  </div>
</template>

<script>
import 'ol/ol.css'
import { getBaiduSourse } from './map'
import TileLayer from 'ol/layer/Tile'
import { Map, View, Feature } from 'ol'
import { fromLonLat } from 'ol/proj'
import { Point } from 'ol/geom'
import { Style, Icon, Text, Stroke, Fill } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import markerIcon from './markerIcon.png'
import {
  Pointer as PointerInteraction,
  defaults as defaultInteractions,
} from 'ol/interaction'
export default {
  name: 'App',
  data() {
    return {
      map: null,
      pointLayer: null,
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      class Drag extends PointerInteraction {
        constructor() {
          super()

          /**
           * @type {import("../src/ol/coordinate.js").Coordinate}
           * @private
           */
          this.coordinate_ = null

          /**
           * @type {string|undefined}
           * @private
           */
          this.cursor_ = 'pointer'

          /**
           * @type {Feature}
           * @private
           */
          this.feature_ = null

          /**
           * @type {string|undefined}
           * @private
           */
          this.previousCursor_ = undefined
        }
      }
      const tileLayer = new TileLayer({
        source: getBaiduSourse(),
      })
      const centerLngLat = [120.1875, 30.260541]
      this.map = new Map({
        interactions: defaultInteractions().extend([new Drag()]),
        layers: [tileLayer],
        view: new View({
          center: fromLonLat(centerLngLat), // 地图中心点
          zoom: 8, // 缩放级别
          minZoom: 0, // 最小缩放级别
          maxZoom: 19, // 最大缩放级别
          constrainResolution: true, // 非整数的缩放级别，
        }),
        target: this.$refs.olMap, // DOM容器
      })
      this.loadMarkers()
    },
    loadMarkers() {
      const list = [
        [120.190662, 30.250059],
        [120.190662, 30.250059],
        [120.072517, 30.27152],
      ]
      const markers = []
      for (const item of list) {
        // 创建feature，一个feature就是一个点坐标信息
        const feature = new Feature({
          type: 'point',
          geometry: new Point(
            // 经纬度需要转换一下
            fromLonLat(item)
          ),
          // 这里可以放对应的参数数据 任意数据 最后都会收集到事件的 values_ 中
          data: {
            id: 'xxxx',
            name: 'ol-map',
          },
          author: 'muddyrain',
        })
        feature.setStyle(
          new Style({
            cursor: 'pointer',
            zIndex: 999,
            // 设置图片效果
            image: new Icon({
              src: markerIcon,
              scale: 0.75,
              // offset: [-15, 0], // 偏移量
              anchor: [1, 1],
            }),
            text: new Text({
              textAlign: 'right',
              textBaseline: 'middle',
              text: '我在这',
              color: 'red',
              fill: new Fill({
                color: '#FFF',
              }),
              font: '16px Calibri,sans-serif',
              stroke: new Stroke({
                color: '#333333',
                width: 5,
              }),
            }),
          })
        )
        markers.push(feature)
      }
      const pointLayer = new VectorLayer({
        source: new VectorSource(),
      })
      this.map.addLayer(pointLayer)
      // 批量添加feature
      pointLayer.getSource().addFeatures(markers)
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#App,
.ol-map {
  width: 100%;
  height: 100%;
}
</style>
