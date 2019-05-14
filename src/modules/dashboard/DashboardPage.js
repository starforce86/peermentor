/**
 * Created by Nikee on 1/7/16.
 */
var React = require('react-native');
var {
		StyleSheet,
		View,
		Image,
		Text,
		TextInput,
		LayoutAnimation,
		TouchableOpacity,
		TouchableHighlight,
		ListView,
		ScrollView
} = React;

var Actions = require('react-native-router-flux').Actions;

var DashboardController = require('./DashboardController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../common/styles/styles.js');
var styles=require('./styles.js');
var UserManager = require("../user/index");
var _ = require("underscore");
var LoadingModal = require('../../components/LoadingModal');

var DashboardPage = React.createClass({
	componentWillMount: function() {
		DashboardController.getData();
  	},

	getInitialState: function() {
		DashboardController.setViewController(this);
		return {
			dashboard: {
				data: {
					key_behavior: {},
					scheduled_date_time: {},
					goal_details: {},
					goal_created_at: {},
					minimodule_title: {},
					video_duration: {}
				},
				labels: {},
				unreadChatMessages: [{}],
				missed_calls_tx: 0
			},
			isModalOpen: false
		}
	},

	render: function() {
	
	    var keyBehaviorFocus;
	    if(this.state.dashboard.data.key_behavior.Valid) {
	    	keyBehaviorFocus = (
	    			<View style={styles.kb_holder}>
	    				<Text style={styles.kb_text_label_grey}>KEY BEHAVIOR FOCUS</Text>
	    				<Text style={styles.kb_title}>{this.state.dashboard.data.key_behavior.String || "None"}</Text>
	    			</View>
	    		);
	    } else {
	    	keyBehaviorFocus = (
    			<View style={styles.kb_holder}>
    				<Text style={styles.kb_text_label_grey}>KEY BEHAVIOR FOCUS</Text>
    				<Text style={styles.kb_title}>{this.state.dashboard.data.key_behavior.String || "None"}</Text>
    			</View>
    		);
	    }

	    var upcomingCall;
	    if(this.state.dashboard.data.scheduled_date_time.Valid) {
	    	upcomingCall = (
	    			<TouchableOpacity onPress={Actions.reschedule} style={styles.call_holder}>
	    				<Text style={styles.call_text_label_grey}>UPCOMING CALL</Text>
	    				<Text style={styles.call_day}>{DashboardController.momentFormatDate(this.state.dashboard.data.scheduled_date_time.String, 0, 'dddd, MMMM DD, YYYY', 'dddd')}</Text>
	    				<Text style={styles.call_date}>{DashboardController.momentFormatDate(this.state.dashboard.data.scheduled_date_time.String, 0, 'dddd, MMMM DD, YYYY', 'MMM DD, YYYY')}</Text>
	    				<Text style={styles.call_time}>{DashboardController.momentFormatDate(this.state.dashboard.data.scheduled_date_time.String, 1)}</Text>
	    			</TouchableOpacity>
	    		);
	    } else {
	    	upcomingCall = (
	    			<TouchableOpacity onPress={Actions.reschedule} style={styles.call_holder}>
	    				<Text style={styles.call_text_label_grey}>UPCOMING CALL</Text>
	    				<Text style={styles.call_day}>None scheduled</Text>
	    			</TouchableOpacity>
	    		);
	    }

	    var goal;
	    if(this.state.dashboard.data.goal_details.Valid) {
	    	goal = (
	    			<TouchableOpacity onPress={Actions.goal} style={styles.goal_holder}>
	    				<Text style={styles.goal_label}>ACTIVE GOAL</Text>
	    				<Text style={styles.goal_kb}>{this.state.dashboard.data.key_behavior.String}</Text>
	    				<Text style={styles.goal_details}>{this.state.dashboard.data.goal_details.String}</Text>
	    				<Text style={styles.goal_label}>Last Updated</Text>
	    				<Text style={styles.goal_label_regular}>{this.state.dashboard.data.goal_created_at.String}</Text>
	    				<View style={styles.divider}></View>
	    				<View style={[styles.row_layout, styles.center]}>
	    					<Text style={styles.goal_count}>{this.state.dashboard.data.working_goal_count}</Text>
	    					<Text style={styles.goal_count_label}>{this.state.dashboard.labels.workingGoals}</Text>
	    				</View>
	    				<View style={[styles.row_layout, styles.center]}>
	    					<Text style={styles.goal_count}>{this.state.dashboard.data.not_working_goal_count}</Text>
	    					<Text style={styles.goal_count_label}>{this.state.dashboard.labels.notWorkingGoals}</Text>
	    				</View>
	    			</TouchableOpacity>
	    		);
	    } else {
	    	goal = (
		    	<TouchableOpacity onPress={Actions.goal} style={styles.goal_holder}>
					<Text style={styles.goal_label}>ACTIVE GOAL</Text>
					<Text style={styles.goal_kb}>{this.state.dashboard.data.key_behavior.String || "No key behavor in focus"}</Text>
					<Text style={styles.goal_details}>{this.state.dashboard.data.goal_details.String}</Text>
					<Text style={styles.goal_label}>Last Updated</Text>
					<Text style={styles.goal_label_regular}>{this.state.dashboard.data.goal_created_at.String || "None"}</Text>
					<View style={styles.divider}></View>
					<View style={[styles.row_layout, styles.center]}>
						<Text style={styles.goal_count}>{this.state.dashboard.data.working_goal_count}</Text>
						<Text style={styles.goal_count_label}>{this.state.dashboard.labels.workingGoals}</Text>
					</View>
					<View style={[styles.row_layout, styles.center]}>
						<Text style={styles.goal_count}>{this.state.dashboard.data.not_working_goal_count}</Text>
						<Text style={styles.goal_count_label}>{this.state.dashboard.labels.notWorkingGoals}</Text>
					</View>
				</TouchableOpacity>
			);
	    }

	    var messages;
	    var messagesSize = _.size(this.state.dashboard.unreadChatMessages);
	    if(messagesSize == 1) {
	    	messages = (
	    			<TouchableOpacity onPress={DashboardController.navigateToMessages} style={styles.messages_holder}>
	    				<Text style={styles.message_text}>{this.state.dashboard.unreadChatMessages[0].message}</Text>
	    				<View style={styles.avatar}><Text style={styles.message_initial}>{this.state.dashboard.unreadChatMessages[0].user_initial}</Text></View>
	    				<View style={styles.divider}></View>
	    				<Text style={styles.message_label}>LAST MESSAGE</Text>
	    				<Text style={styles.message_created_at}>{DashboardController.dateFormat(this.state.dashboard.unreadChatMessages[0].created_at, 'MMMM DD, YYYY - h:mm A', 'MMM DD, YYYY h:mma')}</Text>
	    			</TouchableOpacity>
	    		);
	    } else if(messagesSize > 1) {
	    	messages = (
	    		<TouchableOpacity onPress={DashboardController.navigateToMessages} style={styles.messages_holder}>
					<Text style={styles.message_count}>{_.size(this.state.dashboard.unreadChatMessages)}</Text>
					<Text style={styles.message_text}>New Messages</Text>
					<View style={styles.avatar}><Text style={styles.message_initial}>{this.state.dashboard.unreadChatMessages[messagesSize-1].user_initial}</Text></View>
					<View style={styles.divider}></View>
					<Text style={styles.message_label}>LAST MESSAGE</Text>
					<Text style={styles.message_created_at}>{DashboardController.dateFormat(this.state.dashboard.unreadChatMessages[messagesSize-1].created_at, 'MMMM DD, YYYY - h:mm A', 'MMM DD, YYYY h:mma')}</Text>
				</TouchableOpacity>
			);
	    } else {
	    	messages = (
	    			<TouchableOpacity onPress={DashboardController.navigateToMessages} style={styles.messages_holder}>
	    				<Text style={styles.message_text}>No new message</Text>
	    			</TouchableOpacity>
	    		);
	    }

	    var minimodule;
	    if(this.state.dashboard.data.minimodule_title.Valid) {
	    	minimodule = (
	    			<TouchableOpacity onPress={()=>Actions.minimodule({minimoduleId: this.state.dashboard.data.mentoring_program_base_minimodule_xref_id.Int64})} style={styles.minimodule_holder}>
	    				<Text style={styles.minimodule_label}>MINI-MODULE</Text>
	    				<Text style={styles.minimodule_title}>{this.state.dashboard.data.minimodule_title.String}</Text>
	    				<View style={[styles.row_layout, styles.center]}>
	    					<Image source={require('../../../assets/images/icons/minimodule_white.png')} style={[globalStyles.icon_medium, globalStyles.margin_top_s]}></Image>
	    					<Text style={styles.minimodule_video_duration}>{this.state.dashboard.data.video_duration.String}</Text>
	    				</View>
	    			</TouchableOpacity>
	    		);
	    } else {
	    	minimodule = (
	    			<TouchableOpacity onPress={Actions.conversation_minimodules_list} style={styles.minimodule_holder}>
	    				<Text style={styles.minimodule_label}>MINI-MODULE</Text>
	    				<Text style={styles.minimodule_title}>No active mini-module available at the moment</Text>
	    			</TouchableOpacity>
	    		);
	    }

	    var checkInQuestions, checkInQuestionsAlert;
	    if(this.state.dashboard.data.check_in_answered_count != this.state.dashboard.data.total_check_in_count && this.state.dashboard.data.check_questions_end_date.Valid) {
	    	if(DashboardController.daysToGo(this.state.dashboard.data.check_questions_end_date.String, "YYYY-MM-DD") < 0) {
	    		checkInQuestionsAlert = (
	    				<TouchableOpacity style={[styles.questionnaire_alert_holder, styles.row_layout, styles.center]}>
	    					<View style={globalStyles.padding_right_s}>
	    						<Image source={require('../../../assets/images/icons/alert.png')} style={globalStyles.icon_small}></Image>
	    					</View>
	    					<View>
	    						<Text style={styles.questionnaire_alert_label}>ALERT</Text>
	    						<Text style={styles.questionnaire_alert}>Check-in Questionnaire is overdue!</Text>
	    					</View>
	    				</TouchableOpacity>
	    			);
	    	} else {
		    	checkInQuestions = (
		    			<TouchableOpacity style={styles.questionnaire_holder}>
		    				<Text style={styles.questionnaire_label}>Active Check-in Questions</Text>
		    				<Text style={styles.questionnaire_days_left}>{DashboardController.daysToGo(this.state.dashboard.data.check_questions_end_date.String, "YYYY-MM-DD")} day</Text>
		    			</TouchableOpacity>
		    		);
		    }
	    }


		return (
	       	<ScrollView style={[styles.container, globalStyles.container]}>
	       		{checkInQuestionsAlert}
	       		<View style={styles.row_layout}>
		       		<View style={styles.row}>
		       			{messages}
		       			{minimodule}
		       			{keyBehaviorFocus}
		       		</View>
		       		<View style={styles.row}>
		       			{upcomingCall}
		       			{goal}
		       			{checkInQuestions}
		       		</View>
		       	</View>
		       	<LoadingModal isVisible={this.state.isModalOpen}>
	       		</LoadingModal>
			</ScrollView>      
		);

	}
});

module.exports = DashboardPage;