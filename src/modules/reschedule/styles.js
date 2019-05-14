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
	// paddingTop: 44,
},
	schedule_times: {
		paddingTop: 15,
		marginLeft: 15,
	},
		schedule_datetime: {
			flexDirection: 'row',

		}, 
			date_image: {
	  			width: 65,
	  			height: 65,
	  			borderBottomColor:'#979797',
	  			borderBottomWidth: 1,
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
	    			flex:1
	    		},

	    		month_proposed: {
	    			backgroundColor: '#E74C3C',
	    			borderBottomColor: '#C0392B',
	    			borderBottomWidth: 1,
	    		},

	    		completed: {
	    			backgroundColor: '#5CB85C',
	    			borderBottomColor: '#3E9A3E',
	    		},

				day: {
					fontSize: 24,
	    			backgroundColor: '#EBEDEE',
	    			color: 'rgba(74, 74, 74, 0.5)',
	    			lineHeight: 35,
	    			height: 40,
	    			textAlign: 'center',

				},

			datetime_text: {
    			marginTop: 25,
    			marginLeft: 10,
    			flex: 1,
			},
			tags: {
				width: 80,
				borderColor: '#4A4A4A',
				borderRadius: 10,
				backgroundColor: '#4A4A4A',
			    borderWidth: 1,
			    padding: 3,
			    marginTop: 5
			},
			tag: {
			    color: '#FFF',
			    fontSize: 12,
			    textAlign: 'center'
			},
				label: {

				},

				value_parent: {
					flexDirection: 'row',
				},
					value_bold: {
						color: '#4A4A4A',
	    				fontSize: 15,
	    				fontWeight: 'bold',
					},

					value_text: {
						color: '#4A4A4A',
	    				fontSize: 14,
					},	
			secondary_text: {
			    fontSize: 13,
				color: '#858585',
			},

			hide: {
				opacity: 0,
			},

		schedule_arrow: {
			width: 64,
			paddingTop: 20,	
			paddingBottom: 15,
			alignItems: 'center',
		},
			arrowIcon: {
				width: 25,
				height: 13,
			},

	bottom_buttons: {
		flexDirection: 'row',
		paddingLeft: 20,
		paddingBottom: 10,
		paddingRight: 15,
	    marginTop: 20,
	    width: vw * 100,
	    backgroundColor: '#EFEFEF',
	},
		button_balanced: {
			width: vw * 100,
			backgroundColor: '#5CB85C',
			alignItems: 'center',
		},
			text_balanced: {
				fontWeight: '700',
				color: '#fff',
				textAlign: 'center',
				fontSize: 12,
				lineHeight: 16,
				height: 46,
				paddingLeft: 12,
				paddingRight: 12,
			},

		button_text: {
			minWidth: 100,
			backgroundColor: 'transparent',
			alignItems: 'center',
		},
			text_text: {
				color: '#000',
				textAlign: 'center',
				fontWeight: 'normal',
				fontSize: 12,
				lineHeight: 16,
				height: 46,
				paddingLeft: 12,
				paddingRight: 12,
			},

	request_msg: {
		
	},
		note: {
			backgroundColor: '#00C2E5',
			width: vw * 100,
			flexDirection: 'row',
			flexWrap: 'wrap'
		},
		full_width: {
			width: vw * 100,
			color: '#fff',
			padding: 15,
			fontSize: 13	
		},
			clickable_text: {
				color: '#00C2E5',
			},

		remain_text: {
			marginBottom: 10,
			paddingRight: 20,
			paddingLeft: 15,
		},

		message: {
			paddingTop: 15,
			paddingRight: 20,
			paddingBottom: 15,
    		backgroundColor: '#EFEFEF',
    		flexDirection: 'row',
		},
			round_image: {
    			// position: 'absolute',
    			// top: 6,
    			left: 10,
    			// marginLeft: 10
    			backgroundColor: 'grey',
    			borderRadius: 21,
    			borderWidth: 2,
    			borderColor: '#ffffff',
    			marginRight: 10,
    			width: 42,
    			alignItems: 'center',
    			height: 42,
			},
				round_text: {
					lineHeight: 24,
					fontSize: 19,
					// textAlign: 'center',
					color: '#fff',
					backgroundColor: 'transparent',
				},

			message_text: {
				paddingLeft: 10,
				fontSize: 13,
				color: '#4A4A4A',
			},


	full_block: {
		width: vw * 100,
	},
		no_schedule: {
			marginLeft: 10,
		}

});

module.exports = styles;