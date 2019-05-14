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
	schedule_datetime: {
		flexDirection: 'row',
	}, 
		date_image: {
			marginLeft: 15,
  			width: 64,
  			left: 0,
  			borderBottomColor:'#979797',
  			borderBottomWidth: 1,
		},
		down_arrow_holder: {
			width: 64,
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 15,
			marginBottom: 15,
			marginLeft: 15
		},
			month: {
				backgroundColor: '#F5A623',
    			color: '#FFF',
    			fontSize: 11,
    			shadowColor: 'rgba(255, 255, 255, 0.1)',
				shadowOpacity: 0.1,
				shadowRadius: 2,
    			height: 25,
    			paddingTop: 5,
    			borderBottomColor: '#C9810D',
    			textAlign: 'center',
    			justifyContent: 'center',
    		},

    		new_month: {
    			backgroundColor: '#E74C3C',
    			borderBottomColor: '#3E9A3E',
    		},

    		completed: {
    			backgroundColor: '#5CB85C',
    			borderBottomColor: '#3E9A3E',
    		},

			day: {
				fontSize: 24,
    			backgroundColor: '#ffffff',
    			color: 'rgba(74, 74, 74, 0.5)',
    			lineHeight: 35,
    			height: 40,
    			textAlign: 'center',
			},
			day_grey: {
				backgroundColor: '#EBEDEE'
			},
		grey_bg: {
			height: 55,
			width: vw * 100,
			backgroundColor: '#EFEFEF',
			position: 'absolute',
			left: 0,
		},		
		datetime_text: {
			paddingTop: 10,
			paddingLeft: 10,
			flex: 1,
		},
		bg_bleed: {
			backgroundColor: '#EFEFEF',
			height: vh * 100,
			width: vw * 100
		},
		selected_slot: {
			backgroundColor: '#417505'
		},
			label: {
				color: '#9B9B9B'
			},

			value_parent: {
				flexDirection: 'row',
			},
				value_bold: {
					color: '#4A4A4A',
    				fontSize: 15,
				},

				value_text: {
					color: '#4A4A4A',
    				fontSize: 14,
				},

	widget_body: {
		paddingTop: 15,
    	paddingLeft: 20,
	},
		direct_view: {
    		paddingRight: 20,
    		paddingBottom: 14,
    		marginBottom: 6,
		},
			direct_text: {
				fontSize: 15,
	    		color: '#4A4A4A',
			},

	time_slot_container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: 15,
	},		
	time_slot_holder: {
		backgroundColor: '#4A4A4A',
	    borderRadius: 13,
	    height: 30,
	    width: 60,
	    margin: 5,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	time_slot: {
	    fontSize: 11,
	    padding: 3,
	    textAlign: 'center',
	    color: '#ffffff',
	}			 	

});

module.exports = styles;