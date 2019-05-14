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
var RescheduleAnotherDateController = require('./RescheduleAnotherDateController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../../common/styles/styles.js');
var styles=require('./styles.js');
const MK = require('react-native-material-kit');
const {
  MKRipple,
} = MK;

var Calendar = require('react-native-calendar');
var moment = require('moment');

var customDayHeadings = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

var RescheduleAnotherDatePage = React.createClass({
	controller: null,
	selectedDate: null,
	componentWillMount: function() {
	    // LayoutAnimation.spring();
  	},
	getInitialState: function() {
		RescheduleAnotherDateController.setView(this);
		RescheduleAnotherDateController.init();
		return {
			selectedDate: moment().format(),
			reschedule: RescheduleAnotherDateController.reschedule,
			showContinue: true
		}
	},

	render: function() {
		var date_time_image;
		date_time_image = (
			<View style={styles.date_image}>
				<Text style={styles.month}>{RescheduleAnotherDateController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "MMMM")}</Text>
				<Text style={styles.day}>{RescheduleAnotherDateController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "D")}</Text>
			</View>
		);

		var schedule_datetime_original;
		schedule_datetime_original = (
			<View style={styles.schedule_datetime}>
				<View style={styles.grey_bg}></View>
				{date_time_image}
				<View style={styles.datetime_text}>
					<Text style={styles.label}>original time </Text>
					<View style={styles.value_parent}> 
						<Text style={styles.value_bold} key={"date_time_bold"}>
							{RescheduleAnotherDateController.momentFormat(RescheduleAnotherDateController.reschedule.activeRequest.scheduled_date_time, "ddd, MMM D, YYYY")}
						</Text>
						<Text style={styles.value_text} key={"date_time_text"}>
							{RescheduleAnotherDateController.momentFormat(RescheduleAnotherDateController.reschedule.activeRequest.scheduled_date_time, " h:mma")+ ' ' + (RescheduleAnotherDateController.reschedule.activeRequest.timezone ? RescheduleAnotherDateController.reschedule.activeRequest.timezone : '')}
						</Text>
					</View>
				</View>
			</View>
		);

		var widget_body;
		var direction_text = (
			<View style={styles.direct_view}>
				<Text style={styles.direct_text}> Select a date first... </Text>
			</View>
		);

		var showContinueButton = (this.state.showContinue == true) ? {opacity: 1, height: 60} : { height: 0, opacity: 0 };
		return (
		    <ScrollView style={[styles.container, globalStyles.container]}>
		      	{schedule_datetime_original}
				<View style={styles.widget_body}>
					{direction_text}
				</View>
				<View style={styles.bg_bleed}>
			        <Calendar
			          ref="calendar"
			          scrollEnabled={true}
			          showControls={true}
			          dayHeadings={customDayHeadings}
			          titleFormat={'MMMM YYYY'}
			          onDateSelect={(date) => {RescheduleAnotherDateController.setSelectedDate(date)}} />

			        <View style={showContinueButton}> 
				        <TouchableOpacity style={globalStyles.primary_button}
							onPress={()=>RescheduleAnotherDateController.timeSelectionView()}>
							<Image source={require('../../../../assets/images/check.png')} style={globalStyles.check_img}>
					        </Image>
						</TouchableOpacity>  
					</View>
				</View>
		    </ScrollView>
    	);

	}
});


module.exports = RescheduleAnotherDatePage;