/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var {
		StyleSheet,
		View,
		ScrollView,
		Image,
		Text,
		TextInput,
		LayoutAnimation,
		TouchableOpacity
} = React;
var Actions = require('react-native-router-flux').Actions;

var { Icon, } = require('react-native-icons');
var RescheduleController = require('./RescheduleController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../common/styles/styles.js');
var styles=require('./styles.js');


var ReschedulePage = React.createClass({
	componentWillMount: function() {
  	},
	getInitialState: function() {
		RescheduleController.setView(this);
		RescheduleController.retrievingData();
		return {
			reschedule: RescheduleController.reschedule,
			mentee: RescheduleController.mentee
		}
	},

	render: function() {
		var dateTimeView = {};
		if (this.state.reschedule.activeRequest.status == 0 && this.state.reschedule.archivedRequest == null) {
			dateTimeView.status = (<Text style={styles.label}>proposed time </Text>);
		} 
		if (this.state.reschedule.activeRequest.status == 1) {
			dateTimeView.status = (<Text style={styles.label}>scheduled time </Text>);
		} 

		
		var tagView;
		if (this.state.reschedule.archivedRequest.status && this.state.reschedule.archivedRequest.status.Int64 == -2) {
			tagView = (
				<View style={styles.tags}>
					<Text style={styles.tag}> 
						{RescheduleController.dateDifference(this.state.reschedule.activeRequest.scheduled_date_time)}
					</Text>
				</View>
			)
		}

		var date_time_image_proposed, date_time_image;

		date_time_image_proposed = (
			<View style={[styles.date_image]}>
				<Text style={[styles.month, styles.month_proposed]}>{RescheduleController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "MMMM")}</Text>
				<Text style={styles.day}>{RescheduleController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "D")}</Text>
			</View>
		);

		date_time_image = (
			<View style={[styles.date_image]}>
				<Text style={[styles.month]}>{RescheduleController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "MMMM")}</Text>
				<Text style={styles.day}>{RescheduleController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "D")}</Text>
			</View>
		);

		if (this.state.reschedule.activeRequest.status == 1 && this.state.reschedule.archivedRequest.status && this.state.reschedule.archivedRequest.status.Int64 == -2) {
			dateTimeView.secondary_text = 
				(<Text style={styles.secondary_text}>
					{'(accepted on ' + RescheduleController.momentFormat(this.state.reschedule.activeRequest.last_updt_dt, "MM/DD/YY") + ' at ' + RescheduleController.momentFormat(this.state.reschedule.activeRequest.last_updt_dt, "h:mma")}
				 </Text>);
		}
		if (this.state.reschedule.archivedRequest.status && this.state.reschedule.archivedRequest.status.Int64 == -1) {
			dateTimeView.secondary_text = 
				(<Text style={styles.secondary_text}>
					{'Date & time were selected by you on ' + RescheduleController.momentFormat(this.state.reschedule.activeRequest.last_updt_dt, "dddd, MM/DD/YY") + 
					' at ' + RescheduleController.momentFormat(this.state.reschedule.activeRequest.last_updt_dt, "h:mma")}
				 </Text>);
		}

		var datetime_textView;
	
		if (this.state.reschedule.activeRequest.status == 0) {
			dateTimeView.status = (<Text style={styles.label}>proposed time </Text>);
		} 
		if (this.state.reschedule.activeRequest.status == 1) {
			dateTimeView.status = (<Text style={styles.label}>scheduled time </Text>);
		}
		datetime_textView = (
			<View style={[styles.datetime_text, {}]}>
				{dateTimeView.status}
				<View style={styles.value_parent}> 
					<Text style={styles.value_bold}>
						{RescheduleController.momentFormat(RescheduleController.reschedule.activeRequest.scheduled_date_time, "ddd, MMM D, YYYY")}
					</Text>
					<Text style={styles.value_text}>
						{RescheduleController.momentFormat(RescheduleController.reschedule.activeRequest.scheduled_date_time, " h:mma")+ ' ' + (RescheduleController.reschedule.activeRequest.timezone ? RescheduleController.reschedule.activeRequest.timezone : '')}
					</Text>
				</View>
				{dateTimeView.secondary_text}
				{tagView}
			</View>
		);	

		var schedule_times_childs;
		schedule_times_childs = (
			<View style={styles.schedule_datetime}>
				{date_time_image_proposed}
				{datetime_textView}
			</View>
		);

		var schedule_datetime_original, arrows;
		if (this.state.reschedule.archivedRequest.status && this.state.reschedule.archivedRequest.status.Int64 == -2) {
			schedule_datetime_original = (
				<View style={styles.schedule_datetime}>
					{date_time_image}
					<View style={[styles.datetime_text, {}]}>
						<Text style={styles.label}>original time </Text>
						<View style={styles.value_parent}> 
							<Text style={styles.value_bold}>
								{RescheduleController.momentFormat(RescheduleController.reschedule.activeRequest.scheduled_date_time, "ddd, MMM D, YYYY")}
							</Text>
							<Text style={styles.value_text}>
								{RescheduleController.momentFormat(RescheduleController.reschedule.activeRequest.scheduled_date_time, " h:mma")+ ' ' + (RescheduleController.reschedule.activeRequest.timezone ? RescheduleController.reschedule.activeRequest.timezone : '')}
							</Text>
						</View>
					</View>
				</View>
			);

			arrows = (
				<View style={styles.schedule_arrow}>
					<Image  source={require('../../../assets/images/icons/arrow_down.png')}
                			style={styles.arrowIcon}>
        			</Image>

        			<Image  source={require('../../../assets/images/icons/arrow_down.png')}
                			style={styles.arrowIcon}>
        			</Image>
					
				</View>
			);
		}
	

		var bottomButtonsAccept;
		if (this.state.reschedule.activeRequest.status == 0) {
			bottomButtonsAccept = (
				<TouchableOpacity style={[globalStyles.primary_button, globalStyles.bottom_fixed]}
					onPress={()=>RescheduleController.onAccept_Click()}>
					<Image source={require('../../../assets/images/check.png')} style={globalStyles.check_img}>
					        </Image>
				</TouchableOpacity> 
			);
		} 

		// 
		var requestMsgView;
		var messageText;
		if (this.state.reschedule.archivedRequest.note && this.state.reschedule.archivedRequest.note.Valid && this.state.reschedule.archivedRequest.note.String != "") {
			messageText = (
				<View style={styles.message}>
					<View style={styles.round_image}>
						<Text style={styles.round_text}> {this.state.mentee.profile.mentor_first_name.String[0] + this.state.mentee.profile.mentor_last_name.String[0]} </Text>
					</View>
					<Text style={styles.message_text}> {this.state.reschedule.archivedRequest.note.String}</Text>
				</View>
			);
		}
		if (this.state.reschedule.archivedRequest.status && this.state.reschedule.archivedRequest.status.Int64 == -2) {
			requestMsgView = (
				<View style={styles.request_msg}>
					<View style={styles.note}>
						<Text style={[styles.clickable_text, styles.full_width]}>{this.state.mentee.profile.mentor_first_name.String + " " + this.state.mentee.profile.mentor_last_name.String} has requested rescheduling of your 1-to-1 call.</Text>
					</View>	
					{messageText}
				</View>
			);
		}

		var requestView;
		
		if (this.state.reschedule.activeRequest.scheduled_date_time) {
			requestView = (
				<View style={styles.full_block}>
					{requestMsgView}
					<View style={styles.schedule_times}>
						{schedule_datetime_original}
						{arrows}
						{schedule_times_childs}
					</View>
				</View>
			);
		} else {
			requestView = (
				<View style={styles.full_block}>
					<Text style={styles.no_schedule}>
						No call has been scheduled at this time.
					</Text>
				</View>
			);
		}

		return (
			<View style={[styles.container, globalStyles.container]}>
				<ScrollView>
					{requestView}	
			    </ScrollView>
			    {bottomButtonsAccept}
			</View>    
		);

	}
});


module.exports = ReschedulePage;