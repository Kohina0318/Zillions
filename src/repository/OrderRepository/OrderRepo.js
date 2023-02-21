const getOrderlist = async () => {
    try {
      const response = await fetch(
          `https://www.zillionsbuyer.com/orderlist`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
        },
      );
      const result = await response.json();
      console.log('getOrderlist api data....in OrderRepo', result);
        return result;
    } catch (err) {
      console.log('error in getOrderlist...in OrderRepo ', err);
    }
  };
  
  
  export {getOrderlist};
  