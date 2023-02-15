import React,{useState,useEffect} from 'react'
import {View,Text,Image,Dimensions} from 'react-native'
import { Colors } from '../config/Colors';
import { FontFamily } from '../config/FontFamily';
import moment from 'moment';
import { Avatar } from '@rneui/themed';

const { width, height } = Dimensions.get('screen');
export const Header = () => {
  const [time,setTime]=useState(moment().format("hh:mm:ss"))
  const [date,setDate]=useState(moment().format("LL"))
  const [d,setd]=useState(moment().format("HH"))
  useEffect(() => {
      setInterval(() =>{ setTime(moment().format("hh:mm:ss")),  setd(moment().format("HH"))}, 1000);
    
    }, []);
  return (

<View style={{height:height*0.5,width:width,marginTop:10,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
<View style={{height:height*0.3,width:width,marginTop:10,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
<View>
  <Avatar
    size={150}
    rounded
    source={require('../config/images/admin.jpeg')}
  />
  </View>
  <View>
  <Text style={{color:Colors.white,marginTop:15,alignItems:'center',fontSize:24,fontWeight:600,fontFamily:FontFamily.Serif}}>Harry Singh</Text> 
  </View>
  <View>
  <Text style={{color:Colors.white,alignItems:'center',fontSize:18,fontWeight:300,fontFamily:FontFamily.Serif}}>0904CS1234</Text> 
  </View>
  </View>
  <View style={{height:height*0.2,width:width,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
<View>
<Text style={{color:Colors.white,alignItems:'center',fontSize:24,fontWeight:600,fontFamily:FontFamily.Serif}}>{date}</Text>
  </View>
  <View>
  { d>'11'?
  <Text style={{color:Colors.white,alignItems:'center',marginTop:10,fontSize:32,fontWeight:'bold',fontFamily:FontFamily.Serif}}>{time} PM</Text> 
  :
  <Text style={{color:Colors.white,alignItems:'center',marginTop:10,fontSize:32,fontWeight:'bold',fontFamily:FontFamily.Serif}}>{time} AM</Text> 
  }
  </View>
  </View>
            </View>

  )
}
