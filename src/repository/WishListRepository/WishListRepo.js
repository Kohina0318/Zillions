import { SERVER_URL } from "../SERVER_URL";

const getWishlist = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/wishlist`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getwishlist...in WishListRepo ', err);
  }
};

export {getWishlist};
