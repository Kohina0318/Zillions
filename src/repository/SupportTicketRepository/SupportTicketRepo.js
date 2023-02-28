import { SERVER_URL } from "../SERVER_URL";

const postCreateSupportTicket = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formdata,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postCreateSupportTicket...in SupportTicketRepository ', err);
  }
};

const getSupportTicket = async () => {
  try {
    const response = await fetch(
        `${await SERVER_URL()}/get-ticket`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
      },
    );
    const result = await response.json();
      return result;
  } catch (err) {
    console.log('error in getSupportTicket...in MangeAddressRepo ', err);
  }
};


export {postCreateSupportTicket,getSupportTicket};
