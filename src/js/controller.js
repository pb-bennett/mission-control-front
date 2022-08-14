import mapView from './views/mapView.js';
import missionInfoView from './views/missionInfoView.js';
import sideBarRightView from './views/sideBarRightView.js';
import loginView from './views/loginView.js';

import { loadMissions } from './model.js';
import { state } from './model.js';
import { loadState } from './model.js';

import users from './dev/users.js';

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

const loginBtnHandler = function (input) {
  if (!input.target.className.includes('login-btn')) return;
  console.log(input, input.target.dataset.id);
  const state = loadState(input.target.dataset.id);
  console.log(state);
  loginView.closeLogin();
};

const missions = async function (id = '') {
  const missions = await loadMissions(id);
  mapView.plotEndPoints(missions, openMissionInfoHandler);
};

//

loginView.showLogin(users, loginBtnHandler);
loadState('ec9c7480a4af7831a4ef2baed044433a');
mapView.createMap();
missions();
