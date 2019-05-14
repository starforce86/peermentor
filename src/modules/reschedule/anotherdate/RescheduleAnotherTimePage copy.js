/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var {
		StyleSheet,
		View,
		Image,
		Text,
		TextInput,
		LayoutAnimation,
		RecyclerViewBackedScrollView,
		TouchableOpacity
} = React;

var { Icon, } = require('react-native-icons');
var RescheduleController = require('../RescheduleController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../../common/styles/styles.js');
var styles=require('./styles.js');
const MK = require('react-native-material-kit');
const {
  MKRipple,
} = MK;


var RescheduleAnotherTimePage = React.createClass({
	controller: null,

	componentWillMount: function() {
	    // LayoutAnimation.spring();
  	},
	getInitialState: function() {
		RescheduleController.setView(this);
		RescheduleController.init();
		return {
			reschedule: RescheduleController.reschedule,
			mentee: RescheduleController.mentee,
			weeks: RescheduleController.weeks,
			todaysDate: RescheduleController.todaysDate,
			currentMonth: RescheduleController.currentMonth,
      		thisMonth: RescheduleController.thisMonth,
		}
	},

	onTestButtonClick: function () {
		// this.state.isShow = !this.state.isShow;
		// this.state.test.isShow = !this.state.test.isShow;
		// this.setState({test: {
		// 	isShow: !this.state.test.isShow
		// }});
	},

	render: function() {

		var date_time_image;
		date_time_image = (
			<View style={[styles.date_image, {}]}>
				<Text style={styles.month}> {RescheduleController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "MMMM")} </Text>
				<Text style={styles.day}> {RescheduleController.momentFormat(this.state.reschedule.activeRequest.scheduled_date_time, "D")} </Text>
			</View>
		);

		var schedule_datetime_original;
		schedule_datetime_original = (
			<View style={styles.schedule_datetime}>
				{date_time_image}
				<View style={[styles.datetime_text, {}]}>
					<Text style={styles.label}> original time </Text>
					<View style={styles.value_parent}> 
						<Text style={styles.value_bold} key={"date_time_bold"}>
							{RescheduleController.momentFormat(RescheduleController.reschedule.activeRequest.scheduled_date_time, "ddd, MMM D, YYYY")}
						</Text>
						<Text style={styles.value_text} key={"date_time_text"}>
							{RescheduleController.momentFormat(RescheduleController.reschedule.activeRequest.scheduled_date_time, " h:mm A")+ ' ' + (RescheduleController.reschedule.activeRequest.timezone ? RescheduleController.reschedule.activeRequest.timezone : '')}
						</Text>
					</View>
				</View>
			</View>
		);

		var widget_body;
		var direction_text = (
			<View style={styles.direct_view}>
				<Text style={styles.direct_text}> Tap to select a date and time that works best for you... </Text>
			</View>
		);

		var toggleMonthlyView;
		var sevenDaysDateSelection, sevenDaySlotSelection;
		// ** Next 7 Days Views
		// *Day Date Selection* //
		if (this.state.reschedule.sevenDays) {
			var keys = Object.keys(this.state.reschedule.sevenDays);
			var self = this;
			sevenDaysDateSelection = [];
			for (var i = 0; i < keys.length; i++) {
				var date = keys[i];
				var timeSlots = self.state.reschedule.sevenDays[date];
				
				sevenDaysDateSelection.push(
					(<View key={"sevenDayDateSelection_parent" + i}>
						<TouchableOpacity style={[styles.holder, 
							i == keys.length - 1 ? styles.holder_lastChild : {},
							i == 0 ? styles.holder_firstChild : {}, timeSlots[0].selected ? styles.holder_selected : {}]} 
							onPress={RescheduleController.toggleDate.bind(self.controller, null, 'sevenDaysDateSelection', 'selected', i, timeSlots[0].parent_date)}
							key={"sevenDayDateSelection" + i}>
							<Text style={[styles.primary_date, timeSlots[0].selected ? styles.date_selected : {}]}>
								{RescheduleController.momentFormat(timeSlots[0].parent_date, "D")}
							</Text>
							<Text style={[styles.weekday, timeSlots[0].selected ? styles.weekday_selected : {}]}>
								{RescheduleController.momentFormat(timeSlots[0].parent_date, "ddd")}
							</Text>
						</TouchableOpacity>
						<View style={timeSlots[0].selected ? styles.holder_selected_border : {}} />
					</View>
					));
			}
				
		}
		
		//  *Day Slot Selection* //
		if (this.state.reschedule.sevenDays) {
			var keys = Object.keys(this.state.reschedule.sevenDays);
			var self = this;
			sevenDaySlotSelection = [];
			for (var i = 0; i < keys.length; i++) {
				var date = keys[i];
				var timeSlots = self.state.reschedule.sevenDays[date];
				var row = [];
				if (this.state.reschedule.currentDateSlotsView == i && this.state.reschedule.showSlotsOnLoad == true) {
					// var slotKeys = Object.keys(timeSlots);
					for (var j = 0; j < timeSlots.length; j++) {
						var timeSlot = timeSlots[j];
						row.push(
							(<TouchableOpacity style={[styles.time_slot_start_time, timeSlot.itemSelected ? styles.time_slot_selected : {}]}
								onPress={RescheduleController.toggleDate.bind(self.controller, null, 'sevenDaySlotSelection', 'selected', i, timeSlot)}
								key={"sevenDaySlotSelection_touch" + j}>
								<Text style={styles.time_slot_start_text}>
								{timeSlot.slot_starttime}
								</Text>
							</TouchableOpacity>)
							);
					}
				} 
				sevenDaySlotSelection.push(
					(<View style={styles.time_slots} key={"sevenDaySlotSelection_item" + i}>
						{row}
					</View>)
				);
			}
		}

		if (this.state.reschedule.toggleMonthlyView == false) {
			toggleMonthlyView = (
				<View style={styles.toggleMonthlyView}>
					<View style={styles.calendar_dates}>
						{sevenDaysDateSelection}
					</View>
					{sevenDaySlotSelection}
				</View>
			);
		}
		var date_period_seven = (
			<View stye={styles.date_period}>
				<TouchableOpacity onPress={()=>RescheduleController.toggleViewAndScroll('seven')}>
					<Text style={styles.seven} > 
						NEXT 7 DAYS
					</Text>
				</TouchableOpacity>
				{toggleMonthlyView}
			</View>
		)

		var date_period_month;
		var simple_month_calendar;

		var cal_header = {};
		var cal_body;
		var cal_bottom;

		if (RescheduleController.currentMonth != RescheduleController.thisMonth) {
			cal_header.left_button = (
				<TouchableOpacity style={styles.cal_header_left}
					onPress={()=>RescheduleController.previous()}>
					<Image  source={require('../../../../assets/images/icons/left_arrow.png')}
	                style={styles.cal_header_image} />
				</TouchableOpacity>
			);
		}

		cal_header.right_button = (
			<TouchableOpacity style={styles.cal_header_right}
				onPress={()=>RescheduleController.next()}>
				<Image  source={require('../../../../assets/images/icons/right_arrow.png')}
                style={styles.cal_header_image} />
			</TouchableOpacity>
		);

		cal_header.body = (
			<View style={styles.cal_header}>
				{cal_header.left_button}
				<Text style={styles.cal_title}> {RescheduleController.month ? RescheduleController.month.format("MMMM, YYYY") : ""} </Text>
				{cal_header.right_button}
			</View>
		)

		// Calendar Weekname
		var week_names = (
			<View style={styles.week_names}>
				<Text style={styles.week_day}>Sun</Text>
				<Text style={styles.week_day}>Mon</Text>
				<Text style={styles.week_day}>Tue</Text>
				<Text style={styles.week_day}>Wed</Text>
				<Text style={styles.week_day}>Thu</Text>
				<Text style={styles.week_day}>Fri</Text>
				<Text style={styles.week_day}>Sat</Text>
			</View>
		)
		// Calendar Month Body
		var cal_month = [];
		for (var i = 0; i < this.state.weeks.length; i++) {
			var row = [];
			var week = this.state.weeks[i];
			for (var j = 0; j < week.days.length; j++) {
				var day = week.days[j];
				row.push(
					<TouchableOpacity key={"month_cell_" + i + j} 
							style={[styles.cal_month_cell, 
							day.weekend ? styles.cell_weekend : 
							day.isToday ? styles.cell_today : 
							!day.isCurrentMonth ? styles.cell_different_month :
							day.number < this.state.todaysDate && this.state.currentMonth == this.state.thisMonth && day.isCurrentMonth ? styles.cell_passed_date : {},
							day.isSelected ? styles.cell_selected : {},
							j == 0 ? styles.cal_cell_first_cell : j == week.days.length - 1 ? styles.cal_cell_last_cell : {},
							i == this.state.weeks.length - 1 ? styles.week_cell_last : {}]}
							onPress={RescheduleController.select.bind(self.controller, day)}>
						<Text 
							style={[styles.call_month_cell_text,
							day.isToday ? styles.cell_text_today : 
							!day.isCurrentMonth ? styles.cell_text_different_month : {},
							day.isSelected ? styles.cell_text_selected : {}]}>
							{day.number}
						</Text>
					</TouchableOpacity>
				);
			}
			var one_row_view = (
				<View style={styles.cal_month_row}
					  key={"month_row_" + i}>
					{row}
				</View>
			)

			cal_month.push(one_row_view);
		}

		cal_body = (
			<View style={styles.cal_body}>
				{week_names}
				{cal_month}
			</View>
		)

		// Bottom Areas
		//console.log("****SevenDays****=", this.state.reschedule.sevenDays);
		var bottom_views = [];
		if (this.state.reschedule.sevenDays) {
			var keys = Object.keys(this.state.reschedule.sevenDays);
			var self = this;
			bottom_views = [];
			for (var i = 0; i < keys.length; i++) {
				var date = keys[i];
				var timeSlots = self.state.reschedule.sevenDays[date];
				var row = [];
				if (this.state.reschedule.currentDateSlotsView2 == i) {
					// var slotKeys = Object.keys(timeSlots);
					for (var j = 0; j < timeSlots.length; j++) {
						var timeSlot = timeSlots[j];
						row.push(
							(<TouchableOpacity style={[styles.time_slot_start_time, timeSlot.itemSelected ? styles.time_slot_selected : {}]}
								onPress={RescheduleController.toggleDate.bind(self.controller, null, 'monthlyDaySlotSelection', 'selected', i, timeSlot)}
								key={"cal_bottom_touch" + j}>
								<Text style={styles.time_slot_start_text}>
								{timeSlot.slot_starttime}
								</Text>
							</TouchableOpacity>)
							);
					}
				} 
				//console.log("[", + i + "]Row=", row);
				bottom_views.push(
					(<View style={styles.time_slots} key={"cal_bottom_item" + i}>
						{row}
					</View>)
				);
			}
		}

		cal_bottom = (
			<View style={styles.cal_bottom}>
				{bottom_views}
			</View>
		)

		if (this.state.reschedule.toggleMonthlyView) {
			simple_month_calendar = (
				<View style={styles.cal_main}>
					{cal_header.body}
					{cal_body}
					{cal_bottom}
				</View>
			)
		}
		
		date_period_month = (
			<View stye={styles.date_period}>
				<TouchableOpacity onPress={()=>RescheduleController.toggleViewAndScroll('month')}>
					<Text style={styles.seven} > 
						BY MONTH
					</Text>
				</TouchableOpacity>
				{simple_month_calendar}
			</View>	
		)



		return (
			<View style={[styles.container, globalStyles.container]}>
				{schedule_datetime_original}
				<View style={styles.widget_body}>
					{direction_text}
					{date_period_seven}	
					{date_period_month}
				</View>
				
		    </View>
		);

	}
});


module.exports = RescheduleAnotherTimePage;