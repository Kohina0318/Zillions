const postLogin = async (pId) => {
    try {
      const response = await fetch(
          `https://www.zillionsbuyer.com/login/do_login?email=`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify({
            email: "kunalsahu00125@gmail.com" ,
            password: "123456"
          })
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
  