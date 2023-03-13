import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

  const getCartProductQuantityUpdate = async (rowId,qty) => {
    
    try {
      const response = await fetch(
        `${await SERVER_URL()}/cart-product/quantity_update/${rowId}/${qty}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`},
      },
    ); 
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error in getCartProductQuantityUpdate...in CartQuantityUpdateRepo ', err);
    }
  };

  export {getCartProductQuantityUpdate,};
  