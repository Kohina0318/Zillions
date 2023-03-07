import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getWishlist = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/wishlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`
      },
    });
    const result = await response.json();
    return result;
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
