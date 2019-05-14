/**
 * Created by Alex on 12/8/15.
 */
 'use strict';

var React = require('react-native');
var {
		StyleSheet,
} = React;
var {bp, vw, vh} = require('react-native-relative-units')(100);
var Platform = require('../../common/platform');

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		marginTop: (Platform.platform == 'Android') ? 0 : 20,
	},
	header: {
		borderColor: '#313131',
	    backgroundColor: '#4a4a4a',
	    width: vw * 100,
	    height: vh * 6,
	    alignItems: 'center',
	    justifyContent: 'center'
	},
	header_text: {
		fontSize: 17,
		color: '#fff'
	},
	margin_top_m: {
		marginTop: 20,
	},
	margin_top_s: {
		marginTop: 10,
	},
	padding_left: {
		marginLeft: 15,
		color: '#000'
	},
	text_left: {
		textAlign: 'left',
	},
	list_holder: {
		flexDirection: 'row', 
		padding: 5, 
		alignItems: 'center',
	},
	icon_small: {
		resizeMode: 'contain',
		width: 16,
		height: 16,
		justifyContent: 'center'
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
 			height: vh * 0.8,
 			width: vw,
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
 		backgroundColor: 'transparent',
 		padding: 10,
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