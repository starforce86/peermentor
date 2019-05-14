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
	// alignItems: 'center',
},

	main_background: {
		position: 'absolute',
		left: 0, top: 0,
	},
		img_main_back: {
			flex: 1,
			// resizeMode: 'contain',
			width: vw * 100,
			height: vh * 100
		},

 	top_area: {
 		width: vw * 100,
 		height: vh * 22.5,	
 		// alignItems: 'flex-start',	
 		backgroundColor: 'transparent',
 	},

 		img_top_logo: {
 			marginTop: vh * 22.5 * 0.3,
 			marginLeft: vw * 3,
 			height: vh * 22.5 * 0.8,
 			width: vw * 35,
 			backgroundColor: 'transparent',
 			resizeMode: 'contain',
 		},

 	sep_area: {
 		width: vw * 100,
 		height: vh * 42,		
 		backgroundColor: 'transparent',
 	},

 	inst_area: {
 		width: vw * 100,
 		height: vh * 27.8,
 		backgroundColor: 'transparent',
 		alignItems: 'center',
 		marginTop: -50
 	},

 		lbl_strong:	{
 			textAlign: 'center',
 			fontSize: 20,
 			fontWeight: "800",
 			color: '#ffffff',

 		},
 		lbl_sub: {
 			textAlign: 'center',
 			fontStyle: 'italic',
 			fontSize: 13,
 			fontWeight: "500",
 			color: '#ffffff',
 		},

 		lbl_detailed_colored: {
 			textAlign: 'center',
 			fontSize: 13,
 			fontWeight: "500",
 			color: '##FF8162',
 			paddingLeft: vw * 5,
 			paddingRight: vw * 5,
 			paddingTop: vh * 27.8 * 0.07,
 		},
	 		lbl_detailed: {
	 			textAlign: 'center',
	 			fontSize: 13,
	 			fontWeight: "500",
	 			color: '#ffffff',
	 		},

 		inst_gap: {
 			marginTop: vh * 27.8 * 0.05,	
 		},

 		btn_howitworks: {
 			width: vw * 40,
 			height: 35,
 			// borderRadius: 10
 			backgroundColor: '#4A4A4A',
 			alignItems: 'center',
 			justifyContent: 'center',
 		},
	 		lbl_howitworks: {
	 			backgroundColor: 'transparent',
	 			color: 'white',
	 			fontWeight: 'bold',
	 		},

 	bottom_area: {
 		width: vw * 100,
 		height: vh * 7.7,
 		backgroundColor: 'transparent',	
 		position: 'absolute',
 		bottom: 0
 	},
 		btn_login: {
 			flex: 1,
 			backgroundColor: '#00C2E5',
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