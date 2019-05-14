/**
 * Created by Nikee on 12/31/15.
 */

 var React = require('react-native'); var { Alert } = React;

var localStorage = require("../../common/local_store");
var moment = require('moment-timezone');
var MentoringProgramDataResource = require("../../resources/mentoring-program-data");
var MentorDataResource = require("../../resources/mentor-data");
var Actions = require('react-native-router-flux').Actions;
var MentoringProgramFunctionsResource = require('../../resources/mentoring-program-functions');
var alertService = require("../../common/alert");
var CONFIG = require("../../../config.js");
var _ = require("underscore");
var UserManager = require("../../user/index");
var RescheduleConfirmationController = {

	view: null,
	menteeProfile: {},
	mentee: {
    profile: {},
  },
	baseId: null,
	mentorId: null,
  self: null,

  weeks: [],


	updateState() {
		this.view.setState({
			reschedule: this.reschedule,
      mentee: this.mentee
		});
	},

  showContinueButton() {
    this.view.setState({
      showContinue: true
    });
  },

	setView(view) {
		this.view = view;
    view.controller = this;
	},
  selectedTime: null,
	reschedule: {
    activeRequest: {},
    mentorTimezone: null,
    selectedTime: null,
	},
  note: "",

  setNote(text) {
    this.note = text;
  },

  rescheduleCall() {
    console.log(RescheduleConfirmationController.view.props.selectedDate+ ' '+ RescheduleConfirmationController.view.props.selectedTime);
    var formattedDateTime = '';
    formattedDateTime = RescheduleConfirmationController.view.props.selectedDate +" "+ moment(RescheduleConfirmationController.view.props.selectedTime, 'H:mm A').format('HH:mm:ss');  
    MentoringProgramFunctionsResource.rescheduleCallBlock(this.baseId, formattedDateTime, 0, this.note).then( (response) => {
        if(response) {
          Alert.alert("We've sent your requested date & time to the mentor. We'll let you know if this doesn't work for the mentor.");
          Actions.dashboard();
        }
    });
  },

  // ***************** Reschedule Functions ********************
  getActiveAndArchivedCallRequest() {
    var self = this;
      MentoringProgramDataResource.getMenteeActiveCallRequest(this.baseId).then((response) => {
        if(response) {
          if(response.active_request) {
            if(response.active_request.mentoring_program_node_id > 0) {
              self.reschedule.activeRequest = response.active_request;
            } else {
              self.reschedule.activeRequest = null;
            }
          }
        }
        self.updateState();
        
      });

  },
  initiate() {
      this.self = this;
      var self = this;
      this.getActiveAndArchivedCallRequest();

      localStorage.getData('selectedTime').then((value) => {
        self.reschedule.selectedTime = value;
      });

      localStorage.getData('selectedDate').then((value) => {
        self.reschedule.selectedDate = moment(value, "YYYY-MM-DD");
      }); 
  },
  momentFormat(datetime, format) {
      return moment(datetime).format(format);
  },
  // **********************************************************

  retrievingData() {
    var self = this;
    self.note = "";
    self.call_count = 1;

    localStorage.getData('MenteeProfile').then((value) => {
      if (value) {
        self.menteeProfile = JSON.parse(value);
        // Profile Initialize
        self.mentee = {profile: self.menteeProfile};
        self.baseId = self.mentee.profile.mentoring_program_base_id;
        self.mentorId = self.mentee.profile.mentor_id.Int64;
      } else {
        self.menteeProfile = null;
        self.mentee = {profile: self.menteeProfile};
      }
      self.call_count--;
      if (self.call_count == 0) {
        self.initFunction(); 
      }
    });

  },

  initFunction() {
      // this.reschedule.initiate();
      this.initiate();
  },

	init() {
		this.retrievingData();
	},

};

module.exports = RescheduleConfirmationController;