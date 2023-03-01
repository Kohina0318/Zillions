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
  
export const Ribbon=()=>{
    
    return (
      <Svg height="70" width="70">
        <Polygon points="0 0, 0 10, 10 10" fill='red' strokeWidth="0" />
        <Polygon points="0 0, 70 70, 70 40, 30 0" fill='red' strokeWidth="0" />
        <Polygon points="60 60, 60 70, 70 70" fill='red' strokeWidth="0" />
        <G rotation="45" origin="130, -20">
          <Text x="100" y="80" stroke="#600" fill="#600" textAnchor="middle">
           Featured
          </Text>
        </G>
      </Svg>
    );
  }