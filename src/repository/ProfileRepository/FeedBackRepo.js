import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";


const postFeedBack = async formdata => {
    try {
      const response = await fetch(
        `${await SERVER_URL()}/send-feedback`,
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
      console.log('error in postFeedBack...in FeedBackRepo ', err);
    }
  };

  export {
    postFeedBack
  };
  