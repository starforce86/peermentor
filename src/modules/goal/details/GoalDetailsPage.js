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

var Actions = require('react-native-router-flux').Actions;
var GoalDetailsController = require('./GoalDetailsController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../../common/styles/styles.js');
var styles=require('./styles.js');


var GoalDetailsPage = React.createClass({
	componentWillMount: function() {
	  GoalDetailsController.getData();
	  setTimeout(() => {this._showActionHistory()}, 500);
  	},
	getInitialState: function() {
		GoalDetailsController.setViewController(this);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			goal: {
				target_date: {}
			},
			keyBehavior: {},
			checkQuestion: {},
			workingGoalsLength: 0,
			goalsList: ds.cloneWithRows([]),
			labels: [],
			actionHistory: ds.cloneWithRows([])
		}
	},
	_showActionHistory: function() {
		this.setState({
			goalsList: this.state.actionHistory
		});
	},
	_updateGoal: function(goal_id) {
		Actions.goal_update({mentoring_program_base_id: this.props.mentoring_program_base_id, goal_id: goal_id});
	},
	_renderGoalRow: function(rowData) {
		var img = require('../../../../assets/images/rating-0.png');
		switch(rowData.current_status.Int64) {
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
		return (
				<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#979797', padding: 10}}>
					<Image style={{flex:1, flexDirection: 'row'}} source={img} style={globalStyles.icon_medium}></Image>
					<View style={{flex:1, flexDirection: 'column', paddingLeft: 10}}>
						<Text style={{fontSize: 13, opacity: 0.7}}>{rowData.end_date.String}</Text>
						<Text style={{fontWeight: '300'}}>{rowData.note.String || 'No notes available'}</Text>
					</View>
				</TouchableOpacity>
			);
	},
	render: function() {
		var goalTaget = (this.state.goal.by_interval == 'next_call') ? "By next call" : this.state.goal.target_date.String;
		var daysRemaining = (this.state.goal.target_date.String != "") ? (
			<View style={{backgroundColor: '#484848', padding: 2, borderRadius: 5, width: 100, marginTop: 10}}>
				<Text style={{fontSize: 12, fontWeight: '700', color: '#fff', textAlign: 'center'}}>{GoalDetailsController.daysRemaining("February 12, 2016")} days to go</Text>
			</View>
			) : (<Text></Text>);
		
		var showUpdateButton = (this.state.goal.mode == 1) ? (<View style={[styles.button_container]}>
						<TouchableOpacity onPress={() => this._updateGoal(this.state.goal.goal_id)} style={[styles.update_now_holder]}>
							<Text style={[styles.update_now_text]}>UPDATE NOW</Text>
						</TouchableOpacity>
					</View>) : (<Text></Text>);
		
		return (
			<ScrollView style={[styles.container, globalStyles.container]}>
				<View style={{backgroundColor: '#00C2E5', padding: 15, paddingBottom: (this.state.goal.mode == 1) ? 40 : 10}}>
					<Text style={{color: '#fff', fontSize: 15, lineHeight: 20}}>{this.state.goal.goal_details}</Text>
					<Text style={{color: '#fff', fontSize: 13, paddingBottom: 10}}>Key Behavior <Text style={{fontWeight: 'normal'}}>{this.state.keyBehavior.key_behavior}</Text></Text>
				</View>
				<View>
					<View style={{backgroundColor: '#E6E6E6', opacity: 0.5, width: vw * 100, position: 'absolute', left: 0, height: 80}}></View>
					{showUpdateButton}
					<View style={{flexDirection: 'row', padding: 15, backgroundColor: '#F3F3F3'}}>
						<View style={{width: vw * 50, borderRightWidth: 1, borderRightColor: '#979797'}}>
							<Text style={{color: '#4A4A4A', fontSize: 13}}>Started</Text>
							<Text style={{color: '#4A4A4A', fontSize: 13}}>{this.state.goal.goal_start_date}</Text>
						</View>
						<View style={{width: vw * 40, paddingLeft: 15}}>
							<Text style={{color: '#4A4A4A', fontSize: 13}}>Target</Text>
							<Text style={{color: '#4A4A4A', fontSize: 13}}>{goalTaget}</Text>
							{daysRemaining}
						</View>
					</View>
				</View>
				<View style={{backgroundColor: '#979797', height: 15, width: vw * 100, opacity: 0.2}}></View>
				<ListView 
					style={{marginTop: 10}}
					dataSource={this.state.goalsList} 
					renderRow={this._renderGoalRow} 
				/>
		    </ScrollView>
		);

	}
});

module.exports = GoalDetailsPage;