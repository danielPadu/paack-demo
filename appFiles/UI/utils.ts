import {useEffect, useState} from 'react';
import {Dimensions, PixelRatio, Platform, ScaledSize} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import util from 'util';
const log = (obj: unknown) =>
  console.log(
    util.inspect(obj, {
      showHidden: true,
      depth: null,
      colors: true,
      compact: false,
      getters: true,
    }),
  );

const hasNotch = DeviceInfo.hasNotch();
const isIOS = Platform.OS === 'ios';
let screenWidth = Dimensions.get('window').width;
let screenHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get(
        'REAL_WINDOW_HEIGHT',
      );
const widthPercentageToDP = (wp: number | string) => {
  // Parse string percentage input and convert it to number.
  const elemWidth = typeof wp === 'number' ? wp : parseFloat(wp);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that corresponds to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
const heightPercentageToDP = (hp: number | string) => {
  // Parse string percentage input and convert it to number.
  const elemHeight = typeof hp === 'number' ? hp : parseFloat(hp);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
let aspectRatio = heightPercentageToDP('100%') / widthPercentageToDP('100%');

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that Screen's class components this variable. The function needs it to
 *                      invoke setState method and trigger screen rerender (this.setState()).
 */
const ListenOrientationChangeHook = () => {
  const [orientation, setOrientation] = useState('portrait');

  const updateOrientation = (newDimensions: {
    window: ScaledSize;
    screen: ScaledSize;
  }) => {
    // Retrieve and save new dimensions
    screenWidth = newDimensions.window.width;
    screenHeight = newDimensions.window.height;

    // Trigger screen's rerender with a callback passed trough function of the orientation variable
    setOrientation(screenWidth < screenHeight ? 'portrait' : 'landscape');
  };
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      updateOrientation,
    );
    return () => subscription?.remove?.();
  }, []);

  return {orientation};
};

/**
 * Uppercasing first character of string
 * @param  {string} stringValue   
 */
const capitalizeString = (stringValue: string) => {
  if (typeof stringValue === 'string' && stringValue?.trim()?.length > 0) {
      return stringValue?.trim()?.charAt(0)?.toUpperCase() + stringValue?.trim()?.slice(1)
  }
  return stringValue;
}
const NetworkUtils = () => NetInfo.fetch().then(response => response);
export {
  screenWidth,
  screenHeight,
  hasNotch,
  isIOS,
  capitalizeString,
  NetworkUtils,
  log,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  aspectRatio as a,
  ListenOrientationChangeHook,
};
