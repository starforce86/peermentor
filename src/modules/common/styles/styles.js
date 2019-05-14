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
		marginTop: 64,
	},
	margin_xs: { margin: 5 },
	margin_s: {margin: 10 },
	margin_m: {margin: 15 },
	margin_l: {margin: 20 },
	margin_xl: {margin: 25 },
	margin_top_xs: {marginTop: 5 },
	margin_top_s: {marginTop: 10 },
	margin_top_m: {marginTop: 15 },
	margin_top_l: {marginTop: 20 },
	margin_top_xl: {marginTop: 25 },
	margin_bottom_xs: {marginBottom: 5 },
	margin_bottom_s: {marginBottom: 10 },
	margin_bottom_m: {marginBottom: 15 },
	margin_bottom_l: {marginBottom: 20 },
	margin_bottom_xl: {marginBottom: 25 },
	margin_left_xs: {marginLeft: 5 },
	margin_left_s: {marginLeft: 10 },
	margin_left_m: {marginLeft: 15 },
	margin_left_l: {marginLeft: 20 },
	margin_left_xl: {marginLeft: 25 },
	padding_xs: { padding: 5 },
	padding_s: {padding: 10 },
	padding_m: {padding: 15 },
	padding_l: {padding: 20 },
	padding_xl: {padding: 25 },
	padding_top_xs: {paddingTop: 5 },
	padding_top_s: {paddingTop: 10 },
	padding_top_m: {paddingTop: 15 },
	padding_top_l: {paddingTop: 20 },
	padding_top_xl: {paddingTop: 25 },
	padding_bottom_xs: {paddingBottom: 5 },
	padding_bottom_s: {paddingBottom: 10 },
	padding_bottom_m: {paddingBottom: 15 },
	padding_bottom_l: {paddingBottom: 20 },
	padding_bottom_xl: {paddingBottom: 25 },
	padding_left_xs: {paddingLeft: 5 },
	padding_left_s: {paddingLeft: 10 },
	padding_left_m: {paddingLeft: 15 },
	padding_left_l: {paddingLeft: 20 },
	padding_left_xl: {paddingLeft: 25 },
	padding_right_xs: {paddingRight: 5 },
	padding_right_s: {paddingRight: 10 },
	padding_right_m: {paddingRight: 15 },
	padding_right_l: {paddingRight: 20 },
	padding_right_xl: {paddingRight: 25 },

	grey_bg: { backgroundColor: '#EBEBEB' },
	dark_grey_bg: { backgroundColor: '#4a4a4a' },
	color_white: { color: '#fff' },
	icon_small: {
		resizeMode: 'contain',
		width: 16,
		height: 16,
		justifyContent: 'center'
	},
	icon_medium: {
		width: 30,
		height: 30,
	},
	rating_icon: {
		width: 36,
		height: 36,
	},
	bold: {
		fontWeight: '700'
	},
	primary_button: {
		minWidth: 100,
		height: 60,
		backgroundColor: '#22C064',
		alignItems: 'center',
		justifyContent: 'center'
	},
	check_img: {
		width: 16,
		height: 16,
		resizeMode: 'contain',
	},
	bottom_fixed: {
		position: 'absolute', 
		bottom: 0, 
		width: vw * 100
	}

});

module.exports = styles;