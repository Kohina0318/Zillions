import { SERVER_URL } from "../SERVER_URL";

const postRegistration = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/registration/add_info`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formdata,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postRegistration...in RegistrationRepository ', err);
  }
};

export {postRegistration};
