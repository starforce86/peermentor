const React = require('react-native');
var Actions = require('react-native-router-flux').Actions;
var {bp, vw, vh} = require('react-native-relative-units')(100);

const Dimensions = require('Dimensions');
const {
  StyleSheet,
  View,
  Text,
  Image,
  Component,
  TouchableOpacity
} = React;

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';
var globalStyles=require('../common/styles/styles.js');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: 'column',
    width: vh * 60,
    height: window.height,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'right',
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  update_profile: {
    color: '#00C2E5',
    fontSize: 11
  },
  close_button: {
    flex: 1,
    width: vw * 7,
    height: vh * 4,
    alignItems: 'flex-end'
  },
  filter_item: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:10,
    marginBottom: 5,
    position: 'relative',
    borderBottomWidth:1,
    borderBottomColor: '#979797',
    borderStyle: 'solid',
    width: vw * 100,
    flexDirection: 'row'
  },
  check_mark_img: {
    marginRight: 5
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
        <Text style={this.props.children.style}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

Button.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

module.exports = class Menu extends Component {
  viewFilteredTextMessages() {

  }

  viewFilteredScheduledCalls() {

  }

  viewFilteredMinimodules() {

  }
  
  viewAll() {

  }
  render() {
    var currentRoute = Actions.currentRoute;
    return (
      <View style={[styles.menu, globalStyles.container]}>
        <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          <View style={{flex: 0.3, width: vh * 100}}></View>
          <View style={{flex: 0.7, width: vh * 100, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={styles.title}>FILTER CONVERSATIONS</Text>
              <Button style={styles.close_button}><Text style={{color: '#000', fontSize: 16, fontWeight: '700', width: vw * 7, textAlign: 'right'}}>X</Text></Button>
            </View>
            <Text style={{fontWeight: '100', paddingRight: 10}}>Choose which message type you want to view in the conversations view</Text>
            <View style={styles.filter_item}><View style={[styles.check_mark_img, {opacity: (currentRoute == 'conversation_text_messages_list') ? 1 : 0}]}><Image source={require('../../../assets/images/icons/tick.png')} style={globalStyles.icon_small}></Image></View><Image source={require('../../../assets/images/icons/conversation_icon.png')} style={globalStyles.icon_small}></Image><Text style={[globalStyles.bold, globalStyles.margin_left_xs]} onPress={Actions.conversation_text_messages_list}>TEXT MESSAGES</Text></View>
            <View style={styles.filter_item}><View style={[styles.check_mark_img, {opacity: (currentRoute == 'conversation_scheduled_calls_list') ? 1 : 0}]}><Image source={require('../../../assets/images/icons/tick.png')} style={globalStyles.icon_small}></Image></View><Image source={require('../../../assets/images/icons/scheduled-call.png')} style={globalStyles.icon_small}></Image><Text style={[globalStyles.bold, globalStyles.margin_left_xs]} onPress={Actions.conversation_scheduled_calls_list}>SCHEDULED CALLS</Text></View>
            <View style={styles.filter_item}><View style={[styles.check_mark_img, {opacity: (currentRoute == 'conversation_minimodules_list') ? 1 : 0}]}><Image source={require('../../../assets/images/icons/tick.png')} style={globalStyles.icon_small}></Image></View><Image source={require('../../../assets/images/icons/play.png')} style={globalStyles.icon_small}></Image><Text style={[globalStyles.bold, globalStyles.margin_left_xs]} onPress={Actions.conversation_minimodules_list}>MINIMODULES</Text></View>
            <View style={styles.filter_item}><View style={[styles.check_mark_img, {opacity: (currentRoute == 'conversation') ? 1 : 0}]}><Image source={require('../../../assets/images/icons/tick.png')} style={globalStyles.icon_small}></Image></View><Text style={globalStyles.bold} onPress={Actions.conversation}>ALL</Text></View>
          </View>
        </View>
      </View>
    );
  }
}
