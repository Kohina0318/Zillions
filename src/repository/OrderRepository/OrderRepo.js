import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getOrderlist = async (body) => {
  console.log(body)
  try {
    const response = await fetch(`${await SERVER_URL()}/orderlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${await getAppToken()}`
      },
      body:body,
    });
    const result = await response.json();
    return result;
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
    return result;
  } catch (err) {
    console.log('error in getOrderView...in OrderRepo ', err);
  }
}


export { getOrderlist, getOrderView };
