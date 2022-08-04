import '../../../node_modules/leaflet/dist/leaflet.js';

class Map {
  map;
  routesLayer;
  endPointsLayer;
  startPointLayer;
  createMap() {
    this.map = L.map('map').setView(
      [59.14567006861154, 10.211586849669924],
      14
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 21,
      minZoom: 13,
      attribution: '© OpenStreetMap - Mission-Control',
    }).addTo(this.map);
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
    // console.log(this.map);
    if (this.routesLayer) this.routesLayer.remove(this.map);
    this.routesLayer = null;
    const newLayers = [];

    missions.forEach(mission => newLayers.push(...this._createLines(mission)));
    // console.log(...newLayers);
    this.routesLayer = L.layerGroup([...newLayers]).addTo(this.map);
    console.log(this.routesLayer);

    // console.log(missions);
  }
  clearRoutes() {
    // console.log('clearing');
    this.map.removeLayer(this.routesLayer);
  }
  _createEndpoints(mission, handler) {
    // console.log(mission, handler);
    const point = L.geoJSON(mission.endLocation).on('click', handler);
    point.id = mission._id;
    return point;
  }
  plotEndPoints(missions, handler) {
    this.endPointsLayer = null;
    const newEndpoints = [];
    const handlerFunction = handler;

    missions.forEach(mission => {
      newEndpoints.push(this._createEndpoints(mission, handlerFunction));
    });
    // console.log([...newEndpoints]);
    this.endPointsLayer = L.layerGroup([...newEndpoints]).addTo(this.map);
  }
  clearEndPoints() {
    this.map.removeLayer(this.endPointsLayer);
  }
}

export default new Map();
