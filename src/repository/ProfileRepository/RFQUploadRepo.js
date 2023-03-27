import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";


const postRFQUploadRepo = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/rfq-upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${await getAppToken()}`
        },
        body: formdata,
      },
    );

    const result = await response.json();

    return result;

  } catch (err) {
    console.log('error in postRFQUpload...in RFQUploadRepo ', err);
  }
};

export {
  postRFQUploadRepo
};
