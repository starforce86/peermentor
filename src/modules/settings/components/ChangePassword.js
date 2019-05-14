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
    TouchableHighlight,
    Modal
} = React;

var {bp, vw, vh} = require('react-native-relative-units')(100);
var SettingsController = require('../SettingsController.js');
var globalStyles=require('../../common/styles/styles.js');
const MK = require('react-native-material-kit');
const {
  MKButton,
  MKColor,
  MKTextField,
  mdl,
} = MK;
const Textfield = MKTextField.textfield()
  .withHighlightColor(MKColor.Green)
  .withPassword(true)
  .build();

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 18,
    fontWeight: '500'
  },
  field_item: {
    width: vw * 100,
    padding: 15
  },
  label: {
    color: '#444', 
    fontSize: 16
  },
  textfield: {
    width: vw * 100, 
    height: vh * 6
  },
  button: {
    borderRadius: 5,
    height: 40,
    width: 60,
    backgroundColor: '#5CB85C',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    color: '#fff',
    textAlign: 'center',
  },
});
var ChangePassword = React.createClass({
  getInitialState() {
    return {
      info: this.props.info
    };
  },
  render() {
    return (
      <View style={[styles.container, globalStyles.container]}>
        <View style={styles.field_item}>
          <Text style={styles.label}>Current Password*</Text>
          <Textfield style={styles.textfield}
                  onChangeText={(text) => SettingsController.setCurrentPassword(text)}
                  />
        </View>
        <View style={styles.field_item}>
          <Text style={styles.label}>New Password*</Text>
          <Textfield style={styles.textfield}
                  onChangeText={(text) => SettingsController.setNewPassword(text)}
                  />
        </View>
        <View style={styles.field_item}>
          <Text style={styles.label}>Confirm Password*</Text>
          <Textfield style={styles.textfield}
                  onChangeText={(text) => SettingsController.setConfirmPassword(text)}
                  />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => SettingsController.updatePassword()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

module.exports = ChangePassword;