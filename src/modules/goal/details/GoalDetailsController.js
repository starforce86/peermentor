/**
 * Created by Nikee on 12/25/15.
 */

var React = require('react-native');
var {
	ListView
} = React;

var _ = require("underscore");
var moment = require("moment");
var MentoringProgramDataResource = require("../../resources/mentoring-program-data");
var UserManager = require("../../user/index");

var GoalDetailsController = {

	viewController: null,
	data: {
		goal: null,
		keyBehavior: null,
		checkQuestion: null
	},
	updateState() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.viewController.setState({
			goal: GoalDetailsController.data.goal,
			keyBehavior: GoalDetailsController.data.keyBehavior, 
			actionHistory: ds.cloneWithRows(GoalDetailsController.data.actionHistory)
		});
	},

	setViewController(controller) {
		this.viewController = controller;
	},

	daysRemaining(date) {
		var eventdate = moment(date, "MMMM DD, YYYY");
	    var todaysdate = moment();
	    return eventdate.diff(todaysdate, 'days');
	},

	getData() {
		MentoringProgramDataResource.getMenteeActiveGoalAction(this.viewController.props.mentoringmomentprogram_base_id, this.viewController.props.goal_id).then( (response) => {
          if(response) {
            GoalDetailsController.data.goal = response.active_goal;
        	GoalDetailsController.data.keyBehavior = response.in_focus_key_behavior;
            GoalDetailsController.updateState();
          }
        });
        MentoringProgramDataResource.getMenteeGoalActionHistory(this.viewController.props.goal_id).then( (response) => {
          if(response) {
            GoalDetailsController.data.actionHistory = response;
            GoalDetailsController.updateState();
          }
        });
		
	}
};

module.exports = GoalDetailsController;