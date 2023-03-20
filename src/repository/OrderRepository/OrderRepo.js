import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getOrderlist = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/orderlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`
      },
    });
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
    console.log('error in getOrderlist...in OrderRepo ', err);
  }
};

const getOrderView = async (orId) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/order-view/${orId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`
      },
    });
    
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
    console.log('error in getOrderView...in OrderRepo ', err);
  }
}


export { getOrderlist, getOrderView };
