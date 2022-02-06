import React from 'react';
import {StatusBar, View, StyleSheet, Platform} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './appStore/store';
import AppContainer from './navigation/stackNavigator';
import InfoModal from './UI/components/modals/InfoModal';
import LoadingModal from './UI/components/modals/LoadingModal';

Colors.loadColors({
  primaryColor: '#2364AA',
  secondaryColor: '#81C3D7',
  textColor: '#221D23',
  primaryBackdropColor: '#2364aa42',
  secondaryBackdropColor: '#81C3D742',
  errorColor: '#E63B2E',
  successColor: '#ADC76F',
  warnColor: '#FF963C',
});
const App = () => {
  const {container} = styles;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={container}>
          <StatusBar
            animated={true}
            backgroundColor={'black'}
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />
          <AppContainer />
        </View>
        <LoadingModal />
        <InfoModal />
      </PersistGate>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
});
export default App;
