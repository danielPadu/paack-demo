/* eslint-disable no-console */
import NetInfo from '@react-native-community/netinfo';
import {Dimensions, PixelRatio, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
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

const hasNotch = DeviceInfo?.hasNotch();
const isIOS = Platform.OS === 'ios';
const screenWidth = Dimensions.get('window').width;
const screenHeight =
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
const aspectRatio = heightPercentageToDP('100%') / widthPercentageToDP('100%');

const NetworkUtils = () =>
  NetInfo?.fetch?.()
    ?.then(response => response)
    ?.catch(err => err);
export {
  screenWidth,
  screenHeight,
  hasNotch,
  isIOS,
  NetworkUtils,
  log,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  aspectRatio as a,
};
