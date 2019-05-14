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
var MenteeDataResource = require("../../resources/mentee-data"); 
var UserManager = require('../../user/index');
var globalStyles=require('../../common/styles/styles.js');
var _ = require("underscore");

var styles = StyleSheet.create({
  container: {
    width: vw * 100,
    height: vh * 85,
    backgroundColor: '#f5fcff',
    flexDirection: 'column'
  },
  header: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center'
  },
  header_container: {
    width: vw * 100,
    flexDirection: 'row'
  },
  header_holder: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    height:15
  },
  day_header: {
    color: '#000',
    fontSize: 12,
    flex:1,
    width:35,
    textAlign: 'center'
  },
  time_holder: {
    width: vw * 10,
    marginTop: 14
  },
  timeslot_header: {
    height: 32,
  },
  timeslot: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: '#ededed',
    borderRightColor: '#ededed'
  },
  timeslot_text: {
    color: '#000',
    fontSize: 11,
    flex:1,
    textAlign: 'center',
    height: 15,
  },
  column_layout: {
    flex: 1,
    flexDirection: 'column'
  },
  flex: {
    flex: 1,
  },
  left_border: {
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderLeftColor: '#ededed'
  },
  selectable_slot_holder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});

var UpdateAvailabiliy = React.createClass({
  _getAvailability() {
    var self = this;
    MenteeDataResource.getMenteeAvailability(UserManager.data.mentee_id).then((response) => {
      if(response) {
        self.setState({
          selectedSlots: response
        });
      }
    });
  },
  getInitialState() {
    this._getAvailability();
    return {
      selectedSlots: {}
    };
  },
  _addOrRemoveTimeSlot(day, time) {
    if(!this.state.selectedSlots[day]) this.state.selectedSlots[day] = []
    var existingIndex = _.indexOf(this.state.selectedSlots[day], time);
    if(existingIndex == -1)  
      this.state.selectedSlots[day].push(time);
    else
      this.state.selectedSlots[day].splice(existingIndex, 1);
    this.setState({
      selectedSlots: this.state.selectedSlots
    })
  },
  _renderDayHeader() {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var headerArray = [];
    _(days).each((day, index) => {
        headerArray.push(<Text key={index} style={styles.day_header}>{day}</Text>);
    });
    return (headerArray);
  },
  _renderSelectableSlots(day) {
    var timeslots = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", 
              "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", 
              "6:00pm", "6:30pm", "7:00pm", "7:30pm", "8:00pm", "8:30pm", "9:00pm", "9:30pm", "10:00pm"];      
    var timeslotArray = [];
    _(timeslots).each((time, index) => {
        timeslotArray.push(<TouchableOpacity key={index} onPress={() => { this._addOrRemoveTimeSlot(day, time); }} style={[styles.timeslot, (_.indexOf(this.state.selectedSlots[day], time) != -1) ? {backgroundColor: '#22C064'} : {}]}><Text style={styles.timeslot_text}> </Text></TouchableOpacity>);
    });
    return (timeslotArray); 
  },
  _renderTimeSlots() {
    var timeslots = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm"];
    var timeslotArray = [];
    _(timeslots).each((time) => {
        timeslotArray.push(<View key={time} style={styles.timeslot_header}><Text style={styles.timeslot_text}>{time}</Text></View>);
    });
    return (timeslotArray);          
  },
  render() {
    return (
      <ScrollView style={[styles.container, globalStyles.container]}>
        <View style={styles.header_container}>
          <View style={styles.time_holder}>
            {this._renderTimeSlots()}
          </View>
          <View style={styles.column_layout}>
            <View style={styles.header_holder}>
              {this._renderDayHeader()}
            </View>
            <View style={styles.selectable_slot_holder}>
              <View style={[styles.flex, styles.left_border]}>
                {this._renderSelectableSlots('0')}
              </View>
              <View style={styles.flex}>
                {this._renderSelectableSlots('1')}
              </View>
              <View style={styles.flex}>
                {this._renderSelectableSlots('2')}
              </View>
              <View style={styles.flex}>
                {this._renderSelectableSlots('3')}
              </View>
              <View style={styles.flex}>
                {this._renderSelectableSlots('4')}
              </View>
              <View style={styles.flex}>
                {this._renderSelectableSlots('5')}
              </View>
              <View style={styles.flex}>
                {this._renderSelectableSlots('6')}
              </View>
            </View>
          </View>
        </View>
        <View>
            <TouchableOpacity style={globalStyles.primary_button}
            onPress={()=> { SettingsController.saveAvailability(this.state.selectedSlots); }}>
            <Image source={require('../../../../assets/images/check.png')} style={globalStyles.check_img}>
                </Image>
            </TouchableOpacity>  
        </View>
      </ScrollView>
    );
  }
});

module.exports = UpdateAvailabiliy;