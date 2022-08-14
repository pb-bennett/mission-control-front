import mapView from './views/mapView.js';
import missionInfoView from './views/missionInfoView.js';
import sideBarRightView from './views/sideBarRightView.js';
import loginView from './views/loginView.js';

import { loadMissions } from './model.js';
import { state } from './model.js';
import { loadState } from './model.js';
import { returnBounds } from './model.js';

import users from './dev/users.js';

const closeMissionInfoHandler = function () {
  missionInfoView.clearMissionInfo();
  mapView.clearRoutes();
};

const openMissionInfoHandler = async function (input) {
  const missions = await loadMissions(input.target.id);
  mapView.plotRoutes(missions);
  missionInfoView.showMissionInfo(...missions, closeMissionInfoHandler);
};

const loginBtnHandler = async function (input, id = '') {
  if (!input.target.className.includes('login-btn')) return;
  const state = loadState(input.target.dataset.id);
  const missions = await loadMissions(id);
  loginView.closeLogin();
  // mapView.plotEndPoints(missions, openMissionInfoHandler, state);
  const bounds = returnBounds(missions);
  sideBarRightView.renderSideBar(state, sideBarRightHandler);
  mapView.plotHomePoint(state);
  // missionsGo();
  // await missionsGo(); [59.14567006861154, 10.211586849669924]
  // mapView.flyToBounds(bounds);
  console.log(state);
  mapView.flyToPoint(state.user[0].homeBase.coordinates, 18);
};

const sideBarRightHandler = function (input) {
  const target = input.target.closest('.side-menu-btn');
  if (target && target.dataset.btn.includes('burger'))
    sideBarRightHandlerBurger(target.dataset.btn);
  if (target && target.dataset.btn.includes('arrow'))
    sideBarRightHandlerArrow(target.dataset.btn);
};

const sideBarRightHandlerArrow = function (btn) {
  if (btn === 'min-arrow') state.sideBarRightState = 'max';
  if (btn === 'max-arrow') state.sideBarRightState = 'min';
  sideBarRightView.renderSideBar(state, sideBarRightHandler);
};

const sideBarRightHandlerBurger = function (btn) {
  if (btn === 'max-burger' || btn === 'min-burger') {
    state.sideBarRightState = 'burger';
  }
  if (btn === 'burger-burger') {
    state.sideBarRightState = 'min';
  }
  sideBarRightView.renderSideBar(state, sideBarRightHandler);
};

const missionsGo = async function (id = '') {
  const missions = await loadMissions(id);
  mapView.plotEndPoints(missions, openMissionInfoHandler, state);
};

//
// missionsGo();
loginView.showLogin(users, loginBtnHandler);

mapView.createMap();
