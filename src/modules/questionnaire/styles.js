/**
 * Created by Nikee on 1/13/15.
 */
 'use strict';

var React = require('react-native');
var {
		StyleSheet,
} = React;
var {bp, vw, vh} = require('react-native-relative-units')(100);

var styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh * 100,
		width: vw * 100
	},
});

module.exports = styles;