/**
 * Created by Nikee on 12/28/15.
 */
var React = require('react-native'); var { Alert } = React;
var _ = require("underscore");
var MentoringProgramDataResource = require("../../resources/mentoring-program-data");
var MentoringProgramFunctionsResource = require("../../resources/mentoring-program-functions");
var UserManager = require("../../user/index");
var Actions = require('react-native-router-flux').Actions;
var GoalUpdateController = {

	viewController: null,
	data: {
		goal: null,
		keyBehavior: null,
		checkQuestion: null,
		note: null
	},
	updateState() {
		this.viewController.setState({
			goal: GoalUpdateController.data.goal,
			keyBehavior: GoalUpdateController.data.keyBehavior,
			checkQuestion: GoalUpdateController.data.checkQuestion
		});
	},

	setViewController(controller) {
		this.viewController = controller;
	},

	getData() {
		MentoringProgramDataResource.getMenteeActiveGoal(this.viewController.props.mentoring_program_base_id, this.viewController.props.goal_id).then( (response) => {
          if(response) {
            GoalUpdateController.data.goal = response.active_goal;
        	GoalUpdateController.data.keyBehavior = response.in_focus_key_behavior;
        	GoalUpdateController.data.checkQuestion = response.check_question;
            GoalUpdateController.updateState();
          }
        });	
	},

	selectRating(id) {
		this.viewController.setState({
			currentStatus: id
		});
	},
	setNote(text) {
		this.data.note = text;
	},
	saveData() {
		if(this.viewController.state.currentStatus != 0) {
			MentoringProgramFunctionsResource.saveGoalCheckResponse(this.viewController.props.goal_id, this.viewController.state.currentStatus, this.data.note).then( (response) => {
	          Actions.goal_details({mentoring_program_base_id: this.viewController.props.mentoring_program_base_id, goal_id: this.viewController.props.goal_id});
	        });
		} else {
			Alert.alert("Status is required.");
		}
	},
	gotoGoalDetails() {
		Actions.goal_details({mentoring_program_base_id: this.viewController.props.mentoring_program_base_id, goal_id: this.viewController.props.goal_id});
	}
};

module.exports = GoalUpdateController;