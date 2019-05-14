/**
 * Created by Nikee on 1/13/15.
 */
var CheckQuestionnaireDataResource = require("../resources/check-questionnaire-data"); 
var UserManager = require('../user/index');
var _ = require("underscore");

var QuestionnaireController = {

	viewController: null,
	questions: [],
	updateState() {
		this.viewController.setState({
			questions: this.questions
		});
	},

	setViewController(controller) {
		this.viewController = controller;
	},

	getQuestions() {
		var self = this;
		CheckQuestionnaireDataResource.getCheckQuestions(UserManager.data.org_id, UserManager.profile.mentoring_program_base_id).then( (response) => {
			if(response) {
				self.questions = response.questions;
				console.log(response.questions);
				self.updateState();
			}
		});
	}
};

module.exports = QuestionnaireController;