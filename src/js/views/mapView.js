import '../../../node_modules/leaflet/dist/leaflet.js';

class Map {
  map;
  routesLayer;
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
  plotRoutes(missions) {
    this.routesLayer = null;
  }
}

export default new Map();
