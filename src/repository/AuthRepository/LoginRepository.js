const postLogin = async (formdata) => {
    try {
      const response = await fetch(
          `https://www.zillionsbuyer.com/login/do_login`,
        {
          method: 'POST',
          headers: {'Content-Type':'multipart/form-data'},
           body:formdata
        },
      );
      const result = await response.json();
      console.log('postLogin api data....in LoginRepository', result);
        return result;
    } catch (err) {
      console.log('error in postLogin...in LoginRepository ', err);
    }
  };
  
  
  export {postLogin};
  