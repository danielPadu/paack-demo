import {useEffect, useState, useRef} from 'react';
import {Platform, AppState, PermissionsAndroid} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {
  setLastLocation,
  LocationPayloadType,
  setAllowGeolocation,
} from '../appStore/actions/appActions';
import {ResolveArrayThunks, useDispatch} from 'react-redux';

const useLocation = (currentPosition?: any) => {
  const [location, setLocation] = useState(currentPosition);
  const [permissionResult, setPermissionResult] = useState<String>();
  const dispatch = useDispatch();
  // TODO: AppState in the future should be generalized as the hook, then we can call anywhere
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // This listener handle only for iOS 15 as Apple made a change in iOS 15 which required the app to be in an active state before the app tracking prompt can be fired.
    // ref: https://github.com/zoontek/react-native-permissions/issues/648#issuecomment-928077147
    const subscription = AppState.addEventListener('change', nextAppState => {
      // This function is for both platforms
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        handleAppStateChange(nextAppState);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const handleAppStateChange = (nextState: string) => {
    if (nextState === 'active') {
      if (Platform.OS === 'ios') {
        // Only once app has become active
        // can we prompt app tracking permission (Apple iOS 15 requirement)
        checkPermissionIOS();
      }
    }
  };

  const checkPermissionIOS = async () => {
    const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    if (result === RESULTS.DENIED) {
      await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    }
  };

  const isPermissionGranted = async () => {
    if (Platform.OS === 'ios') {
      const hasIosPermission = await grantedPermissionIOS();
      return hasIosPermission;
    } else {
      const hasAndroidPermission = await grantedPermissionAndroid();
      return hasAndroidPermission;
    }
  };

  const grantedPermissionAndroid = async () => {
    if (Platform.Version < 23) {
      return true;
    }

    const hasPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (hasPermission === 'granted') {
      return true;
    }

    const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  };

  const grantedPermissionIOS = async () => {
    const hasPermission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (hasPermission === 'granted') {
      return true;
    }

    const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (status === 'granted') {
      return true;
    }
    return false;
  };
  type GetLocationType = () => Promise<'granted' | 'blocked'>;
  const getLocation: GetLocationType = () =>
    new Promise(async (resolve, reject) => {
      const hasPermission = await isPermissionGranted();

      if (!hasPermission) {
        setPermissionResult('blocked');
        dispatch(setAllowGeolocation(false));
        reject('blocked');
      }

      Geolocation.getCurrentPosition(
        (position: GeoPosition) => {
          setLocation(position.coords);
          dispatch(setLastLocation(position.coords as LocationPayloadType));
          dispatch(setAllowGeolocation(true));
          setPermissionResult('granted');
          resolve('granted');
        },
        () => {
          setPermissionResult('blocked');
          reject('blocked');
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
        },
      );
    });

  return {
    location,
    permissionResult,
    getLocation,
  };
};

export default useLocation;
