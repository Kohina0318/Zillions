import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const postEditProfile = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/registration/update_info`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data',
        Authorization: null},
        body: formdata,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postEditProfile...in ProfileRepository ', err);
  }
};

export {postEditProfile};
