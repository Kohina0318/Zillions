import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getCategories = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/categories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getCategoriesapi...in AllproductCategoryRep ', err);
  }
};

const getSubCategories = async (cId, body) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/sub-categories/${cId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: body,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(
      'error in getSubCategories api...in AllproductCategoryRep ',
      err,
    );
  }
};
const getByProduct = async (spec, Id, body) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/product-list?speciality=${spec}&id=${Id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${await getAppToken()}`
        },
        body: body,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(
      'error in getByProduct...in AllproductCategoryRep ',
      err,
    );
  }
};
const getProductView = async pId => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/product-view/${pId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `${await getAppToken()}`
        }
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getProductView...in AllproductCategoryRep ', err);
  }
};

const getProductRealedProducts = async (spec, limit, pId, body) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/product-list?speciality=${spec}&limit=${limit}&id=${pId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: body,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(
      'error in getProductRealedProducts...in AllProductCategoryRep ',
      err,
    );
  }
};

const postRequestACallBack = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/sent-call-back`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${await getAppToken()}`
        },
        body: formdata,
      },
    );

    const result = await response.json();
    return result;

  } catch (err) {
    console.log('error in postRequestACallBack...in AllProductCategoryRep ', err);
  }
};

const postRequestForNewCategory = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/new-category-request`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${await getAppToken()}`
        },
        body: formdata,
      },
    );

    const result = await response.json();
    return result;

  } catch (err) {
    console.log('error in postRequestForNewCategory...in AllProductCategoryRep ', err);
  }
};


export {
  getCategories,
  getByProduct,
  getSubCategories,
  getProductView,
  getProductRealedProducts,
  postRequestACallBack,
  postRequestForNewCategory
};
