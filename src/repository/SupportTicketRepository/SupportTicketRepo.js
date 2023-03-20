import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const postCreateSupportTicket = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/add-ticket`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data',
        Authorization: `${await getAppToken()}`},
        body: formdata,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postCreateSupportTicket...in SupportTicketRepository ', err);
  }
};

const getSupportTicket = async (body) => {
  console.log(body)
  try {
    const response = await fetch(
        `${await SERVER_URL()}/get-ticket`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data',
        Authorization: `${await getAppToken()}`},
        body:body,
      },
    );
    const result = await response.json();
      return result;
  } catch (err) {
    console.log('error in getSupportTicket...in MangeAddressRepo ', err);
  }
};


export {postCreateSupportTicket,getSupportTicket};
