const getBrands = async () => {
  try {
    const response = await fetch('https://www.zillionsbuyer.com/brands', {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getBrands...in AllDashboardRep ', err);
  }
};

const getMainSlider = async () => {
  try {
    const response = await fetch('https://www.zillionsbuyer.com/main-slider', {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
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
      `https://www.zillionsbuyer.com/product-list?speciality=${spec}&limit=${limit}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getCategoryByProduct...in AllDashboardRep ', err);
  }
};

export {getProductList, getBrands, getMainSlider};
