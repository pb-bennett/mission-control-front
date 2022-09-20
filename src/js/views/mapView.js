import '../../../node_modules/leaflet/dist/leaflet.js';

class Map {
  _map;
  _routesLayer;
  _endPointsLayer;
  _homePoint; //59.14567006861154, 10.211586849669924 <--- home
  _homeIcon = L.divIcon({
    html: '<i class="fa-solid fa-house-chimney"></i>',
    iconSize: [40, 40],
    className: 'myDivIcon',
  });

  createMap(initCoords = [60.17580089165257, 7.572296643958876]) {
    this._map = L.map('map').setView(initCoords, 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 21,
      minZoom: 7,
      attribution: '© OpenStreetMap - Mission-Control',
    }).addTo(this._map);
  }

  _createLines(mission) {
    const lineStyle = {
      color: '#fcba03',
      weight: 4,
      opaciity: 0.7,
    };
    const lineStyleBackground = { color: '#000000', weight: 5, opaciity: 0.7 };
    return [
      L.geoJSON(mission.route, { style: lineStyleBackground }),
      L.geoJSON(mission.route, { style: lineStyle }),
    ];
  }
  plotRoutes(missions) {
    if (this._routesLayer) this._routesLayer.remove(this._map);
    this._routesLayer = null;
    const newLayers = [];

    missions.forEach(mission => newLayers.push(...this._createLines(mission)));
    this._routesLayer = L.layerGroup([...newLayers]).addTo(this._map);
  }
  _createEndpoints(mission, handler) {
    const point = L.geoJSON(mission.endLocation).on('click', handler);
    point.id = mission._id;
    // console.log(point);
    return point;
  }
  plotEndPoints(missions, handler, state) {
    // console.log(missions);
    if (this._endPointsLayer) this._endPointsLayer.remove(this._map);
    this._endPointsLayer = '';
    const newEndpoints = [];
    const handlerFunction = handler;

    missions.forEach(mission => {
      newEndpoints.push(this._createEndpoints(mission, handlerFunction));
    });
    console.log(...newEndpoints);
    this._endPointsLayer = L.layerGroup([...newEndpoints]).addTo(this._map);
  }
  plotHomePoint(state) {
    this._homePoint = null;
    this._homePoint = L.marker(state.user[0].homeBase.coordinates, {
      icon: this._returnMarkerIcon('red'),
    }).addTo(this._map);
  }
  clearRoutes() {
    if (this._routesLayer) this._map.removeLayer(this._routesLayer);
  }
  clearEndPoints() {
    if (this._endPointsLayer) this._map.removeLayer(this._endPointsLayer);
  }
  clearHomePoints() {
    if (this._homePoint) this._map.removeLayer(this._homePoint);
  }
  flyToPoint(point, zoom) {
    this._map.flyTo(point, zoom);
  }
  flyToBounds(bounds) {
    this._map.flyToBounds(bounds, {
      padding: [100, 100],
    });
  }
  _returnMarkerIcon(color) {
    return L.icon({
      iconUrl: `src/icons/marker-icon-${color}.png`,
      shadowUrl: 'src/icons/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }
}

export default new Map();
