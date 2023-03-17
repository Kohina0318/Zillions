import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";


  const postAddCartProduct = async (pId,formdata) => {
    console.log("formdata...", formdata)
    try {
      const response = await fetch(
        `${await SERVER_URL()}/cart-product/add/${pId}/pp`,
        {
          method: 'POST',
          headers: {'Content-Type': 'multipart/form-data',
          Authorization: `${await getAppToken()}`},
          body: formdata,
        },
      );
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error in postAddCartProduct...in AddToCartRepo ', err);
    }
  };
  

  export {postAddCartProduct};
  