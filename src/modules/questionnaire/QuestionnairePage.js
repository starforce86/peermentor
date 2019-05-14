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

var {bp, vw, vh} = require('react-native-relative-units')(100);

var globalStyles=require('../common/styles/styles.js');
var styles=require('./styles.js');

var QuestionnaireController = require('./QuestionnaireController.js');

// Question components
var RadioButtonComponent = require('../common/components/RadioButtonComponent.js');
var RadioButtonComponent2 = require('../common/components/RadioButtonComponent2.js');
var SliderComponent = require('../common/components/SliderComponent.js');
var TextFieldComponent = require('../common/components/TextFieldComponent.js');
var TextInputComponent = require('../common/components/TextInputComponent.js');

var QuestionnairePage = React.createClass({
	componentWillMount: function() {
	    // LayoutAnimation.spring();
	    
  	},
	getInitialState: function() {
		QuestionnaireController.setViewController(this);
		QuestionnaireController.getQuestions();
		return {
			questions: []
		}
	},
	render: function() {
		return (
			<ScrollView style={[styles.container, globalStyles.container]}>
				{this.state.questions.map((object, key) => {
					if(object.question_type == 'rb1') {
						return (
							<RadioButtonComponent key={key} answer={object.answer} question={object} options={object.answers} />
						);
					} else if(object.question_type == 'rb2') { // 0 - 7 options
						return (
							<RadioButtonComponent2 key={key} answer={object.answer} question={object} options={object.answers} />
						);
					} else if(object.question_type == 'rs1') { // slider with one handle
						return (
							<SliderComponent key={key} answer={object.answer} question={object} options={object.answers} />
						);
					} else if(object.question_type == 'ta') {
						return (
							<TextFieldComponent key={key} answer={object.answer} question={object} />
						);
					} else if(object.question_type == 't') {
						return (
							<TextInputComponent key={key} answer={object.answer} question={object} />
						);
					}
				})}
		    </ScrollView>
		);

	}
});

module.exports = QuestionnairePage;