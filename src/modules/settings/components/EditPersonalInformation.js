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
var EditPersonalInformation = React.createClass({
  getInitialState() {
    return {
      info: this.props.info
    };
  },
  render() {
    return (
      <View style={[styles.container, globalStyles.container]}>
        <View style={styles.field_item}>
          <Text style={styles.label}>First Name*</Text>
          <Textfield style={styles.textfield}
                  onChangeText={(first_name) => SettingsController.setFirstName(first_name)}
                  placeholder="John" 
                  value={this.state.info.first_name} />
        </View>
        <View style={styles.field_item}>
          <Text style={styles.label}>Last Name*</Text>
          <Textfield style={styles.textfield}
                  onChangeText={(last_name) => SettingsController.setLastName(last_name)}
                  placeholder="Smith" 
                  value={this.state.info.last_name} />
        </View>
        <View style={styles.field_item}>
          <Text style={styles.label}>Primary Phone Number*</Text>
          <Textfield style={styles.textfield}
                  onChangeText={(phone_num) => SettingsController.setPhoneNum(phone_num)}
                  placeholder="XXX-XXX-XXXX" 
                  value={this.state.info.phone_num} />
        </View>
        <View style={styles.field_item}>
        	<Text style={styles.label}>Secondary Phone Number</Text>
          <Textfield style={styles.textfield}
                  onChangeText={(secondary_phone_num) => SettingsController.setSecondaryPhoneNum(secondary_phone_num)}
                  placeholder="XXX-XXX-XXXX" 
                  value={(this.state.info.secondary_phone_num.Valid) ? this.state.info.secondary_phone_num.String : this.state.info.secondary_phone_num} />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => SettingsController.saveData()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

module.exports = EditPersonalInformation;