import React from 'react';
import {StatusBar, View, StyleSheet, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './appStore/store';
import AppContainer from './navigation/stackNavigator';
import LoadingModal from './UI/components/modals/LoadingModal';

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
