
const getCategories = async ( ) => {
  try {
    const response = await fetch(
      "https://www.zillionsbuyer.com/categories",
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
      },
    );
    const result = await response.json();
    console.log('getCategories api data....in AllproductCategoryRep', result);
      return result;
  } catch (err) {
    console.log('error in getCategoriesapi...in AllproductCategoryRep ', err);
  }
};

const getSubCategories = async ( cId) => {
  try {
    const response = await fetch(
        `https://www.zillionsbuyer.com/sub-categories/${cId}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
      },
    );
    const result = await response.json();
    console.log('getSubCategories api data....in AllproductCategoryRep', result);
      return result;
  } catch (err) {
    console.log('error in getSubCategories api...in AllproductCategoryRep ', err);
  }
};
const getSubCategoryByProduct = async (sId) => {
  try {
    const response = await fetch(
        `https://www.zillionsbuyer.com/product-list?speciality=sub_category&id=${sId}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
      },
    );
    const result = await response.json();
    console.log('getSubCategoryByProduct api data....in AllproductCategoryRep', result);
      return result;
  } catch (err) {
    console.log('error in getSubCategoryByProduct...in AllproductCategoryRep ', err);
  }
};
const getProductView = async (pId) => {
  try {
    const response = await fetch(
        `https://www.zillionsbuyer.com/product-view/${pId}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
      },
    );
    const result = await response.json();
    console.log('getProductView api data....in AllproductCategoryRep', result);
      return result;
  } catch (err) {
    console.log('error in getProductView...in AllproductCategoryRep ', err);
  }
};


export {getCategories,getSubCategoryByProduct,getSubCategories,getProductView};
