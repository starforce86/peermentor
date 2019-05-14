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
		backgroundColor: '#fff',
	},
	header: {
		flexDirection:'row',
		borderColor: '#313131',
	    backgroundColor: '#4a4a4a',
	    width: vw * 100,
	    height: vh * 6,
	},
	header_text: {
		fontSize: 17,
		color: '#fff',
		textAlign:'center',
		flex: 1
	},
	header_button:{
        width: 50,
    },
	filter_label: {position: 'absolute', right: 5, color: '#fff', top: vh*1.5},
	full_width: {
		width: vw * 100,
	},
	date_holder: {
		width: vw * 10,
	},
	text: {
		width: vw * 10,
		textAlign: 'left'
	},
	conversations_holder: {
		// flex:1, 
		flexWrap: 'wrap',
		paddingLeft: 5,
		paddingBottom: vh * 1,
		// height: vh * 100,
		// width: vw * 100,
	},
	messageRow: {
		overflow: 'hidden'
	},
	right: {
		flex:1, 
		flexDirection: 'column', 
		alignItems: 'flex-end',	
	},
	left: {
		flex:1, 
		flexDirection: 'column', 
		alignItems: 'flex-start',
	},
	avatar: {
		flex: 1,
		borderRadius: vh * 3,
	    // overflow: 'hidden',
	    width: vw * 11,
	    height: vh * 6,
	    backgroundColor: '#4A4A4A',
	    alignItems: 'center',
	    justifyContent: 'center'
	},
	message_textfield_holder: {
		flex:1, 
		flexDirection: 'row',
		height: vh * 8,
		width: vw * 99,
		left: 3,
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#ededed',
		alignItems: 'center',
	},
	message_textfield: {
		width: vw * 81,
		height: vh * 7,
		backgroundColor: '#fff',
		fontSize: 14,
	},
	btn_send: {
		backgroundColor: '#5CB85C',
		height: vh * 7,
		width: vw * 19,
		alignItems: 'center',
		justifyContent: 'center',
	},
	lbl_send: {
		fontSize: 14,
		color: 'white',
	},
});

module.exports = styles;