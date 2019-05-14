/**
 * PeerMentor React Native App
 * https://github.com/facebook/react-native
 * written by Alexandru Petrescu
 */

'use strict';

var React = require('react-native');
var {AppRegistry, Navigator} = React;
import peermentor from './src/app.js';

AppRegistry.registerComponent('peermentor', () => peermentor);
