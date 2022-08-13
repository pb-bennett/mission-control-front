// import * as turf from '@turf/turf';
import { AJAX } from './helpers.js';

export const state = {
  userName: 'Paul',
  id: 'ec9c7480a4af7831a4ef2baed044433a',
  homeBase: {
    address: { road: 'Plutos vei 23', town: 'Sandefjord', postCode: '3226' },
  },
  currentMission: {
    currentMissionId: '62eb99097bed694df0712dbf',
    dateStarted:
      'Sat Aug 13 2022 17:13:46 GMT+0200 (Central European Summer Time)',
  },
};

export const loadMissions = async function (id = '') {
  try {
    const data = await AJAX(`http://192.168.1.48:3000/api/v1/missions/${id}`);
    const missions = data.data.missions;
    if (Array.isArray(missions)) return missions;
    return [missions];
  } catch (err) {
    console.error(`${err} BOOOOOOM`);
    throw err;
  }
};
