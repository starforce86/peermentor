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
var RescheduleAnotherDateController = {

	view: null,
	once: true,
	day: null,
	menteeProfile: {},
	mentee: {
    profile: {},
  },
	baseId: null,
	mentorId: null,
  self: null,

  sevenDays: [],
  selectedDate: null,
  isDateSelected: false,

	updateState() {
		this.view.setState({
			reschedule: this.reschedule,
      mentee: this.mentee
		});
	},

	setView(view) {
		this.view = view;
    view.controller = this;
	},
	reschedule: {
    activeRequest: {},
    archivedRequest: {},
    mentorTimezone: null,
    selectedTime: null,
    sevenDays: []
	},

  setSelectedDate(date) {
    this.isDateSelected = true;
    RescheduleAnotherDateController.selectedDate = moment(date).format("YYYY-MM-DD");
    MentorDataResource.getMentorAvailability(this.mentorId, UserManager.data.mentee_id, this.selectedDate).then((response) => {
        if(response) {
          RescheduleAnotherDateController.sevenDays = _.values(response);
          var firstObjectDate = '';
          _(response).every(function(elem){
            firstObjectDate = elem[0].parent_date;
            return false;
          });
          if(firstObjectDate != moment(date).format("YYYY-MM-DD"))
            RescheduleAnotherDateController.sevenDays = [];
          RescheduleAnotherDateController.sevenDays = RescheduleAnotherDateController.sevenDays[0];
        }
    });
  },

  timeSelectionView() {
    if(this.isDateSelected) {
      if(!RescheduleAnotherDateController.sevenDays) {
        Alert.alert('No times are available on this date. Please select another date.');
      } else {
        Actions.rescheduleAnotherTime({timeslots: RescheduleAnotherDateController.sevenDays, selectedDate: RescheduleAnotherDateController.selectedDate});
      }
    } else {
      Alert.alert('Please select a date.');
    }
  },

  // ***************** Reschedule Functions ********************
  getActiveAndArchivedCallRequest() {
    var self = this;
      MentoringProgramDataResource.getMenteeActiveCallRequest(this.baseId).then((response) => {
        if(response) {
          if(response.active_request) {
            if(response.active_request.mentoring_program_node_id > 0) {
              self.reschedule.activeRequest = response.active_request;
              if(response.archived_request) {
                if(response.archived_request.status.Valid) {
                  self.reschedule.archivedRequest = response.archived_request;
                } else {
                  self.reschedule.archivedRequest = null;
                }
              }
            } else {
              self.reschedule.activeRequest = null;
              self.reschedule.archivedRequest = null;
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

module.exports = RescheduleAnotherDateController;