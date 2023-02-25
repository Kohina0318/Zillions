import { SERVER_URL } from "../SERVER_URL";

const getOrderlist = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/orderlist`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getOrderlist...in OrderRepo ', err);
  }
};

export {getOrderlist};
