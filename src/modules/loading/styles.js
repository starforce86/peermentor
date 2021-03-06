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
	alignItems: 'center',
},

	main_background: {
		position: 'absolute',
		left: 0, top: 0,
		width: vw * 100,
		height: vh * 100,
		backgroundColor: 'transparent',
	},
		img_main_back: {
			flex: 1,
			width: vw * 100,
			height: vh * 100,
			// resizeMode: 'contain',
		},
	main_area: {
		width: vw * 100,
 		height: vh * 100,	
 		// alignItems: 'flex-start',	
 		backgroundColor: 'white',
 		opacity: 1,
	},
		gif: {
	 		marginTop: vh * 45,
	 		width: vw * 80,
	 		marginLeft: vw * 10,
	 		height: 30,
 		}
 	
});

module.exports = styles;