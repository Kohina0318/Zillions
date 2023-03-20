import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";


  const getCartProductList = async () => {
    try {
      const response = await fetch(
        `${await SERVER_URL()}/cart-product/added_list/0/pp`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`},
      },
    ); 
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error in getCartProductList...in CartListRepo ', err);
    }
  };

  const getCartOrderDetails = async () => {
   
    try {
      const response = await fetch(
        `${await SERVER_URL()}/cart-product/calcs/full/pp`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`},
      },
    ); 
      const result = await response.json();
      
        return result;
    } catch (err) {
      console.log('error in getCartOrderDetails...in CartListRepo ', err);
    }
  };
  

  export {getCartProductList,getCartOrderDetails};
  