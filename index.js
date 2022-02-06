/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './appFiles/App';
import {name as appName} from './app.json';

// LogBox is disabled for not interfear with automated tests
LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);
