import React, {useState, useLayoutEffect, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import {isIOS, NetworkUtils} from '../UI/utils';
import * as Progress from 'react-native-progress';
import {useNetInfo} from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';
import useLocation from '../hooks/useLocation';
import {Button} from 'react-native-ui-lib';
import {LocationCard} from '../UI/components/LocationCard';
import type {IntroScreenProps} from './types';
const IntroScreen = ({navigation}: IntroScreenProps) => {
  const netInfo = useNetInfo();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [checkingPermissions, setCheckingPermissions] = useState(false);
  const {location, getLocation} = useLocation();
  useLayoutEffect(() => {
    if (isFocused) {
      console.log('netInfo: ', netInfo);
      NetworkUtils().then((res: any) => {
        //console.log(res)
        if (res.isInternetReachable === false) {
          return Alert.alert(
            'Connectivity error on ' + netInfo.type,
            'Your device can not acces Paack server. Check network connection and try again',
            [{text: 'Ok', onPress: () => {}}],
          );
        }
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [isFocused, netInfo]);
  useEffect(() => {
    if (location?.longitude && location.latitude) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('DeliveriesScreen');
      }, 3000);
    }
  }, [location, navigation]);
  const onCheckPermissionsPress = () => {
    setCheckingPermissions(true);
    getLocation().then(() => {
      setCheckingPermissions(false);
      navigation.navigate('DeliveriesScreen');
    });
  };
  const checkPermissionsLoadingIndicator = useCallback(() => {
    const {checkPermissionsButtonLoadingStyle} = styles;
    return checkingPermissions ? (
      <ActivityIndicator
        style={checkPermissionsButtonLoadingStyle}
        size="small"
        color="#0000ff"
      />
    ) : null;
  }, [checkingPermissions]);

  const {
    wrapperStyle,
    containerStyle,
    buttonsContainer,
    loadingIndicatorContainer,
  } = styles;

  return (
    <SafeAreaView style={wrapperStyle}>
      <View style={containerStyle}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}>
          <View style={buttonsContainer}>
            <Button
              label="Go to deliveries"
              disabled={checkingPermissions}
              onPress={onCheckPermissionsPress}
              iconOnRight
              iconSource={checkPermissionsLoadingIndicator}
              bg-primaryColor
              square
            />
          </View>
          <LocationCard />
        </ScrollView>
      </View>
      {loading && !checkingPermissions && (
        <View style={loadingIndicatorContainer}>
          <Progress.Circle
            size={90}
            indeterminate={true}
            borderWidth={10}
            borderColor={'blue'}
            // endAngle={0.7}
            thickness={5}
            strokeCap={'round'}
            fill={'transparent'}
          />
        </View>
      )}
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
  loadingIndicatorContainer: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    opacity: 0.8,
  },
});
export default IntroScreen;
