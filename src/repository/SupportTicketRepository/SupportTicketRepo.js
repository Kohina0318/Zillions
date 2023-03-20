import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const postCreateSupportTicket = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/add-ticket`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data',
        Authorization: `${await getAppToken()}`},
        body: formdata,
      },
    );
    const result = await response.json();
    
    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');

      ToastAndroid.showWithGravityAndOffset(
        `${'Token Expired'}`,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        10,
        10,
      )
      navigateToClearStack('Dashboard');
      return result;
    } else {
      return result;
    }

  } catch (err) {
    console.log('error in postCreateSupportTicket...in SupportTicketRepository ', err);
  }
};

const getSupportTicket = async () => {
  try {
    const response = await fetch(
        `${await SERVER_URL()}/get-ticket`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`},
      },
    );
    const result = await response.json();
    
    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');

      ToastAndroid.showWithGravityAndOffset(
        `${'Token Expired'}`,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        10,
        10,
      )
      navigateToClearStack('Dashboard');
      return result;
    } else {
      return result;
    }

  } catch (err) {
    console.log('error in getSupportTicket...in MangeAddressRepo ', err);
  }
};


export {postCreateSupportTicket,getSupportTicket};
