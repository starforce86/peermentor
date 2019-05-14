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
	header_container: {backgroundColor: '#00C2E5', padding: 15},
	goal_header: {color: '#fff', fontSize: 20, fontWeight: '400'},
	kb_label: {color: '#fff', fontWeight: '100', paddingBottom: 10},
	body_container: {marginTop: 7, paddingTop: 10, paddingLeft: 15, paddingRight: 15},
	status_holder: {backgroundColor: '#f6f6f6', padding: 16},
	status_container: {flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', marginTop: 7, paddingTop: 5, paddingBottom: 5},
	status_button: {alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex:1, paddingTop:5, paddingBottom:5},
	status_text: {fontWeight: '100', width: 36, marginTop: 5, fontSize: 10, textAlign: 'center'},
	note_holder: {padding: 16, borderWidth: 1, borderColor: '#ddd'},
	text_area: {height: 60, padding:5, fontSize:12, borderColor: '#ddd', borderWidth: 1},
	btn_primary: { backgroundColor: '#5CB85C', width: 70, height: vw * 15, alignItems: 'center', justifyContent: 'center'},
	btn_primary_text: {fontWeight: '700', color:'#fff', textAlign: 'center', fontSize: 12},
	btn_secondary: { width: 70, height: vw * 15, alignItems: 'center', justifyContent: 'center'},
	btn_secondary_text: {textAlign: 'center', fontSize: 12}
});

module.exports = styles;