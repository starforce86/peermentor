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
var RescheduleConfirmationController = require('./RescheduleConfirmationController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../../common/styles/styles.js');
var styles=require('./styles.js');
const MK = require('react-native-material-kit');
const {
  MKRipple,
} = MK;

var _ = require("underscore");
var moment = require('moment');


var RescheduleConfirmationPage = React.createClass({
	controller: null,
	componentWillMount: function() {
	    // LayoutAnimation.spring();
  	},
	getInitialState: function() {
		RescheduleConfirmationController.setView(this);
		RescheduleConfirmationController.init();
		return {
			reschedule: RescheduleConfirmationController.reschedule,
			timeslots: RescheduleConfirmationController.view.props.timeslots,
			showContinue: false
		}
	},
	_renderTimeSlots: function() {
		// console.log(RescheduleConfirmationController.view.props.timeslots);

		_(RescheduleConfirmationController.view.props.timeslots).each( (timeSlot) => {
			return(
				<Text>{timeSlot.slot_starttime}</Text>
			);
		});
	},
	render: function() {
		var date_time_image, schedule_datetime_original;
		date_time_image = (
			<View style={styles.date_image}>
				<Text style={styles.month}>{RescheduleConfirmationController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "MMMM")}</Text>
				<Text style={styles.day}>{RescheduleConfirmationController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "D")}</Text>
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
							{RescheduleConfirmationController.momentFormat(RescheduleConfirmationController.reschedule.activeRequest.scheduled_date_time, "ddd, MMM D, YYYY")}
						</Text>
						<Text style={styles.value_text} key={"date_time_text"}>
							{RescheduleConfirmationController.momentFormat(RescheduleConfirmationController.reschedule.activeRequest.scheduled_date_time, " h:mma")+ ' ' + (RescheduleConfirmationController.reschedule.activeRequest.timezone ? RescheduleConfirmationController.reschedule.activeRequest.timezone : '')}
						</Text>
					</View>
				</View>
			</View>
		);

		var schedule_date_new, new_date_image;
		new_date_image = (
			<View style={[styles.date_image, {}]}>
				<Text style={[styles.month, styles.new_month]}>{RescheduleConfirmationController.momentFormat(RescheduleConfirmationController.view.props.selectedDate, "MMMM")}</Text>
				<Text style={[styles.day, styles.day_grey]}>{RescheduleConfirmationController.momentFormat(RescheduleConfirmationController.view.props.selectedDate, "D")}</Text>
			</View>
		);

		schedule_date_new = (
			<View style={styles.schedule_datetime}>
				<View style={styles.grey_bg}></View>
				{new_date_image}
				<View style={styles.datetime_text}>
					<Text style={styles.label}>proposed time </Text>
					<View style={styles.value_parent}> 
						<Text style={styles.value_bold} key={"date_time_bold"}>
							{RescheduleConfirmationController.momentFormat(RescheduleConfirmationController.view.props.selectedDate, "ddd, MMM D, YYYY")}
						</Text>
						<Text style={styles.value_text} key={"date_time_text"}>
							{' '+RescheduleConfirmationController.view.props.selectedTime + ' ' + (RescheduleConfirmationController.reschedule.activeRequest.timezone ? RescheduleConfirmationController.reschedule.activeRequest.timezone : '')}
						</Text>
					</View>
				</View>
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
				    {schedule_date_new}
					<View style={{marginTop: 40, marginLeft: 15, marginRight: 15, borderBottomColor: 'gray', borderBottomWidth: 1, width: vw * 100}}>
				      	<TextInput style={{height: 24, fontSize: 12}} 
				      		onChangeText={(text) => RescheduleConfirmationController.setNote(text)} 
				      		placeholder="ADD A MESSAGE"
				      		value={this.state.text} />
				    </View>
			    </ScrollView>
			    <View style={globalStyles.bottom_fixed}>
			    	<TouchableOpacity style={globalStyles.primary_button}
						onPress={()=>RescheduleConfirmationController.rescheduleCall()}>
						<Image source={require('../../../../assets/images/check.png')} style={globalStyles.check_img}>
				        </Image>
					</TouchableOpacity>  
			    </View>
		    </View>
    	);

	}
});


module.exports = RescheduleConfirmationPage;