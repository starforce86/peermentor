/**
 * Created by Alex on 12/8/15.
 */

var React = require('react-native'); var { Alert } = React;
var localStorage = require("../common/local_store");
var moment = require('moment-timezone');
var MentoringProgramDataResource = require("../resources/mentoring-program-data");
var MentorDataResource = require("../resources/mentor-data");
var Actions = require('react-native-router-flux').Actions;
var MentoringProgramFunctionsResource = require('../resources/mentoring-program-functions');
var MenteeDataResource = require('../resources/mentee-data');
var alertService = require("../common/alert");
var CONFIG = require("../../config.js");
var UserManager = require("../user/index");

var RescheduleController = {

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

	setView(view) {
		this.view = view;
    this.retrievingData(view);
	},

	reschedule: {
    activeRequest: {},
    archivedRequest: {},
    mentorTimezone: null
	},

  updateState() {
    this.view.setState({
      reschedule: this.reschedule,
      mentee: this.mentee
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
      var self = this;
      RescheduleController.getActiveAndArchivedCallRequest();

      var menteeRescheduleNotification = new Firebase(CONFIG.FIREBASE.URL+'/mentee/' + UserManager.data.mentee_id + '/reschedule');
      // menteeRescheduleNotification.on
      menteeRescheduleNotification.once("value", (snapshot) => {
        if(!!snapshot.val()) {
          // this.reschedule.getActiveAndArchivedCallRequest();
          self.getActiveAndArchivedCallRequest();
          if(!self.once) {
            // Alert.alert('Your call has been rescheduled');
          } else self.once = false;
        }
      });    
  },
  momentFormat(datetime, format) {
      return moment(datetime).format(format);
  },
  dateDifference(selectedDate) {
      if(selectedDate) {
        return moment().to(selectedDate);
      }
  },
  acceptCallRequest() { // Accept original proposed request
      MentoringProgramFunctionsResource.rescheduleCallBlock(this.baseId, this.reschedule.activeRequest.scheduled_date_time.String, 1, this.reschedule.note).then((response) => {
        if(response) {
          alertService.generalAlert("PeerMentor", "Call rescheduled.");
          Actions.dashboard();
        }
      });
  },
  
  retrievingData() {
    var self = this;

    MenteeDataResource.getMenteeProfile(UserManager.data.mentee_id).then((response) => {
      if(response) {
        RescheduleController.mentee.profile = response;
        RescheduleController.baseId = self.mentee.profile.mentoring_program_base_id;
        RescheduleController.mentorId = self.mentee.profile.mentor_id.Int64;
        RescheduleController.initiate();
      }
    });
  },
  // Actions
  onAccept_Click() {
    this.acceptCallRequest();
  },

  onSuggestAnotherTime_Click() {
    Actions.rescheduleAnotherTime();
  },
};

module.exports = RescheduleController;