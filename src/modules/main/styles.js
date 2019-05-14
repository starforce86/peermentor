/**
 * Created by Alex on 12/8/15.
 */
 'use strict';

var React = require('react-native');
var {
		StyleSheet,
		PixelRatio
} = React;
var {bp, vw, vh} = require('react-native-relative-units')(100);

var styles = StyleSheet.create({
	navBar: {
	    // backgroundColor: 'black',
	    // borderColor: '#313131',
	    backgroundColor: '#fff',
	    // color: '#fff',
	},

	navBarTitle: {
	    color: '#000', 
	    textAlign: 'center',
	    fontSize: 17,
	    // if android
	    // marginTop: 17 + 1 / PixelRatio.get(),
	},

	navBarTitle_Android: {
	    color: '#000', 
	    textAlign: 'center',
	    fontSize: 17,
	    // if android
	    marginTop: 17 + 1 / PixelRatio.get(),
	},

	navBarText: {
	    color: 'white'
	},

	leftSideMenuIcon: {
	    marginTop: 15, 
	    marginLeft: 16, 
	    width: vw * 5, 
	    height: vw * 5,
	    resizeMode: 'stretch',
	},

	leftSideMenuIcon_Android: {
	    marginTop: 19, 
	    marginLeft: 16, 
	    width: vw * 5, 
	    height: vw * 5,
	    resizeMode: 'stretch',
	},

	leftArrowIcon: {
		marginTop: 13,
	    marginLeft: 16, 
	    width: vw * 15, 
	    height: vw * 15,
	    resizeMode: 'stretch',
	},
});

module.exports = styles;