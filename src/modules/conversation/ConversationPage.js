/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var {
		StyleSheet,
		View,
		Image,
		Text,
		ListView,
		Platform,
		TextInput,
		LayoutAnimation,
		TouchableHighlight,
		ScrollView,
		Component,
		TouchableOpacity
} = React;

var EventEmitter = require('EventEmitter');
var Subscribable = require("Subscribable");

var ConversationController = require('./ConversationController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../common/styles/styles.js');
var styles=require('./styles.js');
var UserMessage=require('./components/UserMessage.js');
var MinimoduleMessage=require('./components/MinimoduleMessage.js');
var CallMessage=require('./components/CallMessage.js');

var LoadingModal = require('../../components/LoadingModal');
var moment = require('moment-timezone');

var Actions = require('react-native-router-flux').Actions;
import InvertibleScrollView from 'react-native-invertible-scroll-view';

var SideMenu = require('react-native-side-menu');
// const Menu = require('./Menu.js');
const FilterMenu = require('./FilterMenu.js');

const MK = require('react-native-material-kit');
const {
  MKButton,
  MKColor,
  MKTextField,
  mdl,
} = MK;

const Textfield = MKTextField.textfield()
	.withHighlightColor(MKColor.Green)
  	.build();

// Custom Components
var ColoredRaisedButton = MKButton.coloredButton().build();
var ColorRoundButton = MKButton.colorRoundButton().build();

var ConversationPage = React.createClass({
	mixins: [Subscribable.Mixin],
	componentWillMount: function() {
		ConversationController.getData();
	},

	componentDidMount: function() {
		this.addListenerOn(this.props.events, "myRightFilterButtonClicked", this.rightFilterButtonNav);
	},
	rightFilterButtonNav: function () {
		var filter_button = this.refs.filter_button;
    	filter_button.context.menuActions.toggle();
	},

	getInitialState: function() {
		ConversationController.setViewController(this);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		// ConversationController.getData();
		return {
			isModalOpen: true,
			dataSource2: ds.cloneWithRows([]),
			height: 0,
			text: '',
			touchToClose: false
		}
	},
	handleOpenWithTouchToClose: function() {
    	this.setState({
      		touchToClose: true,
    	});
  	},
  	handleChange: function(isOpen) {
	    if (!isOpen) {
	      this.setState({
	        touchToClose: false,
	      });
	    }
  	},
  	convertSecondsToMinutes: function(seconds) {
        if(seconds >= 60) return parseFloat(moment.duration(parseInt(seconds), 'seconds').asMinutes()).toFixed(2)+" minutes";
        else return seconds + ' seconds';
    },
	_renderRow: function(rowData, rowID: number) {
		let from_type, avatar_float, text_align, background, created_at
		if(rowData.from_type == "mentee") {
			avatar_float = styles.right;
			text_align = 'right';
			from_type = rowData.user_initial; //'You';
			background = '#F2F2F2';
			
		} else if(rowData.notification_type == "system") {
			if(rowData.from_type == "minimodule") {
				background = '#00C2E5';
			} else {
				background = '#FF8162';
			}
		} else {
			avatar_float = styles.left;
			from_type = rowData.user_initial;
			background = '#E8F8F8';
			text_align = 'left';
		}
		
		if(rowData.created_at) 
			created_at = moment(rowData.created_at, 'MMMM DD, YYYY - h:mm A').format('MMM DD - h:mm A');
		if(rowData.notification_type == "message") {
			return (
					<UserMessage row={rowData} rowId={rowID} />
				);
		} else {
			if(rowData.from_type == "minimodule") {
				return (
					<MinimoduleMessage row={rowData} rowId={rowID} />
			    );
			} else {
				return (
			        <CallMessage row={rowData} rowId={rowID} />
			    );
			}
		}
	},
	render: function() {
		// var menu = <Menu navigator={navigator}/>;
		var filterMenu = <FilterMenu navigator={navigator}/>;
		// onScroll={() => { this.refs.scrollView.scrollTo(0,0) }}
		//<View style={styles.date_holder}><Text>Sept</Text></View>
		return (
		    <SideMenu menu={filterMenu}
					menuPosition='right'
		       		touchToClose={this.state.touchToClose}
		       		onChange={this.handleChange}
		       		ref='filter_menu'>
				<View style={[styles.container, globalStyles.container]}>
					<LoadingModal isVisible={this.state.isModalOpen}>
			       	</LoadingModal>
			       	
					<View style={{height: 0}}><Button ref="filter_button">FILTER</Button></View>
					<View style={[styles.full_width, {flex:1, flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<View style={styles.conversations_holder}>
							<ListView
						      	renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
						      	dataSource={this.state.dataSource2}
						      	renderRow={this._renderRow}
						    />
						</View>
					</View>
					<View style={styles.message_textfield_holder}>
							<TextInput style={styles.message_textfield} 
								onChangeText={(text) => this.setState({text: text})}
								placeholder="Write a message" 
								value={this.state.text} />
							<ColoredRaisedButton style={styles.btn_send}
								onPressOut = {() => ConversationController.sendMessage()}>
			          			<Text pointerEvents="none" style={styles.lbl_send} > SEND </Text>
			        		</ColoredRaisedButton>  			
					</View>
			    </View>
			</SideMenu>
		);

	}
});

class Button extends Component {
  handlePress(e) {
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text style={{color: '#fff', textAlign:'center'}}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

Button.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};
module.exports = ConversationPage;