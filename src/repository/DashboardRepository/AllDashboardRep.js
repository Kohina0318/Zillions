import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getBrands = async (body) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/brands`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body:body,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getBrands...in AllDashboardRep ', err);
  }
};

const getMainSlider = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/main-slider`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getMainSlider...in AllDashboardRep ', err);
  }
};

const getProductList = async (spec, limit) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/product-list?speciality=${spec}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `${await getAppToken()}`
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getProductList...in AllDashboardRep ', err);
  }
};

export { getProductList, getBrands, getMainSlider };
