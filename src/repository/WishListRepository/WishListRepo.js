import { ToastAndroid } from 'react-native';
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";

const getWishlist = async (body) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${await getAppToken()}`
      },
      body:body,
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
    console.log('error in getwishlist...in WishListRepo ', err);
  }
};

const postAddOrRemoveWishlist = async (any, pId) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/wishlist-user/${any}/${pId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postAddOrRemoveWishlist...in WishListRepo ', err);
  }
};

export { getWishlist, postAddOrRemoveWishlist };
