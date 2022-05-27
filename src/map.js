import TileGrid from 'ol/tilegrid/TileGrid'
import TileImage from 'ol/source/TileImage'
export const getBaiduSourse = () => {
  // 自定义分辨率
  const baiduResolutions = []
  // 计算百度地图使用的分辨率
  for (let i = 0; i <= 18; i++) {
    baiduResolutions[i] = Math.pow(2, 18 - i)
  }
  // 自定义瓦片坐标系
  const baiduTileGrid = new TileGrid({
    origin: [0, 0], // 将原点设置成和百度瓦片坐标系一致
    resolutions: baiduResolutions, // 设置分辨率
  })
  // 百度地图源
  const baiduSource = new TileImage({
    projection: 'BD:09',
    tileGrid: baiduTileGrid,
    tilePixelRatio: 2,
    tileUrlFunction: function (tileCoord) {
      let z = tileCoord[0]
      let x = tileCoord[1]
      let y = tileCoord[2]
      if (x < 0) {
        x = -x
      }
      if (y < 0) {
        y = -y - 1 //初始化地图时，由于ol6算法有变，必须如此设置，否则瓦片加进来会看不见或者位置对不上
      }
      // 服务器的瓦片地址
      return (
        // 'http://xxx.xxx.x.xx/map/' + z + '/' + x + '/' + y + '.png'
        '/map/' + z + '/' + x + '/' + y + '.png'
      )
    },
  })
  return baiduSource
}
