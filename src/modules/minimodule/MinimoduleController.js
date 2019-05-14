/**
 * Created by Nikee on 12/21/15.
 */
var _ = require("underscore");
var MinimoduleDataResource = require("../resources/minimodule-data");
var MinimoduleFunctionsResource = require("../resources/minimodule-functions");
var Actions = require('react-native-router-flux').Actions;
var alertService = require("../common/alert");
var MinimoduleController = {

	viewController: null,
	minimodule: {},

	updateState() {
		this.viewController.setState({
			data: {
				content: this.minimodule.content,
				questions: this.minimodule.questions,
				minimodule: this.minimodule.minimodule
			}
		});
	},

	setViewController(controller) {
		this.viewController = controller;
	},

	hideModal() {
		this.viewController.setState({
			isModalOpen: false
		});
	},

	getData() {
		MinimoduleDataResource.getMinimodule(this.viewController.props.minimoduleId).then((response) => {
			MinimoduleController.minimodule = response;
			MinimoduleController.updateState();
			MinimoduleController.hideModal();
		});
	},

	submitMinimodule() {
		if(this.viewController.state.data.minimodule.minimodule_status == 1) {
			var unansweredQuestions = _.filter(this.viewController.state.data.questions, function(question) {
	          return question.required_ind == 1 && (question.answer == undefined || question.answer.Valid == false);
	        });

	        if(unansweredQuestions.length == 0) {
	          MinimoduleFunctionsResource.insertMinimoduleQuestionAnswers(this.viewController.props.minimoduleId, this.viewController.state.data.questions).then(function(response){
	            if(response.Success == 1) {
	              MinimoduleController.viewController.state.data.minimodule.minimodule_status = 2;
	              Actions.minimodule2({scroll: true});
	              // MinimoduleController.viewController.state.data.questions = MinimoduleController.viewController.state.data.questions;
	              // MinimoduleController.updateState();
	              if(response.CorrectAnswersInd == true) alertService.notification("Nice job! Done, and you got the question(s) right!");
	              else alertService.notification("Done, but at least one answer that you provided was incorrect. No worries though- we\'ve provided an explanation to help you better understand the correct answer.");
	            }
	          });
	        }
	        else {
	          alertService.notification("Missing required questions.");
	        }
	    }
	}
};

module.exports = MinimoduleController;