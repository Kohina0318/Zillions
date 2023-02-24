const getManageAddress = async () => {
    try {
      const response = await fetch(
          `https://www.zillionsbuyer.com/profiles/manage_address`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
        },
      );
      const result = await response.json();
        return result;
    } catch (err) {
      console.log('error in getManageAddress...in MangeAddress ', err);
    }
  };

  export {getManageAddress};
  