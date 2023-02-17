const getBrands = async () => {
    try {
      const response = await fetch(
          "https://www.zillionsbuyer.com/brands",
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
        },
      );
      const result = await response.json();
      console.log('getBrands api data....in AllDashboardRep', result);
        return result;
    } catch (err) {
      console.log('error in getBrands...in AllDashboardRep ', err);
    }
  };

const getMainSlider = async () => {
    try {
      const response = await fetch(
          "https://www.zillionsbuyer.com/main-slider",
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
        },
      );
      const result = await response.json();
      console.log('getMainSlider api data....in AllDashboardRep', result);
        return result;
    } catch (err) {
      console.log('error in getMainSlider...in AllDashboardRep ', err);
    }
  };

const getProductList = async (spec) => {
    try {
      const response = await fetch(
          `https://www.zillionsbuyer.com/product-list?speciality=${spec}`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
        },
      );
      const result = await response.json();
      console.log('getCategoryByProduct api data....in AllDashboardRep', result);
        return result;
    } catch (err) {
      console.log('error in getCategoryByProduct...in AllDashboardRep ', err);
    }
  };
  
  
  export {getProductList, getBrands,getMainSlider};
  