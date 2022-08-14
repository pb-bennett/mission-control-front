// import * as turf from '@turf/turf';
import { AJAX } from './helpers.js';
import users from './dev/users.js';

console.log(users);

export const state = {
  sideBarRightState: 'burger',
};

console.log(state);
export const loadState = function (userID) {
  state.user = null;
  state.user = users.filter(user => user.id === userID);
  return state;
};

export const loadMissions = async function (id = '') {
  try {
    const data = await AJAX(`http://192.168.1.48:3000/api/v1/missions/${id}`);
    const missions = data.data.missions;
    console.log(missions);
    if (Array.isArray(missions)) return missions;
    return [missions];
  } catch (err) {
    console.error(`${err} BOOOOOOM`);
    throw err;
  }
};

export const getAllUsers = function () {
  return users;
};
