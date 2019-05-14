/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var {
		AppRegistry,
		StyleSheet,
		View,
		ScrollView,
		Image,
		Text,
		TextInput,
		LayoutAnimation,
		RecyclerViewBackedScrollView,
		TouchableOpacity
} = React;

var { Icon, } = require('react-native-icons');
var RescheduleAnotherTimeController = require('./RescheduleAnotherTimeController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../../common/styles/styles.js');
var styles=require('./styles.js');
const MK = require('react-native-material-kit');
const {
  MKRipple,
} = MK;

var _ = require("underscore");
var moment = require('moment');


var RescheduleAnotherTimePage = React.createClass({
	controller: null,
	componentWillMount: function() {
	    // LayoutAnimation.spring();
  	},
	getInitialState: function() {
		RescheduleAnotherTimeController.setView(this);
		RescheduleAnotherTimeController.init();
		return {
			reschedule: RescheduleAnotherTimeController.reschedule,
			timeslots: RescheduleAnotherTimeController.view.props.timeslots,
			showContinue: false
		}
	},
	_renderTimeSlots: function() {
		// console.log(RescheduleAnotherTimeController.view.props.timeslots);

		_(RescheduleAnotherTimeController.view.props.timeslots).each( (timeSlot) => {
			return(
				<Text>{timeSlot.slot_starttime}</Text>
			);
		});
	},
	render: function() {
		var date_time_image, schedule_datetime_original;
		date_time_image = (
			<View style={styles.date_image}>
				<Text style={styles.month}>{RescheduleAnotherTimeController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "MMMM")}</Text>
				<Text style={styles.day}>{RescheduleAnotherTimeController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "D")}</Text>
			</View>
		);

		schedule_datetime_original = (
			<View style={styles.schedule_datetime}>
				<View style={styles.grey_bg}></View>
				{date_time_image}
				<View style={styles.datetime_text}>
					<Text style={styles.label}>original time </Text>
					<View style={styles.value_parent}> 
						<Text style={styles.value_bold} key={"date_time_bold"}>
							{RescheduleAnotherTimeController.momentFormat(RescheduleAnotherTimeController.reschedule.activeRequest.scheduled_date_time, "ddd, MMM D, YYYY")}
						</Text>
						<Text style={styles.value_text} key={"date_time_text"}>
							{RescheduleAnotherTimeController.momentFormat(RescheduleAnotherTimeController.reschedule.activeRequest.scheduled_date_time, " h:mma")+ ' ' + (RescheduleAnotherTimeController.reschedule.activeRequest.timezone ? RescheduleAnotherTimeController.reschedule.activeRequest.timezone : '')}
						</Text>
					</View>
				</View>
			</View>
		);

		var schedule_date_new, new_date_image;
		new_date_image = (
			<View style={[styles.date_image, {}]}>
				<Text style={[styles.month, styles.new_month]}>{RescheduleAnotherTimeController.momentFormat(RescheduleAnotherTimeController.view.props.selectedDate, "MMMM")}</Text>
				<Text style={[styles.day, styles.day_grey]}>{RescheduleAnotherTimeController.momentFormat(RescheduleAnotherTimeController.view.props.selectedDate, "D")}</Text>
			</View>
		);

		schedule_date_new = (
			<View style={styles.schedule_datetime}>
				{new_date_image}
			</View>
		);

		var direction_text = (
			<View style={styles.direct_view}>
				<Text style={styles.direct_text}>Now tap to select a time that works, or tap the date to select another.</Text>
			</View>
		);

		var showContinueButton = (this.state.showContinue == true) ? {opacity: 1, height: 60} : { height: 0, opacity: 0 };
		return (
			<View style={[styles.container, globalStyles.container]}>
			    <ScrollView>
			      	{schedule_datetime_original}
			      	<View style={styles.down_arrow_holder}>
			      		<Image source={require('../../../../assets/images/down_arrows.png')} style={[globalStyles.check_img]}>
						</Image>
					</View>
					<View style={styles.bg_bleed}>
				      	{schedule_date_new}
				      	<View style={styles.widget_body}>
							{direction_text}
						</View>
						<View style={styles.time_slot_container}>
					    	{this.state.timeslots.map(function(slot, index){
					    		return(
					    			<TouchableOpacity key={index} onPress={() => RescheduleAnotherTimeController.toggleTimeslot(index, slot)} style={[styles.time_slot_holder, (slot.isSelected) ? styles.selected_slot : {}]}>
					    				<Text style={styles.time_slot} >{slot.slot_starttime}</Text>
					    			</TouchableOpacity>
					    		);	
					    	})}
				    	</View>
					</View>
			    </ScrollView>
			    <View style={[showContinueButton, {position: 'absolute', bottom: 0, width: vw * 100}]}> 
			        <TouchableOpacity style={globalStyles.primary_button}
						onPress={()=>RescheduleAnotherTimeController.confirmationView()}>
						<Image source={require('../../../../assets/images/check.png')} style={globalStyles.check_img}>
				        </Image>
					</TouchableOpacity>  
				</View>
			</View>
    	);

	}
});


module.exports = RescheduleAnotherTimePage;