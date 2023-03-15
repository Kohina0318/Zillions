

import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { SERVER_URL as ServerURL } from "../../repository/SERVER_URL";
import RazorpayCheckout from 'react-native-razorpay'
import Logo from '../../assets/images/logo.png'

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: "80%",
    paddingLeft: "",
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const PaymentGateway = (props) => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36D7B7");

  const options = {
    key: "rzp_test_cdnNWMaIkNop2J",
    amount: props.route.params.price * 100, //  = INR 1
    name: "Zillionbuyer.com",
    // description: 'some description',
    image:Logo,
    handler: function (response) {
      // handleRazorpay(response.razorpay_payment_id)
      // props.addnewrecord()
      alert(response.razorpay_payment_id);

    },
    prefill: props.route.params.userData,
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };
  const gotoRazorpay = () => {
    return (

      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

        <View style={{ fontSize: 30, fontWeight: 'bold', color: 'GrayText', padding: 20 }}>
          <Text>Redirecting to Razorpay pls wait........</Text></View>

        <View className="sweet-loading">

          {openPayModal()}
        </View>
      </View>
    )
  }

  const openPayModal = async () => {
    RazorpayCheckout.open(options);
    setLoading(!loading)

  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

  }, []);


  return (
    <>
      {gotoRazorpay()}
    </>
  );
};

export default PaymentGateway;