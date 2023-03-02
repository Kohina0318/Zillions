import { SERVER_URL } from "../SERVER_URL";
import { getAppToken } from "../CommonRepository";

const getProfileInfo = async () => {

  try {
    const response = await fetch(
      `${await SERVER_URL()}/profiles/info`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`
      }
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getProfileInfo...in ProfileRepository ', err);
  }
};


export {getProfileInfo};
