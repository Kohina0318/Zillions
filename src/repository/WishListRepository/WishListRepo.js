const getWishlist = async (pId) => {
    try {
      const response = await fetch(
          `https://www.zillionsbuyer.com/wishlist`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
        },
      );
      const result = await response.json();
      console.log('getwishlist api data....in WishListRepo', result);
        return result;
    } catch (err) {
      console.log('error in getwishlist...in WishListRepo ', err);
    }
  };
  
  
  export {getWishlist};
  