
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
const getCategoryByProduct = async (sId) => {
  try {
    const response = await fetch(
        `https://www.zillionsbuyer.com/categorie-by-product/${sId}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
      },
    );
    const result = await response.json();
    console.log('getCategoryByProduct api data....in AllproductCategoryRep', result);
      return result;
  } catch (err) {
    console.log('error in getCategoryByProduct...in AllproductCategoryRep ', err);
  }
};


export {getCategories,getCategoryByProduct,getSubCategories};
