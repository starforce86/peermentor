/**
 * Created by Alex on 12/8/15.
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
	},
	update_now_holder: {
		marginTop: -20, width: 150, height: 35, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF8162'
	},
	update_now_text: {
		color: '#ffffff', textAlign: 'center', fontSize: 12, lineHeight: 14
	},
	button_container: {
		alignItems: 'center', flexDirection: 'column'
	},
});

module.exports = styles;