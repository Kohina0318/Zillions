import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getManageAddress = async () => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/profiles/manage_address`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `${await getAppToken()}`
        },
      },
    );
    const result = await response.json();

    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');

      ToastAndroid.showWithGravityAndOffset(
        `${'Token Expired'}`,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        10,
        10,
      )
      navigateToClearStack('Dashboard');
      return result;
    } else {
      return result;
    }

  } catch (err) {
    console.log('error in getManageAddress...in MangeAddressRepo ', err);
  }
};

const postDefaultAddress = async () => {
  var body = new FormData()
  body.append("type", "default")

  try {
    const response = await fetch(
      `${await SERVER_URL()}/profiles/manage_address`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${await getAppToken()}`
        },
        body: body
      },
    );
    const result = await response.json();
   
    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');

      ToastAndroid.showWithGravityAndOffset(
        `${'Token Expired'}`,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        10,
        10,
      )
      navigateToClearStack('Dashboard');
      return result;
    } else {
      return result;
    }

  } catch (err) {
    console.log('error in postDefaultAddress...in MangeAddressRepo ', err);
  }
};

const postAddAddress = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/save-address`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${await getAppToken()}`
        },
        body: formdata,
      },
    );
    const result = await response.json();

    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');

      ToastAndroid.showWithGravityAndOffset(
        `${'Token Expired'}`,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        10,
        10,
      )
      navigateToClearStack('Dashboard');
      return result;
    } else {
      return result;
    }

  } catch (err) {
    console.log('error in postAddAddress...in MangeAddressRepo ', err);
  }
};

const postDeleteAddress = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/delete-address`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${await getAppToken()}`
        },
        body: formdata,
      },
    );
    const result = await response.json();
    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');

      ToastAndroid.showWithGravityAndOffset(
        `${'Token Expired'}`,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        10,
        10,
      )
      navigateToClearStack('Dashboard');
      return result;
    } else {
      return result;
    }

  } catch (err) {
    console.log('error in postDeleteAddress...in MangeAddressRepo ', err);
  }
};

const postSetDefaultAddress = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/set-default-address`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${await getAppToken()}`
        },
        body: formdata,
      },
    );
    const result = await response.json();

    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');

      ToastAndroid.showWithGravityAndOffset(
        `${'Token Expired'}`,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        10,
        10,
      )
      navigateToClearStack('Dashboard');
      return result;
    } else {
      return result;
    }

  } catch (err) {
    console.log('error in postSetDefaultAddress...in MangeAddressRepo ', err);
  }
};


export { getManageAddress, postAddAddress, postDeleteAddress, postSetDefaultAddress, postDefaultAddress };
