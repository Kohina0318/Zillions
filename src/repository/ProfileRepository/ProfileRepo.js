const getProfileInfo = async () => {
    try {
      const response = await fetch(
          `https://www.zillionsbuyer.com/profiles/info`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
        },
      );
      const result = await response.json();
      console.log('getProfileInfo api data....in ProfileRepo', result);
        return result;
    } catch (err) {
      console.log('error in getProfileInfo...in WishListRepo ', err);
    }
  };

const getProfileManageAddress = async () => {
    try {
      const response = await fetch(
          `https://www.zillionsbuyer.com/profiles/manage_address`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
        },
      );
      const result = await response.json();
      console.log('getProfileManageAddress api data....in ProfileRepo', result);
        return result;
    } catch (err) {
      console.log('error in getProfileManageAddress...in WishListRepo ', err);
    }
  };
  
  
  export {getProfileInfo,getProfileManageAddress};
  