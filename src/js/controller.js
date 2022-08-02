import mapView from './views/mapView.js';

import { loadMissions } from './model.js';

mapView.createMap();

const missions = async function () {
  const missions = await loadMissions();
  console.log(missions);
};

missions();
