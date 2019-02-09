/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import AppDemo from './AppDemo';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppDemo);
