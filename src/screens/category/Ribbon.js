import React from 'react';
import Svg, {
    SvgProps,
    Path,
    Polygon,
    G,
    Rect,
    Text,
    Line,
  } from 'react-native-svg';
import { Colors } from '../../assets/config/Colors';
  
  
export const Ribbon=()=>{
    
    return (
      <Svg height="70" width="70">
        <Polygon points="0 0, 0 10, 10 10" fill={Colors.green1} strokeWidth="0" />
        <Polygon points="0 0, 70 70, 70 40, 30 0" fill={Colors.green1} strokeWidth="0" />
        <Polygon points="60 60, 60 70, 70 70" fill={Colors.green1} strokeWidth="0" />
        <G rotation="45" origin="130, -20">
          <Text allowFontScaling={false} x="100" y="80" stroke='#FFF' strokeWidth={0.7} fill="#FFF" textAnchor="middle">
           Featured
          </Text>
        </G>
      </Svg>
    );
  }