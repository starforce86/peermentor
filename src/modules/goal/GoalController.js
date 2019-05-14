/**
 * Created by Nikee on 12/25/15.
 */

var React = require('react-native');
var {
	ListView
} = React;

var _ = require("underscore");
var MentoringProgramDataResource = require("../resources/mentoring-program-data");
var MenteeDataResource = require("../resources/mentee-data");
var UserManager = require("../user/index");
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var GoalController = {

	viewController: null,
	data: {
		goal: null,
		keyBehavior: null,
		checkQuestion: null,
		workingGoals: [],
		workingGoalsLength: 0,
		notWorkingGoals: [],
		notWorkingGoalsLength: 0,
		labels: [],
		menteeProfile: {}
	},
	hideModal() {
		this.viewController._showActiveGoals();
		this.viewController.setState({
			isModalOpen: false
		});
	},
	updateState() {
		// var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.viewController.setState({
			goal: GoalController.data.goal,
			keyBehavior: GoalController.data.keyBehavior,
			checkQuestion: GoalController.data.checkQuestion,
			workingGoals: ds.cloneWithRows(GoalController.data.workingGoals),
			workingGoalsLength: GoalController.data.workingGoalsLength,
			notWorkingGoals: GoalController.data.notWorkingGoals,
			notWorkingGoalsLength: GoalController.data.notWorkingGoalsLength,
			labels: GoalController.data.labels,
			menteeProfile: GoalController.data.menteeProfile   
		});
	},

	setViewController(controller) {
		this.viewController = controller;
	},

	getData() {
		MenteeDataResource.getMenteeProfile(UserManager.data.mentee_id).then((response) => {
			GoalController.data.menteeProfile = response;
			GoalController.getActiveGoal(response);
			GoalController.getWorkingNotWorkingGoals(response);
        });
	},
	getActiveGoal(response) {
		MentoringProgramDataResource.getMenteeActiveGoal(response.mentoring_program_base_id).then((response1) => {
			if(response1) {
        		GoalController.data.goal = response1.active_goal;
        		GoalController.data.keyBehavior = response1.in_focus_key_behavior;
				GoalController.data.checkQuestion = response1.check_question;
				GoalController.updateState();
			}
		});
	},
	getWorkingNotWorkingGoals(response) {
		MentoringProgramDataResource.getMenteeWorkingNotWorkingGoals(response.mentoring_program_base_id).then((response2) => {
            GoalController.data.workingGoals = response2.working_goals;
            GoalController.data.workingGoalsLength = response2.working_goals_length;
            GoalController.data.notWorkingGoals = response2.not_working_goals;
            GoalController.data.notWorkingGoalsLength = response2.not_working_goals_length;
          
	        GoalController.data.labels = [];
	        _(response2.labels).each((label, index) => {
	        	GoalController.data.labels[index] = label.replace("<br />", " ").toUpperCase();
	        });
	        GoalController.updateState();
	        GoalController.hideModal();
        });
	}
};

module.exports = GoalController;