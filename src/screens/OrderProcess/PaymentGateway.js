import React, { Component, useEffect, useState } from "react";
// import { withStyles } from "@material-ui/core/styles";
import { SERVER_URL as ServerURL } from "../../repository/SERVER_URL";
import { View,Text } from "react-native";
import RazorpayCheckout from 'react-native-razorpay';
import Logo from '../../assets/images/logo.png'
import { useSelector } from "react-redux";

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

  var user=useSelector(state=>state.data)
  var userData=Object.values(user)
  
  var userDataRe= {
    name: `${userData.username} ${userData.surname}`,
    contact: userData.phone,
    email: userData.email,
  }

  console.log("userdata>>>>>",userData)

  const options = {
    key: "rzp_test_cdnNWMaIkNop2J",
    amount: props.route.params.price*100, //  = INR 1
    name: "ZillionBuyers.com",
    currency: 'INR',
    description: 'Pay Securely and Safely',
    image:Logo,     
    handler: function (response) {
      // handleRazorpay(response.razorpay_payment_id)
      // props.addnewrecord()
      alert(response.razorpay_payment_id);
      
    },
    prefill: userDataRe,
    notes: {
      address: "some address",
    },
    theme: {
      color: "#F37254",
      hide_topbar: false,
    },
  };

 const gotoRazorpay=()=>{
   return(
     
    <View style={{ display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

    <View style={{fontSize:30,fontWeight:'bold',color:'GrayText',padding:20}}>
    <Text>Redirecting to Razorpay pls wait........</Text></View>

    <View className="sweet-loading">

  {/* <SyncLoader color={color} loading={loading} css={override} size={25} /> */}
  {openPayModal()}
</View>
</View>
   )
 }

  const openPayModal =async () => {
    RazorpayCheckout.open(options);
    setLoading(!loading);
    RazorpayCheckout.close(props.navigation.navigate('Dashboard'));
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

  }, []);

//   const { classes } = props;

  return (
    <>
  
       {gotoRazorpay()}

    </>
  );
};

export default (PaymentGateway);