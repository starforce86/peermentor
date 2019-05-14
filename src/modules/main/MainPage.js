/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    LayoutAnimation,
    Navigator,
    AlertIOS,
    PixelRatio,
    ScrollView,
    TouchableHighlight,
      TouchableOpacity,
    TouchableOpacity
} = React;

const MK = require('react-native-material-kit');
var MainController = require('./MainController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);

var LoadingModal = require('../../components/LoadingModal');
var Platform = require('../common/platform');

var {Router, Route, Schema, Animations, TabBar} = require('react-native-router-flux');
var Actions = require('react-native-router-flux').Actions;

var EventEmitter = require('EventEmitter');
var Subscribable = require("Subscribable");

// Pages
var HowItWorks = require('../welcome/manual/ManualPage');
var WelcomePage = require('../welcome/WelcomePage');
var DashboardPage = require('../dashboard/DashboardPage');
var ReschedulePage = require('../reschedule/ReschedulePage');
var RescheduleAnotherDatePage = require('../reschedule/anotherdate/RescheduleAnotherDatePage');
var RescheduleAnotherTimePage = require('../reschedule/anothertime/RescheduleAnotherTimePage');
var RescheduleConfirmationPage = require('../reschedule/confirmation/RescheduleConfirmationPage');
var GoalPage = require('../goal/GoalPage');
var GoalDetailsPage = require('../goal/details/GoalDetailsPage');
var GoalUpdatePage = require('../goal/update/GoalUpdatePage');
var MinimodulePage = require('../minimodule/MinimodulePage');
var ConversationPage = require('../conversation/ConversationPage');
var MinimodulesListPage = require('../conversation/minimoduleslist/MinimodulesListPage');
var ScheduledCallsListPage = require('../conversation/scheduledcallslist/ScheduledCallsListPage');
var TextMessagesListPage = require('../conversation/textmessageslist/TextMessagesListPage');
var QuestionnairePage = require('../questionnaire/QuestionnairePage');
var SettingsPage = require('../settings/SettingsPage');
var ChangePasswordPage = require('../settings/components/ChangePassword');
var EditPersonalInfoPage = require('../settings/components/EditPersonalInformation');
var PrivacyPolicyPage = require('../settings/components/PrivacyPolicy');
var TermsConditionsPage = require('../settings/components/TermsConditions');
var UpdateAvailabilityPage = require('../settings/components/UpdateAvailability');
var ProfilePicturePage = require('../settings/components/ProfilePicture');


var UserManager = require("../user/index");
var SideMenu = require('react-native-side-menu');
var Menu = require('./Menu');
var styles = require('./styles.js');

var MainPage = React.createClass({
  componentWillMount: function() {
      UserManager.initiate();
  },
  componentDidMount: function() {
      MainController.getMenteeProfile();
  },

  handleOpenWithTouchToClose: function() {
    this.setState({
        touchToClose: true,
    });
  },
  handleChange: function(isOpen) {
    // console.log("Handle Changed");
  },

  getInitialState: function() {
    MainController.setView(this);
    return {
      flagReadyForLogin: false,
      touchToClose: false
    }
  },

  closeMenu: function () {
    var sideMenu = this.refs.side_menu;
    sideMenu.closeMenu();
  },

  openMenu: function () {
    var sideMenu = this.refs.side_menu;
    sideMenu.openMenu();
  },

  rightFilterButton_Clicked: function () {
    this.eventEmitter.emit("myRightFilterButtonClicked", {});
  },


  render: function() {
    var sideMenu = <Menu openMenu={this.openMenu} nav={navigator} closeMenu={this.closeMenu} />;
    var leftMenuButton = <SideMenuButton/>;
    var leftBackButton = <LeftBackButton/>;
    var rightMenuButton = <FilterSideMenuButton onPress={ () => this.rightFilterButton_Clicked()} />;
    var anotherTimeButton = <RightSideButton title="Another Time" onPress={() => {Actions.rescheduleAnotherDate();}}/>
    var cancelButton = <RightSideButton title="Cancel" onPress={() => {Actions.pop();}}/>
    // if (Platform.platform == 'Android') {

    // }

    this.eventEmitter = new EventEmitter();
    
    return (
      <SideMenu menu={sideMenu}
                navigator={navigator}
                menuPosition='left'
                edgeHitWidth={20}
                touchToClose={this.state.touchToClose}
                onChange={this.handleChange}
                ref="side_menu">

          <Router hideNavBar={false} 
                  navigationBarStyle={styles.navBar} 
                  titleStyle={Platform.platform == 'Android' ? styles.navBarTitle_Android : Platform.platform == 'iOS' ? styles.navBarTitle : {} } 
                  barButtonTextStyle={styles.navBarText}>

                  <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                  <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                  <Schema name="fromLeft" sceneConfig={Navigator.SceneConfigs.FloatFromLeft}/>
                  <Schema name="withoutAnimation"/>
                  
                  <Route name="welcome" component={WelcomePage} schema="withoutAnimation"/>
                  <Route name="dashboard" component={DashboardPage} initial={true} title="Dashboard" leftMenuButton={leftMenuButton} />
                  <Route name="how_it_works" component={HowItWorks} title="How it works" schema="modal"/>
                  <Route name="conversation" component={ConversationPage} rightMenuButton={rightMenuButton} title="Conversations" 
                    events={this.eventEmitter}
                    leftMenuButton={leftMenuButton}/>
                  <Route name="conversation_minimodules_list" component={MinimodulesListPage} rightMenuButton={rightMenuButton} title="Conversations"
                    leftMenuButton={leftBackButton} events={this.eventEmitter} schema="withoutAnimation"/>
                  <Route name="conversation_scheduled_calls_list" component={ScheduledCallsListPage} rightMenuButton={rightMenuButton} title="Conversations"
                    leftMenuButton={leftBackButton} events={this.eventEmitter} schema="withoutAnimation"/> 
                  <Route name="conversation_text_messages_list" component={TextMessagesListPage} rightMenuButton={rightMenuButton} title="Conversations"
                    leftMenuButton={leftBackButton} events={this.eventEmitter} schema="withoutAnimation"/> 
                  <Route name="reschedule" component={ReschedulePage} rightMenuButton={anotherTimeButton} initial={false} title="Reschedule"
                    leftMenuButton={leftMenuButton}/> 
                  <Route name="rescheduleAnotherDate" component={RescheduleAnotherDatePage} initial={false} title="Suggest Another Time"
                    leftMenuButton={leftBackButton} rightMenuButton={cancelButton}/>
                  <Route name="rescheduleAnotherTime" component={RescheduleAnotherTimePage} initial={false} title="Suggest Another Time"
                    leftMenuButton={leftBackButton} rightMenuButton={cancelButton}/>
                  <Route name="rescheduleConfirmation" component={RescheduleConfirmationPage} initial={false} title="Suggest Another Time"
                    leftMenuButton={leftBackButton} rightMenuButton={cancelButton}/> 
                  <Route name="goal" component={GoalPage} initial={false} title="Goals"
                    leftMenuButton={leftMenuButton} schema="fromLeft"/> 
                  <Route name="goal_details" component={GoalDetailsPage} title="Goal Details"
                    leftMenuButton={leftBackButton}/>
                  <Route name="goal_update" component={GoalUpdatePage} initial={false} title="Active Goal"
                    leftMenuButton={leftBackButton} rightMenuButton={cancelButton}/> 
                  <Route name="questionnaire" component={QuestionnairePage} title="Questionnaire" 
                    leftMenuButton={leftMenuButton}/> 
                  <Route name="minimodule" component={MinimodulePage} title="Minimodule" 
                    leftMenuButton={leftMenuButton}/> 
                  <Route name="minimodule2" component={MinimodulePage} title="Minimodule" 
                    leftMenuButton={leftMenuButton} schema="withoutAnimation"/> 

                  <Route name="settings" component={SettingsPage} initial={false} title="My Profile" 
                    leftMenuButton={leftMenuButton}/>
                  <Route name="change_password" component={ChangePasswordPage} initial={false} title="Change Password" 
                    leftMenuButton={leftBackButton} schema="modal"/> 
                  <Route name="edit_personal_info" component={EditPersonalInfoPage} initial={false} title="Edit Information" 
                    leftMenuButton={leftBackButton} schema="modal"/>
                  <Route name="privacy_policy" component={PrivacyPolicyPage} initial={false} title="Privacy Policy" 
                    leftMenuButton={leftBackButton} schema="modal"/>
                  <Route name="terms_condition" component={TermsConditionsPage} initial={false} title="Terms & Conditions" 
                    leftMenuButton={leftBackButton} schema="modal"/>
                  <Route name="update_availability" component={UpdateAvailabilityPage} initial={false} title="Update Availability" 
                    leftMenuButton={leftBackButton} schema="modal"/>
                  <Route name="update_profile_picture" component={ProfilePicturePage} initial={false} title="Profile Picture" 
                    leftMenuButton={leftBackButton} schema="modal"/> 
          </Router>

      </SideMenu>


    );
  }
});

class SideMenuButton extends React.Component {
  handlePress(e) {
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  closeMenu() {
    this.context.menuActions.close();
  }

  openMenu () {
    this.context.menuActions.open();
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}>
        <Image  source={require('../../../assets/images/icons/Back.png')}
                style={Platform.platform == 'Android' ? styles.leftSideMenuIcon_Android : Platform.platform == 'iOS' ? styles.leftSideMenuIcon : {} }>
        </Image>
      </TouchableOpacity>
    );
  }
}

class LeftBackButton extends React.Component {
  handlePress(e) {
    Actions.pop();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}>
        <Image  source={require('../../../assets/images/icons/Back.png')}
                style={styles.leftSideMenuIcon}>
        </Image>
      </TouchableOpacity>
    );
  }
}

class FilterSideMenuButton extends React.Component {
  handlePress(e) {

    // this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  closeMenu() {
    this.context.menuActions.close();
  }

  openMenu () {
    this.context.menuActions.open();
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)} style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 14, color: '#333', opacity: 0.5, paddingRight: 10}}>FILTER</Text>
      </TouchableOpacity>
    );
  }
}

class RightSideButton extends React.Component {
  handlePress(e) {
    // this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)} style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 14, color: '#333', opacity: 0.5, paddingRight: 10}}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

SideMenuButton.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

FilterSideMenuButton.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};



module.exports = MainPage;