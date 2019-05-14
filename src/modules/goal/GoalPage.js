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

var LoadingModal = require('../../components/LoadingModal');
var GoalController = require('./GoalController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var Actions = require('react-native-router-flux').Actions;
var globalStyles=require('../common/styles/styles.js');
var styles=require('./styles.js');

var GoalPage = React.createClass({
	componentWillMount: function() {
	  GoalController.getData();
  	},
	getInitialState: function() {
		GoalController.setViewController(this);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			isModalOpen: true,
			goal: {},
			keyBehavior: {},
			checkQuestion: {},
			workingGoalsLength: 0,
			goalsList: ds.cloneWithRows([]),
			workingGoals: ds.cloneWithRows([]),
			labels: [],
			menteeProfile: {},
			img: '',
			listViewMode: 1
		}
	},
	_showActiveGoals: function() {
		this.setState({
			img: 'tick',
			goalsList: this.state.workingGoals,
			listViewMode: 1
		});
	},
	_showDiscardedGoals: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.setState({
			img: 'cross',
			goalsList: ds.cloneWithRows(this.state.notWorkingGoals),
			listViewMode: 2
		});
	},
	_viewGoal: function(goal_id) {
		Actions.goal_details({mentoring_program_base_id: this.state.menteeProfile.mentoring_program_base_id, goal_id: goal_id});
	},
	_updateGoal: function(goal_id) {
		Actions.goal_update({mentoring_program_base_id: this.state.menteeProfile.mentoring_program_base_id, goal_id: goal_id});
	},
	_renderGoalRow: function(rowData) {
		var img = (this.state.img == "tick") ? require('../../../assets/images/green_check.png') : require('../../../assets/images/icons/cross.png');
		return (
				<TouchableOpacity onPress={() => this._viewGoal(rowData.goal_id)} style={styles.goal_list_holder}>
					<View style={styles.details_holder}>
						<Text style={styles.history_detail}>{rowData.goal_details}</Text>
						<Text style={styles.history_complete_date}>Completed on {rowData.goal_as_working_date}</Text>
					</View>
					<Image source={img} style={[globalStyles.icon_small, globalStyles.margin_m]}></Image>
				</TouchableOpacity>
			);
	},
	render: function() {
		var showUpdateButton = (this.state.goal.mode == 1) ? (
				<TouchableOpacity onPress={() => this._updateGoal(this.state.goal.goal_id)} style={[styles.update_now_holder]}>
					<Text style={[styles.update_now_text]}>UPDATE NOW</Text>
				</TouchableOpacity>
			) : (<Text></Text>);

		return (
			<View style={[styles.container, globalStyles.container]}>
				<LoadingModal isVisible={this.state.isModalOpen}>
		       	</LoadingModal>
				<View style={styles.main_bg}>
					<View style={styles.key_behavior_bg}>
						<Text style={styles.label}>Key Behavior Focus</Text>
						<Text style={styles.desc}>{this.state.keyBehavior.key_behavior}</Text>
					</View>
					<View style={[globalStyles.padding_m, styles.info_holder]}>
						<View style={styles.active_goal_holder}>
							<Text style={styles.label}>Active Goal</Text>
							<Text style={styles.active_goal_details}>{this.state.goal.goal_details}</Text>
						</View>
						<TouchableOpacity style={styles.green_check_holder} onPress={() => this._viewGoal(this.state.goal.goal_id)}>
							<Image style={[globalStyles.icon_small]} source={require('../../../assets/images/icons/right_arrow_white.png')}></Image>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.tab_holder}>
					{showUpdateButton}
					<View style={styles.tab_button_holder}>
						<TouchableOpacity style={[styles.tab1, (this.state.listViewMode == 1) ? styles.button_selected : {}]} onPress={() => this._showActiveGoals() }>
							<Text style={[styles.text, (this.state.listViewMode == 1) ? styles.text_selected : {}]}>{this.state.labels.workingGoals} {this.state.workingGoalsLength}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.tab2, (this.state.listViewMode == 2) ? styles.button_selected : {}]} onPress={() => this._showDiscardedGoals() }>
							<Text style={[styles.text, (this.state.listViewMode == 2) ? styles.text_selected : {}]}>{this.state.labels.notWorkingGoals} {this.state.notWorkingGoalsLength}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<ListView 
					dataSource={this.state.goalsList} 
					renderRow={this._renderGoalRow} 
				/>
		    </View>
		);

	}
});

module.exports = GoalPage;