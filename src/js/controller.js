import mapView from './views/mapView.js';
import missionInfoView from './views/missionInfoView.js';

import { loadMissions } from './model.js';

mapView.createMap();

const closeMissionInfoHandler = function () {
  missionInfoView.clearMissionInfo();
  mapView.clearRoutes();
};

const openMissionInfoHandler = async function (input) {
  // console.log(input.target.id);
  const missions = await loadMissions(input.target.id);
  mapView.plotRoutes(missions);
  missionInfoView.showMissionInfo(...missions, closeMissionInfoHandler);
};

const missions = async function (id = '') {
  const missions = await loadMissions(id);
  // console.log(missions);
  // mapView.plotRoutes(missions);
  mapView.plotEndPoints(missions, openMissionInfoHandler);
  // setTimeout(() => {
  //   console.log('clear');
  //   mapView.clearRoutes();
  // }, 5000);
};

missions();

// '62e3ab2a64078ea1095782e4'
