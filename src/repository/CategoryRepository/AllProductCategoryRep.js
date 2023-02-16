
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


export {getCategories};
