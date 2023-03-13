import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";


  const getRemoveAllProducts = async () => {
    try {
      const response = await fetch(
        `${await SERVER_URL()}/cart-product/empty/0/pp`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`},
      },
    ); 
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error in getRemoveAllProducts...in RemoveProductRepo ', err);
    }
  };
  
  const getRemoveProduct = async (rowId) => {
    try {
      const response = await fetch(
        `${await SERVER_URL()}/cart-product/remove_one/${rowId}/pp`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`},
      },
    ); 
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error in getRemoveProduct...in RemoveProductRepo ', err);
    }
  };
  

  export {getRemoveAllProducts,getRemoveProduct};
  