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
	content_holder: {
		width: vw * 100
	},
	title: {
		fontSize: 26,
    	marginBottom: 0,
    	paddingBottom: 5
	},
	sub_header: {
		fontSize: 16,
    	marginBottom: 8,
	},
	body_text: {
		fontSize: 18,
    	lineHeight: 22,
	},
	webView: { 
		height: vh * 40,
		width: vw * 100,
	},
	question_holder: {
		backgroundColor: '#E6E6E6'
	},
	questionnaire_label: {
		padding: 10,
	    fontSize: 24,
	    fontWeight: '700',
	    lineHeight: 29,
	    backgroundColor: '#5CB85C',
	    color: '#fff',
	    marginLeft: 10
	},
	btn_submit: {
		marginLeft: 10,
		marginBottom: 10,
		backgroundColor: '#5CB85C',
		width: vw * 90 * 0.4,
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
	},
	lbl_submit: {
		fontSize: 14,
		fontWeight: 'bold',
		color: 'white',
	},
	
});

module.exports = styles;