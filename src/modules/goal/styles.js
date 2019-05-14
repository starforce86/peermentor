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
		backgroundColor: '#E6E6E6'
	},
	main_bg: {
		backgroundColor: '#00C2E5',
		paddingBottom: 20
	},
	key_behavior_bg: {
		backgroundColor: '#009bb7',
		padding: 15
	},
	info_holder: {
		width: vw * 100, flexDirection: 'row', alignItems: 'center'
	},
	label: {
		color: '#fff', 
		opacity: 0.7, 
		fontSize: 12,
		lineHeight: 20
	},
	desc: {
		color: '#fff', fontSize: 13, lineHeight: 15
	},
	active_goal_holder: {
		width: vw * 90, flex: 1
	},
	active_goal_details: {
		color: '#fff', fontSize: 15, lineHeight: 21
	},
	goal_list_holder: {
		flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', margin: 10, shadowColor: '#000', shadowOffset: {width: 0, height:1}, shadowRadius: 1
	},
	details_holder: {
		flex:1, flexDirection: 'column', paddingLeft: 10, padding: 15
	},
	history_detail: {
		fontSize: 15, color: '#9B9B9B'
	},
	history_complete_date: {
		fontSize: 10, opacity: 0.7, lineHeight: 16
	},
	button_selected: {
		borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#3C3C3C'
	},
	text: {
		color: '#272727', fontSize: 14, opacity: 0.5
	},
	text_selected: {
		color: '#3C3C3C',
		opacity: 1
	},
	tab_holder: {
		alignItems: 'center', flexDirection: 'column', backgroundColor: '#fff'
	},
	tab_button_holder: {
		width: vw * 100, marginTop: 20, flexDirection: 'row'
	},
	tab1: {
		marginLeft: 10, paddingBottom: 10
	},
	tab2: {
		marginLeft: 20, paddingBottom: 10
	},
	update_now_holder: {
		marginTop: -20, width: 150, height: 35, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF8162'
	},
	update_now_text: {
		color: '#ffffff', textAlign: 'center', fontSize: 12, lineHeight: 14
	},
	green_check_holder: {
		width: vw * 10, justifyContent: 'flex-end', alignItems: 'center'
	}
});

module.exports = styles;