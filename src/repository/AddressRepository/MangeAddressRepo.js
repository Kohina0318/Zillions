import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getManageAddress = async () => {
    try {
      const response = await fetch(
          `${await SERVER_URL()}/profiles/manage_address`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json;charset=utf-8',
          Authorization: `${await getAppToken()}`},
        },
      );
      const result = await response.json();
        return result;
    } catch (err) {
      console.log('error in getManageAddress...in MangeAddressRepo ', err);
    }
  };

  const postAddAddress = async formdata => {
    try {
      const response = await fetch(
        `${await SERVER_URL()}/save-address`,
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
      console.log('error in postAddAddress...in MangeAddressRepo ', err);
    }
  };
  
  const postDeleteAddress = async formdata => {
    try {
      const response = await fetch(
        `${await SERVER_URL()}/delete-address`,
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
      console.log('error in postDeleteAddress...in MangeAddressRepo ', err);
    }
  };
  
  const postSetDefaultAddress = async formdata => {
    try {
      const response = await fetch(
        `${await SERVER_URL()}/set-default-address`,
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
      console.log('error in postSetDefaultAddress...in MangeAddressRepo ', err);
    }
  };
  

  export {getManageAddress,postAddAddress,postDeleteAddress,postSetDefaultAddress};
  