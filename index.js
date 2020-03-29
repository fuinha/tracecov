/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import BeaconBroadcast from 'react-native-ibeacon-simulator'



BeaconBroadcast.checkTransmissionSupported()
.then(() => {
  BeaconBroadcast.stopAdvertisingBeacon()
  BeaconBroadcast.startAdvertisingBeaconWithString("a090f133-b3a4-4cda-a3a0-25509e3b2423", "lobby ", 0, 65535)
})
.catch((e) => {
  /* handle return errors */
  // - NOT_SUPPORTED_MIN_SDK
  // - NOT_SUPPORTED_BLE
  // - DEPRECATED_NOT_SUPPORTED_MULTIPLE_ADVERTISEMENTS
  // - NOT_SUPPORTED_CANNOT_GET_ADVERTISER
  // - NOT_SUPPORTED_CANNOT_GET_ADVERTISER_MULTIPLE_ADVERTISEMENTS
})

AppRegistry.registerComponent(appName, () => App);
import {startProximityObserver, stopProximityObserver} from './proximityObserver';
// if you want the Proximity Observer constantly running, even if the user swipes the app away, start it here:
startProximityObserver();
// see also: https://github.com/Estimote/react-native-proximity#already-observing