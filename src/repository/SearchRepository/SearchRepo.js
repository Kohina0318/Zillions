import { SERVER_URL } from "../SERVER_URL";

const getSearchProducts = async (body) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/search-products/click/0`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body:body,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getSearchProducts...in SearchRepo ', err);
  }
};


export {getSearchProducts};
