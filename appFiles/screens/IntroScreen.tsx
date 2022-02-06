import {useNetInfo} from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import {infoModalOpen} from '../appStore/actions/modalActions';
import useLocation from '../hooks/useLocation';
import {navigate} from '../navigation/RootNavigation';
import {LocationCard} from '../UI/components';
import {activityIndicator} from '../UI/components/buttonsActivityIndicator';
import {isIOS, log, NetworkUtils} from '../UI/utils';

const IntroScreen = () => {
  const netInfo = useNetInfo();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [checkingPermissions, setCheckingPermissions] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const {getLocation} = useLocation();
  useLayoutEffect(() => {
    if (isFocused) {
      NetworkUtils()?.then((res: any) => {
        log({'NetworkUtils: ': res});
        if (res.isInternetReachable === false) {
          dispatch(
            infoModalOpen({
              title: `Connectivity error ${
                netInfo.type !== 'none'
                  ? 'on ' + netInfo.type + ' connection'
                  : ''
              } `,
              description:
                'Your device can not acces Paack server. Check network connection and try again',
            }),
          );
        }
      });
    }
  }, [dispatch, isFocused, netInfo]);
  useEffect(() => {
    onCheckPermissionsPress();
  }, []);
  const onCheckPermissionsPress = () => {
    setCheckingPermissions(true);
    getLocation()
      .then(result => {
        if (result === 'granted') {
          navigate('DeliveriesScreen');
        }
      })
      .catch(result => {
        if (result === 'blocked') {
          dispatch(
            infoModalOpen({
              title: 'No permissions granted',
              description:
                'Your device did not granted accessing location. Please review Paack permissions in ',
            }),
          );
        }
      })
      .finally(() => setCheckingPermissions(false));
  };
  const {wrapperStyle, containerStyle, buttonsContainer} = styles;
  return (
    <SafeAreaView style={wrapperStyle}>
      <View style={containerStyle}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}>
          <View>
            <View style={buttonsContainer}>
              <Button
                label={`${showLocation ? 'Hide' : 'Show'} current location`}
                onPress={() => setShowLocation(c => !c)}
                bg-secondaryColor
                square
                marginH-10
              />
              <Button
                testID={'checkPermissionsButton'}
                label={
                  checkingPermissions ? 'Processing' : 'Navigate to deliveries'
                }
                disabled={checkingPermissions}
                onPress={onCheckPermissionsPress}
                iconOnRight
                iconSource={useCallback(
                  () => activityIndicator(checkingPermissions),
                  [checkingPermissions],
                )}
                bg-primaryColor
                square
              />
            </View>
            {showLocation && <LocationCard />}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    backgroundColor: 'white',
    color: 'black',
  },

  containerStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: isIOS ? 10 : 100,
  },

  buttonsContainer: {
    margin: 0,
    marginTop: 10,
    padding: 0,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkPermissionsButtonLoadingStyle: {marginLeft: 10},

  underlined: {
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  lightTextStyle: {color: 'darkgray', fontSize: 15},
});
export default IntroScreen;
