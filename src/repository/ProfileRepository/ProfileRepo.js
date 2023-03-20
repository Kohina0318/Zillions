import {SERVER_URL} from '../SERVER_URL';
import {getAppToken} from '../CommonRepository';
import { removeDatafromAsync } from '../AsyncStorageServices';

const getProfileInfo = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/profiles/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`,
      },
    });
    const result = await response.json();

    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');    
      return result;  
    } else {
      return result;
    }

  } catch (err) {
    console.log('error in getProfileInfo...in ProfileRepository ', err);
  }
};

export {getProfileInfo};
