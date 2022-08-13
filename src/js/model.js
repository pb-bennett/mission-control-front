// import * as turf from '@turf/turf';
import { AJAX } from './helpers.js';

// const state = {
//   userName: '',
// };

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
