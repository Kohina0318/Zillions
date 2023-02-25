import { SERVER_URL } from "../SERVER_URL";

const getCategories = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/categories`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getCategoriesapi...in AllproductCategoryRep ', err);
  }
};

const getSubCategories = async cId => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/sub-categories/${cId}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
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
const getSubCategoryByProduct = async sId => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/product-list?speciality=sub_category&id=${sId}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(
      'error in getSubCategoryByProduct...in AllproductCategoryRep ',
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
        headers: {'Content-Type': 'application/json;charset=utf-8'},
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getProductView...in AllproductCategoryRep ', err);
  }
};

const getProductRealedProducts = async (spec, limit, pId) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/product-list?speciality=${spec}&limit=${limit}&id=${pId}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
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

export {
  getCategories,
  getSubCategoryByProduct,
  getSubCategories,
  getProductView,
  getProductRealedProducts,
};
