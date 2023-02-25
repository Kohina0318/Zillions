import React,{useState} from 'react'
import {Tab, TabView} from '@rneui/themed';
import RenderHtml from 'react-native-render-html';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import { Dimensions,Text } from 'react-native';
import { useWindowDimensions } from 'react-native';

const {width, height} = Dimensions.get('screen');

export const TabData = (props) => {

  const [index, setIndex] = React.useState(0);

    const {widthDes} = useWindowDimensions().width;

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const tagsStyles={
        p:{
          // backgroundColor:'grey',
          color:themecolor.TXTWHITE
        },
      }
    
      
      const tagStyles={
        p:{
          // backgroundColor:'grey',
          color:themecolor.TXTWHITE,
          textAlign:'left',
          height:'auto'
        },
        ul:{
          color:themecolor.TXTWHITE,
          height:'auto'
          // textAlign:'left'
        },
        li:{
          color:themecolor.TXTWHITE,
          textAlign:'left',
          height:'auto'
        },
        span:{
          height:'auto'
        },
        body:{
          height:'auto'
        }
      }

  return (
    <>
    <Tab
    value={index}
    onChange={(e) => setIndex(e)}
    indicatorStyle={{
      backgroundColor:themecolor.BACKICON,
      height: 3,
    }}
    // style={{height:height*0.07}}
  >
    <Tab.Item
      title="Description"
      titleStyle={{ fontSize: 12,color:themecolor.BACKICON }}
    />
    <Tab.Item
      title="Shipping Info"
      titleStyle={{ fontSize: 12,color:themecolor.BACKICON }}
    />
    <Tab.Item
      title="Reviews"
      titleStyle={{ fontSize: 12,color:themecolor.BACKICON }}
    />
  </Tab>
  <TabView containerStyle={{width:width,justifyContent:'center'}} tabItemContainerStyle={{justifyContent:'center'}} value={index} onChange={setIndex} animationType="spring">
    <TabView.Item>
                  <RenderHtml
                    contentWidth={widthDes}
                    source={{html: props.description}}
                    enableExperimentalMarginCollapsing={true}
                    enableExperimentalBRCollapsing={true}
                    enableExperimentalGhostLinesPrevention={true}
                    defaultViewProps={{width:width*0.8}}
                    tagsStyles={tagStyles}
                  />
    </TabView.Item>
    <TabView.Item>
    <RenderHtml
                    contentWidth={widthDes}
                    source={{html:props.shipment}}
                    enableExperimentalMarginCollapsing={true}
                    enableExperimentalBRCollapsing={true}
                    enableExperimentalGhostLinesPrevention={true}
                    enableCSSInlineProcessing={false}
                    defaultViewProps={{width:width*0.9}}
                    tagsStyles={tagsStyles}
                    // ignoredStyles={{backgroundColor}}
                  />
    </TabView.Item>
    <TabView.Item>
      <Text h1>Cart</Text>
    </TabView.Item>
  </TabView>
  </>
  )
}
