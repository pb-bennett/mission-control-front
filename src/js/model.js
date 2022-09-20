// import * as turf from '@turf/turf';
import { AJAX } from './helpers.js';
import users from './dev/users.js';

export const state = {
  sideBarRightState: 'burger',
};

export const resetState = function () {
  if (state.user) delete state.user;
  state.sideBarRightState = 'burger';
};

export const loadState = function (userID) {
  state.user = users.filter(user => user.id === userID);
  // state.user[0].homeBase.coordinates.reverse();
  return state;
};

export const returnBounds = function (missions) {
  // console.log(missions);
  const availableMissionsBounds = [];
  missions.map(mission =>
    availableMissionsBounds.push(
      mission.endLocation.coordinates,
      ...mission.route.coordinates
    )
  );
  availableMissionsBounds.forEach(el => el.reverse());
  return availableMissionsBounds;
};

export const loadUsers = async function (id = '') {
  const usersList = users;
  return usersList;
};

export const loadMissions = async function (id = '') {
  try {
    const data = await AJAX(`http://192.168.1.48:3000/api/v1/missions/${id}`);
    const missions = data.data.missions;
    if (Array.isArray(missions)) return missions;
    return [missions];
  } catch (err) {
    throw err;
  }
};

export const getAllUsers = async function () {
  const usersList = user;
  return usersList;
};
