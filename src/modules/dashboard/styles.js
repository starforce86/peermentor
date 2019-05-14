/**
 * Created by Alex on 12/8/15.
 */
 'use strict';

var React = require('react-native');
var {
		StyleSheet,
} = React;
var {bp, vw, vh} = require('react-native-relative-units')(100);

var styles = StyleSheet.create({
	container: {
    flex:1,
    width: vw * 100,
    height: vw * 100
  },
  row_layout: {
    flexDirection: 'row'
  },
  center: {
    alignItems: 'center'
  },
  row: {
    width: vw * 50
  },
  minimodule_holder: {
    backgroundColor: '#00C2E5',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  minimodule_label: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700'
  },
  minimodule_title: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    paddingTop: 20
  },
  minimodule_video_duration: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 5,
    lineHeight: 30
  },
  messages_holder: {
    backgroundColor: '#FF6200',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  message_count: {
    fontSize: 60,
    color: '#fff'
  },
  message_text: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20
  },
  avatar: {
    flex: 1,
    borderRadius: vh * 3,
    width: vw * 11,
    height: vh * 6,
    backgroundColor: '#4A4A4A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  message_initial: {
    color: '#fff',
    fontSize: vh * 3,
    fontWeight: '700',
    textAlign: 'center',
  },
  message_label: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700'
  },
  message_created_at: {
    color: '#fff',
    fontSize: 9
  },
  kb_holder: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  kb_text_label_grey: {
    fontSize: 10,
    color: '#000',
    opacity: 0.5,
    fontWeight: '700'
  },
  kb_title: {
    paddingTop: 20,
    fontSize: 17,
    color: '#4A4A4A',
    lineHeight: 23,
  },
  call_holder: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  call_text_label_grey: {
    fontSize: 10,
    color: '#000',
    opacity: 0.5,
    fontWeight: '700'
  },
  call_day: {
    paddingTop: 20,
    fontSize: 16,
    color: '#000',
    lineHeight: 23,
  },
  call_date: {
    fontSize: 16,
    color: '#000',
    lineHeight: 23,
  },
  call_time: {
    fontSize: 12,
    fontWeight: '300'
  },
  goal_holder: {
    backgroundColor: '#22C064',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  goal_label: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.7,
    fontWeight: '700'
  },
  goal_label_regular: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.7
  },
  goal_details: {
    paddingBottom: 10,
    fontSize: 15,
    color: '#fff',
    lineHeight: 20,
  },
  goal_count: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700'
  },
  goal_count_label: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '300',
    marginLeft: 5
  },
  goal_kb: {
    paddingTop: 20,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    color: '#fff'
  },
  questionnaire_holder: {
    backgroundColor: '#666666',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  questionnaire_alert_holder: {
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  questionnaire_alert_label: {
    color: '#FF8162',
    fontSize: 10,
    fontWeight: '700'
  },
  questionnaire_alert: {
    color: '#FF8162',
    fontSize: 12,
    lineHeight: 16
  },
  questionnaire_label: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.7,
    fontWeight: '700'
  },
  questionnaire_days_left: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20
  },
  divider: {
    height:2, borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#fff', marginTop:9, marginBottom: 10
  }
  
});

module.exports = styles;