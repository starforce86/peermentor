/**
 * Created by Nikee on 12/21/15.
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
		TouchableOpacity,
		TouchableWithoutFeedback
} = React;

import { RadioButtons } from 'react-native-radio-buttons'

var LoadingModal = require('../../components/LoadingModal');

var MinimoduleController = require('./MinimoduleController.js');
var MinimoduleContent=require('./components/MinimoduleContent.js');
var RadioButtonComponent = require('../common/components/RadioButtonComponent.js');
var TextFieldComponent = require('../common/components/TextFieldComponent.js');
var TextInputComponent = require('../common/components/TextInputComponent.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../common/styles/styles.js');
var styles=require('./styles.js');

const MK = require('react-native-material-kit');
const {
  MKButton,
} = MK;
var ColoredRaisedButton = MKButton.coloredButton().build();

var MinimodulePage = React.createClass({
	componentWillMount: function() {
	    // LayoutAnimation.spring();
	    MinimoduleController.getData();
  	},
  	componentDidMount: function() {
  		if(this.props.scroll) {
  			setTimeout(() => { this.refs.SCROLLVIEW.scrollTo(this.state.questionnairePosition - 50); }, 200);
  		}
  	},
	getInitialState: function() {
		MinimoduleController.setViewController(this);
		return {
			isModalOpen: true,
			questionnairePosition: 0,
			data: {
				content: [],
				questions: [],
				minimodule: []
			}
		}
	},
	onLayout: function(obj) {
		this.state.questionnairePosition = obj.nativeEvent.layout.y;
	},
	render: function() {
		return (
			<ScrollView style={[globalStyles.container]} ref="SCROLLVIEW">
				<LoadingModal isVisible={this.state.isModalOpen}>
			    </LoadingModal>
				<View style={styles.content_holder}>
					{this.state.data.content.map((object, key) => {
						return (
							<MinimoduleContent key={key} content={object}/>
						);
					})}
				</View>
				<View style={styles.question_holder} ref="questionnaire" onLayout={this.onLayout}>
					<Text style={styles.questionnaire_label}>Questionnaire</Text>
					{this.state.data.questions.map((object, key) => {
						if(object.question_type == 'rb1') {
							return (
								<RadioButtonComponent key={key} answer={object.answer} disabled={this.state.data.minimodule.minimodule_status == 2} question={object} options={object.answers} />
							);
						} else if(object.question_type == 'ta') {
							return (
								<TextFieldComponent key={key} answer={object.answer} disabled={this.state.data.minimodule.minimodule_status == 2} question={object} />
							);
						} else if(object.question_type == 't') {
							return (
								<TextInputComponent key={key} answer={object.answer} disabled={this.state.data.minimodule.minimodule_status == 2} question={object} />
							);
						}
					})}
			    </View>
			    <View style={styles.button_holder}>
			    	<ColoredRaisedButton onPressOut={() => { MinimoduleController.submitMinimodule() }} style={[styles.btn_submit, {opacity: (this.state.data.minimodule.minimodule_status == 1) ? 1 : 0}]}>
	          			<Text pointerEvents="none" style={styles.lbl_submit} > SUBMIT </Text>
	        		</ColoredRaisedButton>
			    </View>
		    </ScrollView>
		);

	}
});

module.exports = MinimodulePage;