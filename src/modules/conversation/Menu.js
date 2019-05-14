const React = require('react-native');
var Actions = require('react-native-router-flux').Actions;

const Dimensions = require('Dimensions');
const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
} = React;

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 47,
    flex: 1,
  },
  name: {
    fontSize: 28,
    marginBottom: 8
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  update_profile: {
    color: '#00C2E5',
    fontSize: 11
  }
});

module.exports = class Menu extends Component {
  render() {
    return (
      <ScrollView style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
        </View>
        <Text style={styles.name}>Your name</Text>
        <Text style={styles.update_profile}>UPDATE PROFILE</Text>
        <Text style={styles.item} onPress={Actions.dashboard}>DASHBOARD</Text>
        <Text style={styles.item} onPress={Actions.conversation}>CONVERSATIONS</Text>
        <Text style={styles.item} onPress={Actions.reschedule}>CALL SCHEDULE</Text>
        <Text style={styles.item} onPress={Actions.goal}>GOALS</Text>
        <Text style={styles.item} onPress={Actions.questionnaire}>CHECK-IN QUESTIONS</Text>
        <Text style={styles.item}>LOGOUT</Text>
      </ScrollView>
    );
  }
}
