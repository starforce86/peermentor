const React = require('react-native');
var Actions = require('react-native-router-flux').Actions;

const Dimensions = require('Dimensions');
const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  Component,
} = React;

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';
const photoImage = 'data:image/png;base64,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';

var {bp, vw, vh} = require('react-native-relative-units')(100);
var MainPage = require('./MainPage');
var LocalStorage = require('../common/local_store');
var WelcomePage = require('../welcome/WelcomePage');
var globalStyles=require('../common/styles/styles.js');

var UserManager = require("../user/index");

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#00C2E5',

  },
  top_area: {
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 25,
  },
  avatarContainer: {
    flexDirection: 'row',
    width: window.width,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    padding: 0,
    margin: 0,
    borderRadius: 20,
    marginBottom: 5,
    // resizeMode: 'contain',
  },
  name: {
    color: '#fff',
    fontFamily: "Times New Roman",
    fontSize: 17,
    marginBottom: 8
  },
  settings_icon: {
    position: 'absolute',
    left: 160
  },
  icon: {
    width: 15,
    height: 15
  },
  update_profile: {
    color: '#00C2E5',
    fontSize: 11
  },

  menu_area: {
    backgroundColor: 'transparent',
    width: vw * 100,
    left: 0,
    flex: 1,
  }, 
    item: {
      color: '#fff',
      fontSize: 14,
      paddingTop: 20,
      paddingLeft: 15,
    },

  menu_sep: {
    borderBottomWidth: 1, 
    marginLeft: 15, 
    marginTop: 10, 
    borderColor: '#979797',
  },
});

const menuStyles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    height: 40, 
    paddingTop: 5, 
    paddingBottom: 5, 
    alignItems: 'center', 
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#fff'
  },

  backgroundSelected: {
    backgroundColor: '#049FBB',
  },

  backgroundDeselected: {
    backgroundColor: 'inherit',
  },

    icon: {
      height: 20, 
      width: 20, 
      resizeMode: 'contain', 
      marginLeft: 15, 
      marginRight: 10,
    },

    title: {
      fontSize: 14,
      color: '#fff',
      marginLeft: 25
    },
});

class SideMenuItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    }
  }

  setSelected () {
    this.setState({
      isSelected: true,
    })
  }

  setDeSelected() {
    this.setState({
      isSelected: false,
    })
  }

  render() {
    return (
      <TouchableOpacity style={[menuStyles.container, this.state.isSelected ? menuStyles.backgroundSelected : menuStyles.backgroundDeselected]}
          onPress={this.props.onPress}>
        <Text style={menuStyles.title}> {this.props.titleString} </Text>
      </TouchableOpacity>
    );
  }
}


module.exports = class Menu extends React.Component {

  render() {
    return (
      <View style={styles.menu}>
        <View style={styles.top_area}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{ uri: photoImage}}/>
            <TouchableOpacity style={styles.settings_icon} onPress={this.onSettings.bind(this)}>
              <Image style={styles.icon} source={require("../../../assets/images/icons/settings.png")}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{UserManager.data.first_name} {UserManager.data.last_name}</Text>
        </View>

        <View style={styles.menu_area}>
          <SideMenuItem titleString={"DASHBOARD"} onPress={this.onDashboard.bind(this)} ref="btn_dashboard" /> 
          <SideMenuItem titleString={"CONVERSATIONS"} onPress={this.onConversation.bind(this)} ref="btn_converstaion" /> 
          <SideMenuItem titleString={"CALL SCHEDULE"} onPress={this.onReschedule.bind(this)} ref="btn_reschedule"/> 
          <SideMenuItem titleString={"GOALS"} onPress={this.onGoal.bind(this)} ref="btn_goal" /> 
          <SideMenuItem titleString={"CHECK-IN QUESTIONS"} onPress={this.onQuestionnaire.bind(this)} ref="btn_check_in" /> 
          <SideMenuItem titleString={"LOGOUT"} onPress={this.onLogout.bind(this)} ref="btn_logout" /> 
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    
  }

  componentDidMount() {
    // this.refs.btn_dashboard.setSelected();
    this.refs.btn_dashboard.setSelected();
  }

  deSelectAllMenus() {
    this.refs.btn_dashboard.setDeSelected();
    this.refs.btn_converstaion.setDeSelected();
    this.refs.btn_reschedule.setDeSelected();
    this.refs.btn_goal.setDeSelected();
    this.refs.btn_check_in.setDeSelected();
    // this.refs.btn_cards.setDeSelected();
  }

  onDashboard(e) {
    if (Actions.dashboard)
      Actions.dashboard();
    this.props.closeMenu();

    this.deSelectAllMenus();
    this.refs.btn_dashboard.setSelected();

  }

  onConversation(e) {
    if (Actions.conversation)
      Actions.conversation({}); 
    this.props.closeMenu();

    this.deSelectAllMenus();
    this.refs.btn_converstaion.setSelected();
  }

  onReschedule(e) {
    if (Actions.reschedule)
      Actions.reschedule({}); 
    this.props.closeMenu();

    this.deSelectAllMenus();
    this.refs.btn_reschedule.setSelected();
  }

  onGoal(e) {
    if (Actions.goal)
      Actions.goal({}); 
    this.props.closeMenu();
    this.deSelectAllMenus();
    this.refs.btn_goal.setSelected();
  }

  // onCard(e) {
  //   if (Actions.card)
  //     Actions.card({}); 
  //   this.props.closeMenu();

  //   this.deSelectAllMenus();
  //   this.refs.btn_cards.setSelected();
  // }

  onSettings(e) {
    if (Actions.settings)
      Actions.settings({}); 
    this.props.closeMenu();
    this.deSelectAllMenus();
  }

  onQuestionnaire(e) {
    if (Actions.questionnaire)
      Actions.questionnaire({});  
    this.props.closeMenu();
    this.deSelectAllMenus();
    this.refs.btn_check_in.setSelected();
  }

  onLogout(e) {
    LocalStorage.removeData("UserManager");
    LocalStorage.removeData("MenteeProfile");
    Actions.welcome();
    // return <WelcomePage navigator={nav} />;
    // this.props.navigator.push({id: 'welcome'});
    this.props.closeMenu();
  }
}
