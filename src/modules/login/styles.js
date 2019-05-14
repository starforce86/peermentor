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
		height: vh * 50,
		backgroundColor: 'transparent',
	},
		img_main_back: {
			flex: 1,
			width: vw * 100,
			height: vh * 50,
			// resizeMode: 'contain',
		},

 	top_area: {
 		width: vw * 100,
 		height: vh * 40,
 		backgroundColor: 'transparent',
 	},
 		img_top_logo: {
 			marginTop: vh * 22.5 * 0.5,
 			marginLeft: vw * 10,
 			height: vh * 22.5 * 0.5,
 			width: vw * 20,
 			backgroundColor: 'rgba(100,100,100,0.7)',
 			borderRadius: 10,
 			resizeMode: 'contain',
 		},

 	login_area: {
 		width: vw * 100,
 		height: vh * 60,
 		backgroundColor: 'black',	
 		flexDirection: 'row',
 	},
 		left_sep: {
 			width: vw * 10,
 			backgroundColor: 'black',	
 		},

 		login_form: {
 			width: vw * 90,
 			backgroundColor: "#F3F3F3",
 			padding: 20,
 			// transform: [{scaleX: this.state.scale}, {scaleY: this.state.scale}],
 		},
 			login_title: {
 				fontSize: 20,
 				fontWeight: 'bold',
 			},
 			login_email: {
 				height: 40,
 				marginTop: 40,
 			},	
 			login_password: {
 				height: 40,
 				marginTop: 20,
 			},
	 		btn_login: {
	 			backgroundColor: '#5CB85C',
	 			width: vw * 90 * 0.4,
	 			height: 45,
	 			bottom: 40,
	 			position: 'absolute',
	 			left: 0,
	 			alignItems: 'center',
	 			justifyContent: 'center',
	 		},
		 		lbl_login: {
		 			fontSize: 18,
		 			fontWeight: 'bold',
		 			color: 'white',
		 		},
});

module.exports = styles;