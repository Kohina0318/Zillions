import React, {useState} from 'react';
import {View, Text, Modal, Dimensions, TextInput} from 'react-native';
import {MyThemeClass} from '../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {FontSize} from '../../../assets/fonts/Fonts';
import {FontFamily} from '../../../assets/fonts/FontFamily';
import {Colors} from '../../../assets/config/Colors';
import {styles} from '../../../assets/css/AddressStyle';
import HalfSizeButton from '../button/halfSizeButton';

const {width} = Dimensions.get('window');

export default function AddAddressModel(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [modalCart, setModalCart] = useState(true);

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalCart}>
        <View
          style={{
            ...styles.model,
          }}>
          <View
            style={{
              ...styles.modelContainer,
              backgroundColor: themecolor.THEMECOLOR1,
            }}>
            <View style={{...styles.modelInner}}>
              <View style={{...styles.modelHeader}}>
                <Text
                  style={{
                    ...styles.modelHeading,
                    color: themecolor.TXTWHITE,
                  }}>
                  Add Address
                </Text>
              </View>

              <View style={{...styles.Mv5}} />

              <View
                style={{
                  ...styles.modelTextView,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                }}>
                <TextInput
                  placeholder={'Address*'}
                  placeholderTextColor={themecolor.TXTGREYS}
                  style={{
                    ...styles.modelTextInput,
                    color: themecolor.TXTWHITE,
                  }}
                  onChangeText={txt => props.setAddress(txt)}
                />
              </View>

              <View style={{...styles.Mv5}} />

              <View
                style={{
                  ...styles.modelTextView,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                }}>
                <TextInput
                  placeholder={'City*'}
                  placeholderTextColor={themecolor.TXTGREYS}
                  style={{
                    ...styles.modelTextInput,
                    color: themecolor.TXTWHITE,
                  }}
                  onChangeText={txt => props.setCity(txt)}
                />
              </View>

              <View style={{...styles.Mv5}} />

              <View
                style={{
                  ...styles.modelTextView,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                }}>
                <TextInput
                  placeholder={'Postal Code*'}
                  placeholderTextColor={themecolor.TXTGREYS}
                  style={{
                    ...styles.modelTextInput,
                    color: themecolor.TXTWHITE,
                  }}
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={txt => props.setPostalCode(txt)}
                />
              </View>

              <View style={{marginVertical: 5}} />

              <View
                style={{
                  ...styles.modelTextView,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                }}>
                <TextInput
                  placeholder={'State*'}
                  placeholderTextColor={themecolor.TXTGREYS}
                  style={{
                    ...styles.modelTextInput,
                    color: themecolor.TXTWHITE,
                  }}
                  onChangeText={txt => props.setState(txt)}
                />
              </View>

              <View style={{...styles.Mv5}} />

              <View
                style={{
                  ...styles.modelTextView,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                }}>
                <TextInput
                  placeholder={'Country*'}
                  placeholderTextColor={themecolor.TXTGREYS}
                  style={{
                    ...styles.modelTextInput,
                    color: themecolor.TXTWHITE,
                  }}
                  onChangeText={txt => props.setCountry(txt)}
                />
              </View>

              <View style={{...styles.Mv5}} />

              <View
                style={{
                  ...styles.modelTextView,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                }}>
                <TextInput
                  placeholder={'Mobile No.*'}
                  keyboardType="numeric"
                  maxLength={10}
                  placeholderTextColor={themecolor.TXTGREYS}
                  style={{
                    ...styles.modelTextInput,
                    color: themecolor.TXTWHITE,
                  }}
                  onChangeText={txt => props.setMobileNo(txt)}
                />
              </View>
            </View>

            <View style={{...styles.modelViewButton}}>
              <View style={{width: '48%'}}>
                <HalfSizeButton
                  title="Submit"
                  backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                  color={'#fff'}
                  borderColor={themecolor.BOXBORDERCOLOR1}
                  onPress={props.onPress}
                />
              </View>
              <View style={{marginHorizontal: 6}} />
              <View style={{width: '48%'}}>
                <HalfSizeButton
                  title="Cancel"
                  backgroundColor={'transparent'}
                  color={'gray'}
                  borderColor={'transparent'}
                  onPress={() => {
                    setModalCart(false);
                    props.setAddAddressModal(false);
                  }}
                />
              </View>
            </View>

            <View style={{marginVertical: 5}} />
          </View>
        </View>
      </Modal>
    </>
  );
}
