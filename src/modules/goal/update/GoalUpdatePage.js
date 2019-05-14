/**
 * Created by Nikee on 12/25/15.
 */
var React = require('react-native');
var {
		StyleSheet,
		View,
		ListView,
		WebView,
		ScrollView,
		Image,
		Text,
		TextInput,
		LayoutAnimation,
		TouchableOpacity
} = React;

var GoalUpdateController = require('./GoalUpdateController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../../common/styles/styles.js');
var styles=require('./styles.js');


var GoalUpdatePage = React.createClass({
	componentWillMount: function() {
	  GoalUpdateController.getData();
  	},
	getInitialState: function() {
		GoalUpdateController.setViewController(this);
		return {
			goal: {
				target_date: {}
			},
			keyBehavior: {},
			checkQuestion: {
				answers:[]
			},
			currentStatus: 0,
			workingGoalsLength: 0,
			labels: []
		}
	},
	render: function() {
		return (
			<View style={[styles.container, globalStyles.container]}>
				<ScrollView>
					<View style={styles.header_container}>
						<Text style={styles.goal_header}>{this.state.goal.goal_details}</Text>
						<Text style={styles.kb_label}>Key Behavior <Text style={{fontWeight: 'normal'}}>{this.state.keyBehavior.key_behavior}</Text></Text>
					</View>
					<View style={styles.body_container}>
						<View style={styles.status_holder}>
							<Text style={{fontSize: 16}}>{this.state.checkQuestion.question}</Text>
							<View style={styles.status_container}>
								{

									this.state.checkQuestion.answers.map((ans, key) => {
										var img = require('../../../../assets/images/rating-0.png');
										switch(ans.id) {
											case 1:
												img = require('../../../../assets/images/rating-1.png');
												break;
											case 2:
												img = require('../../../../assets/images/rating-2.png');
												break;
											case 3:
												img = require('../../../../assets/images/rating-3.png');
												break;
											case 4:
												img = require('../../../../assets/images/rating-4.png');
												break;
											case 5:
												img = require('../../../../assets/images/rating-5.png');
												break;
										}
										var selected = (this.state.currentStatus == ans.id) ? { backgroundColor: '#EEEEEE'} : {};
										return (
												<TouchableOpacity key={key} style={[selected, styles.status_button]} onPress={() => GoalUpdateController.selectRating(ans.id)}>
													<Image source={img} style={globalStyles.rating_icon}></Image>
													<Text style={styles.status_text}>{ans.answer}</Text>
												</TouchableOpacity>
											)
									})
								}
							</View>
						</View>
						<View style={{marginTop: 10}}>
							<Text>Add a note</Text>
							<TextInput 
								style={styles.text_area} 
								onChangeText={(text) => GoalUpdateController.setNote(text)} 
								value={this.state.text} 
								multiline={true}
								placeholder="Note..."
								/>
						</View>
					</View>
			    </ScrollView>
			    <View style={globalStyles.bottom_fixed}>
			    	<TouchableOpacity style={globalStyles.primary_button}
						onPress={()=>GoalUpdateController.saveData()}>
						<Image source={require('../../../../assets/images/check.png')} style={globalStyles.check_img}>
				        </Image>
					</TouchableOpacity>  
			    </View>
			</View>
		);

	}
});

module.exports = GoalUpdatePage;