import mapView from './views/mapView.js';
import missionInfoView from './views/missionInfoView.js';
import sideBarRightView from './views/sideBarRightView.js';
import loginView from './views/loginView.js';

import {
  loadMissions,
  state,
  loadState,
  returnBounds,
  loadUsers,
  resetState,
} from './model.js';

const closeMissionInfoHandler = async function () {
  const missions = await loadMissions();
  missionInfoView.clearMissionInfo();
  mapView.clearRoutes();
  mapView.plotEndPoints(missions, openMissionInfoHandler, state);
  flyToBounds(missions);
};

const openMissionInfoHandler = async function (input) {
  const missions = await loadMissions(input.target.id);
  mapView.plotRoutes(missions);
  mapView.plotEndPoints(missions, openMissionInfoHandler, state);
  flyToBounds(missions);
  missionInfoView.showMissionInfo(...missions, closeMissionInfoHandler);
};

const minimiseSideBarRight = function () {
  state.sideBarRightState = 'burger';
  sideBarRightView.renderSideBar(state, sideBarRightHandler);
};

const flyToBounds = async function (missions) {
  const bounds = returnBounds(missions);
  mapView.flyToBounds(bounds);
};

const loginBtnHandler = async function (input, id = '') {
  if (!input.target.className.includes('login-btn')) return;
  const state = await loadState(input.target.dataset.id);
  const missions = await loadMissions(id);
  mapView.flyToPoint(state.user[0].homeBase.coordinates, 16);
  mapView.flyToPoint(state.user[0].homeBase.coordinates, 16);
  loginView.closeLogin();
  mapView.flyToPoint(state.user[0].homeBase.coordinates, 16);
  // mapView.plotEndPoints(missions, openMissionInfoHandler, state);
  const bounds = returnBounds(missions);
  sideBarRightView.renderSideBar(state, sideBarRightHandler);
  mapView.plotHomePoint(state);
  mapView.flyToPoint(state.user[0].homeBase.coordinates, 16);
  console.log(state.user[0].homeBase.coordinates);
  console.log(state);
};

const sideBarRightHandler = function (input) {
  const target = input.target.closest('.side-menu-btn');
  if (target && target.dataset.btn.includes('burger'))
    return sideBarRightHandlerBurger(target.dataset.btn);
  if (target && target.dataset.btn.includes('arrow'))
    return sideBarRightHandlerArrow(target.dataset.btn);
  if (target) sideBarRightHandlerHelper(target.dataset.btn);
};

const sideBarRightHandlerHelper = function (btn) {
  if (btn === 'user') return;
  if (btn === 'current') return;
  if (btn === 'available') plotEndPoints();
  if (btn === 'create') return;
  if (btn === 'settings') return;
  if (btn === 'logout') logout();
};

const logout = async function () {
  const users = await loadUsers();
  setTimeout(loginView.showLogin.bind(loginView, users), 2000);
  mapView.flyToPoint([60.17580089165257, 7.572296643958876], 7);
  mapView.clearEndPoints();
  mapView.clearHomePoints();
  mapView.clearRoutes();
  missionInfoView.clearMissionInfo();
  resetState();
  loginView.showOverlay();
  sideBarRightView.hideSideBar();
  console.log(state);
};

const plotEndPoints = async function (id = '') {
  const missions = await loadMissions(id);
  mapView.plotEndPoints(missions, openMissionInfoHandler, state);
  flyToBounds(missions);
  minimiseSideBarRight();
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

const init = async function () {
  const users = await loadUsers();
  loginView.showLogin(users, loginBtnHandler);
  mapView.createMap();
  console.log(state);
};

init();
