// import * as turf from '@turf/turf';
import { AJAX } from './helpers.js';
import users from './dev/users.js';

console.log(users);

export const state = {
  // user: {
  //   userName: 'Paul',
  //   id: 'ec9c7480a4af7831a4ef2baed044433a',
  //   homeBase: {
  //     address: { road: 'Plutos vei 23', town: 'Sandefjord', postCode: '3226' },
  //   },
  //   currentMission: {
  //     currentMissionId: '62eb99097bed694df0712dbf',
  //     dateStarted:
  //       'Sat Aug 13 2022 17:13:46 GMT+0200 (Central European Summer Time)',
  //   },
  // },
  sideBarRightState: 'burger',
};

console.log(state);
export const loadState = function (user) {
  state.user = null;
  state.user = users.filter(el => el.userName === user);
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
