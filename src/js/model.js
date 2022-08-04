import { AJAX } from './helpers.js';

export const loadMissions = async function (id) {
  try {
    const data = await AJAX(`http://84.234.239.112:3000/api/v1/missions`);
    return data.data;
  } catch (err) {
    console.error(`${err} BOOOOOOM`);
    throw err;
  }
};
