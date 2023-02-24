const getWishlist = async () => {
  try {
    const response = await fetch(`https://www.zillionsbuyer.com/wishlist`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getwishlist...in WishListRepo ', err);
  }
};

export {getWishlist};
