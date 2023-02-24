const postforgotPassword = async (formdata) => {
    try {
      const response = await fetch(
          `https://www.zillionsbuyer.com/login/forget`,
        {
          method: 'POST',
          headers: {'Content-Type':'multipart/form-data'},
           body:formdata
        },
      );
      const result = await response.json();
      console.log('postforgotPassword api data....in ForgotRepository', result);
        return result;
    } catch (err) {
      console.log('error in postforgotPassword...in ForgotRepository ', err);
    }
  };
  
  
  export {postforgotPassword};
  