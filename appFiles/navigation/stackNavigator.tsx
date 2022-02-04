import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {IntroScreen, DeliveriesScreen, DeliveryDetailsScreen} from '../screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef, isReadyRef} from './RootNavigation';
//import MembershipActiveScreen from '../screens/components/MembershipActiveScreen';
import {useDispatch} from 'react-redux';
import {setAppActiveScreen} from '../appStore/actions/appActions';
export type RootStackParamList = {
  IntroScreen: undefined;
  DeliveriesScreen: undefined;
  DeliveryDetailsScreen: {deliveryId: string};
};
const Stack = createStackNavigator();
const defaultOptions = {
  animationEnabled: false,
  swipeEnabled: false,
};
const STACK_PROPS = (props: {
  initialRouteName: string;
  children: React.ReactNode | React.ReactNode[];
}) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      title: '',
      headerStyle: {height: 30},
    }}
    initialRouteName={
      props.initialRouteName ? props.initialRouteName : undefined
    }>
    {props.children}
  </Stack.Navigator>
);

// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state?.routes[state?.index];
  if (route?.state) {
    // Dive into nested navigators
    return getActiveRouteName(route?.state);
  }
  return route;
};

const AppContainer = () => {
  const previousActiveRouteRef = React.useRef();
  const activeRouteRef = React.useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    //  const { removeOnNotificationOpened, removeOnNotification, removeOnTokenRefresh } = onlySetTheListners(); // set listners for FCM and detach them when app closes
    const state = navigationRef.current?.getRootState();
    activeRouteRef.current = getActiveRouteName(state); // Save the initial route name
    return () => {
      console.log('AppContainer unmounted');
      if (isReadyRef?.current) {
        (isReadyRef.current as React.MutableRefObject<boolean>).current = false;
      }
    };
  }, []);

  const theme = {
    //like this
    colors: {
      // background: "transparent",
      opacity: 0.75,
    },
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer
        // theme={theme}
        // initialState={initialState}
        ref={navigationRef}
        // removeClippedSubviews={false}
        onStateChange={state => {
          const previousActiveRoute = activeRouteRef.current;
          const currentRoute = getActiveRouteName(state);
          if (previousActiveRoute !== activeRouteRef) {
            // console.log('NavigationContainer previousActive: -> ', previousActiveRoute);
            console.log('NavigationContainer active: -> ', currentRoute);
            dispatch(setAppActiveScreen(currentRoute.name));
          }
          // Save the current route name for later comparision
          activeRouteRef.current = currentRoute;
          previousActiveRouteRef.current = previousActiveRoute;
        }}
        onReady={() => {
          if (isReadyRef?.current) {
            (isReadyRef?.current as React.MutableRefObject<boolean>).current =
              true;
          }
        }}>
        <STACK_PROPS initialRouteName="IntroScreen">
          <Stack.Screen
            name="IntroScreen"
            component={IntroScreen}
            options={() => ({
              backBehavior: 'order',
              ...defaultOptions,
            })}
            initialParams={{itemId: 'Intro'}}
          />
          <Stack.Screen
            name="DeliveriesScreen"
            component={DeliveriesScreen}
            options={() => ({
              backBehavior: 'order',
              ...defaultOptions,
            })}
            initialParams={{itemId: 'DeliveriesScreen'}}
          />
          <Stack.Screen
            name="DeliveryDetailsScreen"
            component={DeliveryDetailsScreen}
            options={() => ({
              backBehavior: 'order',
              ...defaultOptions,
            })}
            initialParams={{itemId: 'DeliveryDetailsScreen'}}
          />
        </STACK_PROPS>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContainer;
