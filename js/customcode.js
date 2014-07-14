var timerList = {};

$( document ).ready(function() {
	console.log(localStorage.length);
	
	$("h1.glyphicon").tooltip()
	$("h2.glyphicon").tooltip()

	adjustDateSelectors();
	
	checkIntervalInput();
	checkWeeklyInput();
	checkDateInput();
	checkDateInput();
	checkDateToggle();
	checkTimedToggle();
	
	refreshList();
});

/* ADD TASK ASTHETICS */
$("#repeat-input").change( function() {
	checkIntervalInput();
	checkDateInput();
	checkWeeklyInput();
})

function checkIntervalInput() {
	curr = $("#repeat-input").val();
	if (curr == "Every...") {
		showIntervalInput();
	} else {
		hideIntervalInput();
	}
}

function showIntervalInput() {
	$("#interval-input").prop("disabled", false);
	$("#interval-type-input").prop("disabled", false);
	
	/*$("#interval-input").removeClass("invisible");
	$("#interval-input-label").removeClass("invisible");
	$("#interval-type-input").removeClass("invisible");*/
}

function hideIntervalInput() {
	$("#interval-input").prop("disabled", true);
	$("#interval-type-input").prop("disabled", true);
	
	/*$("#interval-input").removeClass("invisible");
	$("#interval-input-label").removeClass("invisible");
	$("#interval-type-input").removeClass("invisible");
	$("#interval-input").addClass("invisible");
	$("#interval-input-label").addClass("invisible");
	$("#interval-type-input").addClass("invisible");*/
	
	$("#interval-input").closest(".form-group").removeClass("has-success");
	$("#interval-input").closest(".form-group").removeClass("has-warning");
	$("#interval-input").closest(".form-group").removeClass("has-error");
}

function checkWeeklyInput() {
	curr = $("#repeat-input").val();
	if (curr == "Weekly") {
		showWeeklyInput();
	} else {
		hideWeeklyInput();
	}
}

function showWeeklyInput() {
	$("#weekly-input .btn").prop("disabled", false);
}

function hideWeeklyInput() {
	$("#weekly-input .btn").prop("disabled", true);
	
	$("#weekly-input .btn").closest(".form-group").removeClass("has-success");
	$("#weekly-input .btn").closest(".form-group").removeClass("has-warning");
	$("#weekly-input .btn").closest(".form-group").removeClass("has-error");
}

$("#timed-toggle").click( function() {
	checkTimedToggle();
})

function checkTimedToggle() {

	if ( $("#timed-toggle").html() == "Untimed" ) {
		$("#timed-toggle").html("Timed");
		showTimedInput();
	} else {
		$("#timed-toggle").html("Untimed");
		hideTimedInput();
	}
}

function showTimedInput() {
	$("#hours-input").prop("disabled", false);
	$("#minutes-input").prop("disabled", false);
	
	$("#hours-input-label").removeClass("text-muted");
	$("#minutes-input-label").removeClass("text-muted");

	/*$("#hours-input").removeClass("invisible");
	$("#hours-input-label").removeClass("invisible");
	$("#minutes-input").removeClass("invisible");
	$("#minutes-input-label").removeClass("invisible");*/
}

function hideTimedInput() {
	$("#hours-input").prop("disabled", true);
	$("#minutes-input").prop("disabled", true);

	$("#hours-input-label").removeClass("text-muted");
	$("#minutes-input-label").removeClass("text-muted");
	
	$("#hours-input-label").addClass("text-muted");
	$("#minutes-input-label").addClass("text-muted");
	
	/*$("#hours-input").removeClass("invisible");
	$("#hours-input-label").removeClass("invisible");
	$("#minutes-input").removeClass("invisible");
	$("#minutes-input-label").removeClass("invisible");
	
	$("#hours-input").addClass("invisible");
	$("#hours-input-label").addClass("invisible");
	$("#minutes-input").addClass("invisible");
	$("#minutes-input-label").addClass("invisible");*/
	
	$("#hours-input").closest(".form-group").removeClass("has-success");
	$("#hours-input").closest(".form-group").removeClass("has-warning");
	$("#hours-input").closest(".form-group").removeClass("has-error");
}

$("#date-end-toggle").click( function() {
	checkDateToggle();
})

function checkDateInput() {
	curr = $("#repeat-input").val();
	if (curr != "Never") {
		switchMode("End Date");
	} else {
		switchMode("Due Date");
	}
}

function checkDateToggle() {
	if ( $("#date-end-toggle").html() == "Disabled" ) {
		$("#date-end-toggle").html("Enabled");
		showDateInput();
	} else {
		$("#date-end-toggle").html("Disabled");
		hideDateInput();
	}
}

function switchMode(text) {
	$("#date-input-label").html(text);
}

function showDateInput() {
	$("#month-input").prop("disabled", false);
	$("#day-input").prop("disabled", false);
	$("#year-input").prop("disabled", false);

	/*$("#month-input").removeClass("invisible");
	$("#day-input").removeClass("invisible");
	$("#year-input").removeClass("invisible");*/
 }

function hideDateInput() {
	$("#month-input").prop("disabled", true);
	$("#day-input").prop("disabled", true);
	$("#year-input").prop("disabled", true);

	/*$("#month-input").removeClass("invisible");
	$("#day-input").removeClass("invisible");
	$("#year-input").removeClass("invisible");
	
	$("#month-input").addClass("invisible");
	$("#day-input").addClass("invisible");
	$("#year-input").addClass("invisible");*/
	
	$("#date-input").closest(".form-group").removeClass("has-success");
	$("#date-input").closest(".form-group").removeClass("has-warning");
	$("#date-input").closest(".form-group").removeClass("has-error");
}

$("#month-input").change( function() {
	setAvailableDays( "#day-input", $("#month-input option:selected").index() );
})

$("#start-month-input").change( function() {
	setAvailableDays( "#start-day-input", $("#start-month-input option:selected").index() );
})

/* DATE HANDLING */

function adjustDateSelectors() {
	adjustStartDateSelectors();
	adjustEndDateSelectors();
}

function adjustStartDateSelectors() {
	today = new Date();
	
	populateYears("#start-year-input", today.getFullYear(), 1, 9 );
	setStartDate(today);
}

function adjustEndDateSelectors() {
	today = new Date();
	
	populateYears("#year-input", today.getFullYear(), 1, 9 );
	setDate(today);
}

function populateYears(id, year, lowerBuffer, higherBuffer) {
	var resetVal = $(id).val();

	$(id + " option").remove();
	for (var i = year-lowerBuffer; i <= year+higherBuffer; i++) {
   		$(id).append( $("<option></option>")
                    .attr("value", i)
                    .text(i)
                    .html(i) );
	};
}

function setAvailableDays(id, month, year) {
	var resetVal = $(id).val();
	
	//February
	if (month == 1) {
		if (year % 4 == 0 || (year%100 == 0 && year%400 == 0) ) {
			var max = 29;
		} else {
			var max = 28;
		}
	//30 Days	
	} else if (month == 8 || month == 3 || month == 5 || month == 10) {
		var max = 30;
	//31 Days
	} else {
		var max = 31;
	}
	
	$(id + " option").remove();
	for (var i = 1; i <= max; i++) {
   		$(id).append( $("<option></option>")
                    .attr("value", i)
                    .text(i)
                    .html(i) );
	};
	
	if (resetVal <= max) {
		$(id).val(resetVal);
	}
}

function setDate(date) {
	
	day = date.getDate()+"";
	month = date.getMonth();
	year = date.getFullYear();
	
	setAvailableDays( "#day-input", month, year );
	
	$("#day-input").val(day);
	$('#month-input option').eq(month).prop('selected', true);
	$('#year-input').val(year);
}

function setStartDate(date) {
	
	day = date.getDate()+"";
	month = date.getMonth();
	year = date.getFullYear();
	
	setAvailableDays( "#start-day-input", month, year );
	
	$("#start-day-input").val(day);
	$('#start-month-input option').eq(month).prop('selected', true);
	$('#start-year-input').val(year);
}

/* ADD TASK FORM SUBMISSION HANDLING */
$("#add-task-submit").click(function( event ) {
	event.preventDefault();
	submitAddForm(false);
});

$("#add-task-confirm").click(function( event ) {
	event.preventDefault();
	submitAddForm(true);
});

$("#add-task-cancel").click(function( event ) {
	event.preventDefault();
	changeButtonColor();
});

function submitAddForm(override) {
	var success = 2;
		
	success = validate()
	
	if (success == 2 || (success == 1 && override)) {
		addTask();
		resetAddForm();
	} else if (success == 1) {
		addConfirm();
	} else {
		errorAttention();
	}
}

function addConfirm() {
	$("#add-task-submit").closest(".form-group").removeClass("hidden");
	$("#add-task-submit").closest(".form-group").addClass("hidden");
	$("#add-task-confirm").closest(".form-group").removeClass("hidden");
}

function errorAttention() {
	 $(".has-error").animate({ boxShadow : "0 0 5px 3px rgba(100,100,200,0.4)" }); 
}

function addTask() {
		
	//Create JSON object containing all info
	var newDaily = { "descriptionInput":$("#description-input").val(),
			"repeatInput":$("#repeat-input").val(),
			"intervalInput":$("#interval-input").val(),
			"intervalTypeInput":$("#interval-type-input").val(),
			"weeklyToggles":[ {"monday":$("#monday-toggle").hasClass("active"),
			                   "tuesday":$("#tuesday-toggle").hasClass("active"),
			                   "wednesday":$("#wednesday-toggle").hasClass("active"),
			                   "thursday":$("#thursday-toggle").hasClass("active"),
			                   "friday":$("#friday-toggle").hasClass("active"),
			                   "saturday":$("#saturday-toggle").hasClass("active"),
			                   "sunday":$("sunday-toggle").hasClass("active")} ],
			 "startMonthInput":$("#start-month-input").val(),
			 "startDayInput":$("#start-day-input").val(),
			 "startYearInput":$("#start-year-input").val(),
			 "monthInput":$("#month-input").val(),
			 "dayInput":$("#day-input").val(),
			 "yearInput":$("#year-input").val(),
			 "endDateToggle":$("#date-end-toggle").hasClass("active"),
			 "endMonthInput":$("#end-month-input").val(),
			 "endDayInput":$("#end-day-input").val(),
			 "endYearInput":$("#end-year-input").val(),
			 "repeatTypeInput":$("#repeat-type-input").val(),
			 "timedToggle":$("#timed-toggle").hasClass("active"),
			 "hoursInput":$("#hours-input").val(),
			 "minutesInput":$("#minutes-input").val(),
			 "lastCompleted":null }
	
	//Add to local storage
	var counter = 0;
	console.log(localStorage[0]);
	while (localStorage.getItem("daily" + counter) !== null) {
		counter += 1;
	}
	
	localStorage["daily" + counter] = JSON.stringify(newDaily);
	
	newListItem(newDaily, "daily" + counter);
}

/* Data validation */

//focus out checks for text boxes
$("#description-input").focusout( function() {
	validateDescriptionInput();
	changeButtonColor();
});

$("#interval-input").focusout( function() {
	validateIntervalInput();
	changeButtonColor();
});

$("#hours-input").focusout( function() {
	validateTimerInput();
	changeButtonColor();
});

$("#minutes-input").focusout( function() {
	validateTimerInput();
	changeButtonColor();
});

//change checks for all dropdowns
$("#repeat-input").change( function() {
	validateIntervalInput();
	changeButtonColor();
});

$("#month-input").change( function() {
	validateDateInput();
	validateStartDateInput();
	changeButtonColor();
});

$("#day-input").change( function() {
	validateDateInput();
	validateStartDateInput();
	changeButtonColor();
});

$("#year-input").change( function() {
	validateDateInput();
	validateStartDateInput();
	changeButtonColor();
});

$("#start-month-input").change( function() {
	validateStartDateInput();
	validateDateInput();
	changeButtonColor();
});

$("#start-day-input").change( function() {
	validateStartDateInput();
	validateDateInput();
	changeButtonColor();
});

$("#start-year-input").change( function() {
	validateStartDateInput();
	validateDateInput();
	changeButtonColor();
});

$("#repeat-type-input").change( function() {
	validateRepeatTypeInput();
	changeButtonColor();
});

//onclick checks for all buttons
$("#date-end-toggle").click( function() {
	validateDateInput();
	changeButtonColor();
});

$("#timed-toggle").click( function() {
	validateTimerInput();
	changeButtonColor();
});

$("#weekly-input .btn").click( function() {
	validateWeeklyInput(this);
	changeButtonColor();
});

function validate() {
	var s = 2;
	
	s = Math.min(validateDescriptionInput(), s);
	s = Math.min(validateIntervalInput(), s);
	s = Math.min(validateDateInput(), s);
	s = Math.min(validateStartDateInput(), s);
	s = Math.min(validateTimerInput(), s);
	s = Math.min(validateRepeatTypeInput(), s);
	s = Math.min(validateWeeklyInput(), s);
	
	changeButtonColor();
	
	return s;
}

function changeButtonColor() {
	$("#add-task-submit").removeClass("btn-success");
	$("#add-task-submit").removeClass("btn-warning");
	$("#add-task-submit").removeClass("btn-danger");
	
	$("#add-task-confirm").closest(".form-group").removeClass("hidden");
	$("#add-task-confirm").closest(".form-group").addClass("hidden");
	$("#add-task-submit").closest(".form-group").removeClass("hidden");
	//$("#add-task-submit").prop("disabled", false);
	
	if ($("#add-task .form-group").closest(".form-group").hasClass("has-error")) {
		$("#add-task-submit").addClass("btn-danger");
		//$("#add-task-submit").prop("disabled", true);
	} else if ($("#add-task .form-group").hasClass("has-warning")) {
		$("#add-task-submit").addClass("btn-warning");
	} else {
		$("#add-task-submit").addClass("btn-success");
	}
}

function validateDescriptionInput() {
	$("#description-input").closest(".form-group").removeClass("has-success");
	$("#description-input").closest(".form-group").removeClass("has-warning");
	$("#description-input").closest(".form-group").removeClass("has-error");
	
	if ($("#description-input").val() == "") {
		$("#description-input").closest(".form-group").addClass("has-error");
		return 0;
	} else if (1 == 0) {	//maybe check if same as existing item
		$("#description-input").closest(".form-group").addClass("has-warning");
		return 1;
	} else {
		$("#description-input").closest(".form-group").addClass("has-success");
	}
	
	return 2;
}

function validateIntervalInput() {
	$("#interval-input").closest(".form-group").removeClass("has-success");
	$("#interval-input").closest(".form-group").removeClass("has-warning");
	$("#interval-input").closest(".form-group").removeClass("has-error");
	
	if($("#repeat-input").val() == "Every...") {
		if ($("#interval-input").val() == "" || isNaN($("#interval-input").val()) ) {
			$("#interval-input").closest(".form-group").addClass("has-error");
			return 0;
		} else {
			$("#interval-input").closest(".form-group").addClass("has-success");
		}
	} else {
		$("#interval-input").closest(".form-group").addClass("has-success");
	}
		
	return 2;
}

function validateDateInput() {
	$("#date-input").closest(".form-group").removeClass("has-success");
	$("#date-input").closest(".form-group").removeClass("has-warning");
	$("#date-input").closest(".form-group").removeClass("has-error");

	
	//Check if date is before today and issue warning
	if($("#date-end-toggle").html() == "Enabled") {
			
		today = new Date();
		if ($("#year-input").val() < today.getFullYear()) {
			$("#year-input").closest(".form-group").addClass("has-warning");
			return 1;
		} else if ($("#year-input").val() == today.getFullYear()) {
			if ($("#month-input")[0].selectedIndex < today.getMonth()) {
				$("#month-input").closest(".form-group").addClass("has-warning");
				return 1;
			} else if ($("#month-input")[0].selectedIndex == today.getMonth()) {
				if ($("#day-input").val() < (today.getDay()+1)) {
					$("#day-input").closest(".form-group").addClass("has-warning");
					return 1;
				} else {
					$("#day-input").closest(".form-group").addClass("has-success");
				}
			} else {
				$("#month-input").closest(".form-group").addClass("has-success");
			}
		} else {
			$("#year-input").closest(".form-group").addClass("has-success");
		}
		
		//Check if end date is before start date
		if ($("#year-input").val() < $("#start-year-input").val()) {
			$("#year-input").closest(".form-group").addClass("has-warning");
			$("#start-year-input").closest(".form-group").removeClass("has-warning");
			$("#start-year-input").closest(".form-group").addClass("has-warning");
			return 1;
		} else if ($("#year-input").val() == $("#start-year-input").val()) {
			if ($("#month-input")[0].selectedIndex < $("#start-month-input")[0].selectedIndex) {
				$("#month-input").closest(".form-group").addClass("has-warning");
				$("#start-month-input").closest(".form-group").removeClass("has-warning");
				$("#start-month-input").closest(".form-group").addClass("has-warning");
				return 1;
			} else if ($("#month-input")[0].selectedIndex == $("#start-month-input")[0].selectedIndex) {
				if ($("#day-input").val() < $("#start-day-input").val()) {
					$("#day-input").closest(".form-group").addClass("has-warning");
					$("#start-day-input").closest(".form-group").removeClass("has-warning");
					$("#start-day-input").closest(".form-group").addClass("has-warning");
					return 1;
				} else {
					$("#day-input").closest(".form-group").addClass("has-success");
				}
			} else {
				$("#month-input").closest(".form-group").addClass("has-success");
			}
		} else {
			$("#year-input").closest(".form-group").addClass("has-success");
		}
	} else {
		$("#date-input").closest(".form-group").addClass("has-success");
	}
		
	return 2;
}

function validateStartDateInput() {
	$("#start-date-input").closest(".form-group").removeClass("has-success");
	$("#start-date-input").closest(".form-group").removeClass("has-warning");
	$("#start-date-input").closest(".form-group").removeClass("has-error");

	if ($("#year-input").val() < $("#start-year-input").val()) {
		$("#start-year-input").closest(".form-group").removeClass("has-warning");
		$("#start-year-input").closest(".form-group").addClass("has-warning");
		return 1;
	} else if ($("#year-input").val() == $("#start-year-input").val()) {
		if ($("#month-input")[0].selectedIndex < $("#start-month-input")[0].selectedIndex) {
			$("#start-month-input").closest(".form-group").removeClass("has-warning");
			$("#start-month-input").closest(".form-group").addClass("has-warning");
			return 1;
		} else if ($("#month-input")[0].selectedIndex == $("#start-month-input")[0].selectedIndex) {
			if ($("#day-input").val() < $("#start-day-input").val()) {
				$("#start-day-input").closest(".form-group").removeClass("has-warning");
				$("#start-day-input").closest(".form-group").addClass("has-warning");
				return 1;
			} else {
				$("#start-day-input").closest(".form-group").addClass("has-success");
			}
		} else {
			$("#start-month-input").closest(".form-group").addClass("has-success");
		}
	} else {
		$("#start-year-input").closest(".form-group").addClass("has-success");
	}
		
	return 2;
}

function validateWeeklyInput(btn) {
	$("#weekly-input").closest(".form-group").removeClass("has-success");
	$("#weekly-input").closest(".form-group").removeClass("has-warning");
	$("#weekly-input").closest(".form-group").removeClass("has-error");
	
	// Checks for 1) the number of elements currently active/inactive
	// and 2) what the clicked button is getting switched to
	// Must be done this way because JQuery's method to add the active
	// class is getting called after this one, resulting in a weird bug
	// where the error classes would get updated based on the pre-click
	// state
	if (  ($("#weekly-input .active").length == 1)
      	  && ($(btn).hasClass("active")) ) {
		$("#weekly-input").closest(".form-group").addClass("has-error");
		return 0;
	} else if (  $("#weekly-input .active").length == 6 
				 && !($(btn).hasClass("active")) ) {
		$("#weekly-input").closest(".form-group").addClass("has-warning");
		return 1;
	} else {
		$("#weekly-input").closest(".form-group").addClass("has-success");
	}
	
	return 2;
}

function validateRepeatTypeInput() {
	$("#repeat-type-input").closest(".form-group").removeClass("has-success");
	$("#repeat-type-input").closest(".form-group").addClass("has-success");
	return 2;
}

function validateTimerInput() {
	$("#hours-input").closest(".form-group").removeClass("has-success");
	$("#hours-input").closest(".form-group").removeClass("has-warning");
	$("#hours-input").closest(".form-group").removeClass("has-error");
	
	if($("#timed-toggle").html() == "Timed") {
		if ( (($("#hours-input").val() == "") && ($("#minutes-input").val() == "")) 
		   || ( (isNaN($("#hours-input").val())) || (isNaN($("#minutes-input").val())) ) ) {
			$("#hours-input").closest(".form-group").addClass("has-error");
			return 0;
		} else {
			$("#hours-input").closest(".form-group").addClass("has-success");
		}
	} else {
		$("#hours-input").closest(".form-group").addClass("has-success");
	}
	
	return 2;
}

function resetAddForm() {
	$( ".has-success" ).removeClass("has-success");
	$( ".has-warning" ).removeClass("has-warning");
	$( ".has-error" ).removeClass("has-error");
	$("#add-task-submit").removeClass("btn-success");
	$("#add-task-submit").removeClass("btn-warning");
	$("#add-task-submit").removeClass("btn-danger");
	
	$("#description-input").val("");
	$("#repeat-input").val("Daily");
	$("#repeat-interval-input").val("");
	
	setDate(new Date());
	
	$("#repeat-type-input").val("Normally");
	$("#hours-input").val("");
	$("#minutes-input").val("");
	$("#interval-type-input").val("Days");

	checkIntervalInput();
	checkWeeklyInput();
	checkDateInput();
	
	if ( $("#timed-toggle").html() == "Timed" ) {
		checkTimedToggle();
		$("#timed-toggle").removeClass("active");
	}
	
	if ( $("#date-end-toggle").html() == "Enabled" ) {
		checkDateToggle();
		$("#date-end-toggle").removeClass("active");
	}
}

/* Set up list */

function refreshList() {
	
	pauseAllTimers();
	
	tasks = false;

	if(localStorage.length > 0) {
	
		//Basic framework for the carousel
		$("#list").html('<div class="row"><div class="col-sm-12">' +
							'<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">' +
							  '<!-- Indicators -->' +
							  '<ol class="carousel-indicators">'+
							  '</ol>' +
							  '<!-- Wrapper for slides -->' +
							 ' <div class="carousel-inner">' +
							 '</div>' +

							  '<!-- Controls -->' +
							 ' <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">' +
								'<span class="glyphicon glyphicon-chevron-left"></span>' +
							  '</a>' +
							  '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next">' +
								'<span class="glyphicon glyphicon-chevron-right"></span>' +
							  '</a>' +
							'</div>' +
		
							'<div class="progress">' +
							  '<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="3" style="width: 0%;">' +
								'<span class="sr-only">0% Complete</span>' +
							  '</div>' +
							'</div>' +
						'</div>' +
						'</div>');
						
		$(".carousel").carousel({
			interval: 0
		});
		
		for(var i = 0; i < localStorage.length; i++) {
			currentKey = localStorage.key(i);
			current = JSON.parse(localStorage.getItem(currentKey));

			today = new Date();
			today.setMinutes(0);
			today.setSeconds(0);
			today.setMilliseconds(0);
			
			startDate = new Date(current["startMonthInput"] + " " + current["startDayInput"] + " " + current["startYearInput"]);
			if (current["dateEndToggle"]) {
				endDate = new Date(current["endMonthInput"] + " " + current["endDayInput"] + " " + current["endYearInput"]);
			}
			
			if (current["lastCompleted"] != null) {
				lastCompleted = new Date(current["lastCompleted"]);
			}
			
			//Remove finished tasks
			if ( current["lastCompleted"] != null  && ( current["repeatInput"] == "Never" || (current["dateEndToggle"] && (today > endDate)) ) ) {
				localStorage.removeItem(currentKey);
				break;
			}

			//Reset completion
			//Right now only resets "normally." This means there are no duplicate
			//tasks. In "Only if completed" duplicate tasks would appear if the previous 
			//iteration was not completed. This needs to be written still.
			//A copy of the task would be made. This task would be a one time task.
			
			//daily
			if ((current["repeatInput"] == "Daily") && (current["lastCompleted"] != null) && lastCompleted < today) {
				
				if (current["repeatTypeInput"] == "Normally") {
					current["lastCompleted"] = null;
					localStorage[currentKey] = JSON.stringify(current);
				} else {
					//duplicate task for each day last completed to yesterday
					current["lastCompleted"] = null;
					localStorage[currentKey] = JSON.stringify(current);
				}
			}
			
			//weekly
			switch (today.getDay()) {
				case 0:
					weekday = "sunday";
					break;
				case 1:
					weekday = "monday";
					break;
				case 2:
					weekday = "tuesday";
					break;
				case 3:
					weekday = "wednesday";
					break;
				case 4:
					weekday = "thursday";
					break;
				case 5:
					weekday = "friday";
					break;
				default:
					weekday = "saturday";
					break;
			} 
			
			
			//The logic for all but dailys is kind of borked. Events only reset if the page is visited on that day.
			//Should loop through and check all dates in between last completed and today for reset potential
			if (current["repeatInput"] == "Weekly" && current["lastCompleted"] != null && lastCompleted < today && current["weeklyToggles"][0][weekday]) {
			
				if (current["repeatTypeInput"] == "Normally" ) {
					current["lastCompleted"] = null;
					localStorage[currentKey] = JSON.stringify(current);
				} else {
					//duplicate task for every week from last completed to yesterday
					current["lastCompleted"] = null;
					localStorage[currentKey] = JSON.stringify(current);
				}
			}
			
			//monthly
			if (current["repeatInput"] == "Monthly" && current["lastCompleted"] != null && lastCompleted < today && today.getDate() == startDate.getDate()) {
				if (current["repeatTypeInput"] == "Normally" ) {
					current["lastCompleted"] = null;
					localStorage[currentKey] = JSON.stringify(current);
				} else {
					//duplicate task for every repeated month from last completed to yesterday
					current["lastCompleted"] = null;
					localStorage[currentKey] = JSON.stringify(current);
				}
			}
			
			//yearly
			if (current["repeatInput"] == "Yearly" && current["lastCompleted"] != null && lastCompleted < today &&  (today.getDate() == startDate.getDate() &&  today.getMonth() == startMonth.getMonth())) {
				if (normally) {
					current["lastCompleted"] = null;
					localStorage[currentKey] = JSON.stringify(current);
				} else {
					//duplicate task for every year from last completed to yesterday
					current["lastCompleted"] = null;
					localStorage[currentKey] = JSON.stringify(current);
				}
			}
			
			//custom
			//TODO do custom interval logic
			/*if (current["repeatInput"] == "Every..." && current["lastCompleted"] != null && current["lastCompleted"] < today) {
				if (current["intervalTypeInput"] == "Days") {
					if (normally) {
						current["lastCompleted"] = null;
					} else {
						//duplicate task for every repeat from last completed to yesterday
						current["lastCompleted"] = null;
					}
				} else if (current["intervalTypeInput"] == "Weeks") {
					if (normally) {
						current["lastCompleted"] = null;
					} else {
						//duplicate task for every repeat from last completed to yesterday
						current["lastCompleted"] = null;
					}
				} else if (current["intervalTypeInput"] == "Months") {
					if (normally) {
						current["lastCompleted"] = null;
					} else {
						//duplicate task for every repeat from last completed to yesterday
						current["lastCompleted"] = null;
					}
				} else if (current["intervalTypeInput"] == "Years) {
					if (normally) {
						current["lastCompleted"] = null;
					} else {
						//duplicate task for every repeat from last completed to yesterday
						current["lastCompleted"] = null;
					}
				}
			}*/
			
			if (startDate <= today) {
				newListItem(current, currentKey);
				tasks = true;
			} 
			
		}	
	} else {
		//No carousel needed, just show a simple message
		$("#list").html("<div class='well well-lg text-center'><h2>There doesn't seem to be any tasks.</h2>")
	}
	
	if (!tasks && localStorage.length > 0) {
		$("#list").html("<div class='well well-lg text-center'><h2>You're all done for today!</h2>")
	}
	
	$("#list .carousel h4.glyphminutesicon").tooltip();
	$("#list .carousel h2.glyphicon").tooltip();
	$("#list .carousel button").tooltip();
}

function newListItem(current, currentKey) {
	timerText = "";
	
	if (current["timedToggle"]) {
		
		hours = current["hoursInput"];
		if (current["hoursInput"] == "" ) {
			hours = 0;
		}
		
		minutes = current["minutesInput"];
		if (current["minutesInput"] == "" ) {
			minutes = 0;
		}
		
		if (hours != 0) {
			if (hours == 1 && minutes == 1) {
				timerText =  "<span class='hourCount'>" + hours + "</span> <span class='hourText'> hour and</span> <span class='minuteCount'>" + minutes + "</span> <span class='minuteText'> minute</span> remaining!";
			} else if (hours == 1 && minutes != 1) {
				timerText =  "<span class='hourCount'>" + hours + "</span> <span class='hourText'> hour and</span> <span class='minuteCount'>" + minutes + "</span> <span class='minuteText'> minutes</span> remaining!";
			} else if (minutes == 1) {
				timerText =  "<span class='hourCount'>" + hours + "</span> <span class='hourText'> hours and</span> <span class='minuteCount'>" + minutes + "</span> <span class='minuteText'> minute</span> remaining!";
			} else {
				timerText =  "<span class='hourCount'>" + hours + "</span> <span class='hourText'> hours and</span> <span class='minuteCount'>" + minutes + "</span> <span class='minuteText'> minutes</span> remaining!";
			}
		} else {
			if (minutes != 1) {
				timerText =  "<span class='hourCount hidden'>" + hours + "</span> <span class='hourText hidden'> hours and</span> <span class='minuteCount'>" + minutes + "</span> <span class='minuteText'> minutes</span> remaining!";
			} else {
				timerText =  "<span class='hourCount hidden'>" + hours + "</span> <span class='hourText hidden'> hours and</span> <span class='minuteCount'>" + minutes + "</span> <span class='minuteText'> minute</span> remaining!";
			}
			
		}
	}

	if ($("#list .carousel-inner").html() == "") {
		returnMe = '<div class="item active" id="' + currentKey + '" data-key="' + currentKey + '">' +
				
					'<h4 class="glyphicon glyphicon-edit"  data-toggle="tooltip" data-placement="bottom" data-container="false" title="Edit."></h4>&nbsp;' +		
					'<a href="#item" onclick="deleteDaily(\'' + currentKey + '\')"><h4 class="glyphicon glyphicon-remove" data-toggle="tooltip" data-placement="bottom" data-container="false" title="Delete."></h4></a>';

		if (current["timedToggle"]) {
			returnMe +=	'<a class="start" href="#" onclick="startTimer(\'' + currentKey + '\')"><h2 class="glyphicon glyphicon-play"  data-toggle="tooltip" data-placement="bottom" data-container="false" title="Start."></h2></a>' +
					    '<a class="pause" href="#" onclick="pauseTimer(\'' + currentKey + '\')" class="hidden"><h2 class="glyphicon glyphicon-pause hidden"  data-toggle="tooltip" data-placement="bottom" data-container="false" title="Pause."></h2></a> &nbsp; &nbsp; &nbsp; &nbsp;' +
					    '<a class="stop"  href="#item" onclick="stopTimer(\'' + currentKey + '\')"><h2 class="glyphicon glyphicon-stop" data-toggle="tooltip" data-placement="bottom" data-container="false" title="Restart."></h2></a>';
		}
		
		returnMe +=	'<h1>' + current["descriptionInput"] + '</h1>' +
				  '<h2 class="timer-text">' + timerText + '</h2>' +
				  '<h2 class="done-text text-success"> Done! </h2>' +
				  '<h2>Repeats ' + current["repeatInput"] + '. </h2>' +

				  '<br/><div class="form-group not-done">' +
						'<div class="col-sm-4">' +
						'	<button type="submit" class="finish-task btn btn-success btn-lg btn-block btn-primary" onClick="finishDaily(\'' + currentKey + '\')">Done!</button>' +
						'</div>' +
						'<div class="col-sm-4">' +
						'	<button type="submit" class="postpone-task btn btn-warning btn-lg btn-block btn-primary" disabled>Not today...</button>' +
						'</div>' +
						'<div class="col-sm-4">' +
						'	<button type="submit" class="remove-task btn btn-danger btn-lg btn-block btn-primary" disabled>Remove.</button>' +
						'</div>' +
				  '</div>' +
				  '<div class="form-group done">' +
						'<div class="col-sm-12">' +
						'	<button type="submit" class="postpone-task btn btn-lg btn-block btn-primary" onClick="unfinishDaily(\'' + currentKey + '\')">Not done.</button>' +
						'</div>' +
				  '</div>' +
				'</div>';
		} else {
			returnMe = $("#list .carousel-inner").html() + '<div class="item" id="' + currentKey + '" data-key="' + currentKey + '">' +
				
					'<h4 class="glyphicon glyphicon-edit"  data-toggle="tooltip" data-placement="bottom" data-container="false" title="Edit."></h4> &nbsp;' +		
					'<a href="#item" onclick="deleteDaily(\'' + currentKey + '\')"><h4 class="glyphicon glyphicon-remove" data-toggle="tooltip" data-placement="bottom" data-container="false" title="Delete."></h4></a>';

			if (current["timedToggle"]) {
				returnMe +=	'<a class="start" href="#" onclick="startTimer(\'' + currentKey + '\')"><h2 class="glyphicon glyphicon-play"  data-toggle="tooltip" data-placement="bottom" data-container="false" title="Start."></h2></a>' +
					    '<a class="pause" href="#" onclick="pauseTimer(\'' + currentKey + '\')" class="hidden"><h2 class="glyphicon glyphicon-pause hidden"  data-toggle="tooltip" data-placement="bottom" data-container="false" title="Pause."></h2></a> &nbsp; &nbsp; &nbsp; &nbsp;' +
					    '<a class="stop"  href="#item" onclick="stopTimer(\'' + currentKey + '\')"><h2 class="glyphicon glyphicon-stop" data-toggle="tooltip" data-placement="bottom" data-container="false" title="Restart."></h2></a>';
			}
		
			returnMe +=	'<h1>' + current["descriptionInput"] + '</h1>' +
					  '<h2 class="timer-text">' + timerText + '</h2>' +
				 	  '<h2 class="done-text text-success"> Done! </h2>' +
					  '<h2>Repeats ' + current["repeatInput"] + '. </h2>' +

					  '<br/><div class="form-group not-done">' +
							'<div class="col-sm-4">' +
							'	<button type="submit" class="finish-task btn btn-success btn-lg btn-block btn-primary" onClick="finishDaily(\'' + currentKey + '\')">Done!</button>' +
							'</div>' +
							'<div class="col-sm-4">' +
							'	<button type="submit" class="postpone-task btn btn-warning btn-lg btn-block btn-primary" disabled>Not today...</button>' +
							'</div>' +
							'<div class="col-sm-4">' +
							'	<button type="submit" class="remove-task btn btn-danger btn-lg btn-block btn-primary" disabled>Remove.</button>' +
							'</div>' +
					  '</div>' +
					  '<div class="form-group done">' +
						'<div class="col-sm-12">' +
						'	<button type="submit" class="postpone-task btn btn-lg btn-block btn-primary" onClick="unfinishDaily(\'' + currentKey + '\')">Not done.</button>' +
						'</div>' +
				  '</div>' +
					'</div>';
	}
	
	$("#list .carousel-inner").html(returnMe);	
	
	if (current["lastCompleted"] != null) {
		$("#" + currentKey).removeClass("not-completed");
		$("#" + currentKey).removeClass("completed");
		$("#" + currentKey).addClass("completed");
	} else {
		$("#" + currentKey).removeClass("completed");
		$("#" + currentKey).removeClass(" not-completed");
		$("#" + currentKey).addClass("not-completed");
	}
	
	return returnMe;
}

function finishDaily(key) {
	current = JSON.parse(localStorage[key]);
	today = new Date();
	today.setHours(2);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
	current["lastCompleted"] = today;
	localStorage[key] = JSON.stringify(current);
	
	$("#" + key).removeClass("not-completed");
	$("#" + key).removeClass("completed");
	$("#" + key).addClass("completed");
	
}

function unfinishDaily(key) {
	current = JSON.parse(localStorage[key]);
	current["lastCompleted"] = null;
	localStorage[key] = JSON.stringify(current);
	
	$("#" + key).removeClass("completed");
	$("#" + key).removeClass("not-completed");
	$("#" + key).addClass("not-completed");
}

function deleteDaily(key) {
	localStorage.removeItem(key);
	
	$(".carousel").carousel("next");
	
	setTimeout(function () {
				$("#" + key ).remove();
   			 }, 600);
}

function startTimer(key) {
	$("#" + key + " .start").removeClass("hidden");
	$("#" + key + " .start").addClass("hidden");
	$("#" + key + " .start .glyphicon").removeClass("hidden");
	$("#" + key + " .start .glyphicon").addClass("hidden");
	
	
	$("#" + key + " .pause").removeClass("hidden");
	$("#" + key + " .pause .glyphicon").removeClass("hidden");
	
	 timerList[key] = setInterval(function() { decrementTimer(key); }, 60000);
}

function pauseTimer(key) {
	$("#" + key + " .pause").removeClass("hidden");
	$("#" + key + " .pause").addClass("hidden");
	$("#" + key + " .pause .glyphicon").removeClass("hidden");
	$("#" + key + " .pause .glyphicon").addClass("hidden");
	
	
	$("#" + key + " .start").removeClass("hidden");
	$("#" + key + " .start .glyphicon").removeClass("hidden");
	
	clearInterval(timerList[key]);
}

function pauseAllTimers() {
	for(var i = 0; i < localStorage.length; i++) {
		pauseTimer(localStorage.key(i));
	}
}

function stopTimer(key) {
	$("#" + key + " .pause").removeClass("hidden");
	$("#" + key + " .pause").addClass("hidden");
	$("#" + key + " .pause .glyphicon").removeClass("hidden");
	$("#" + key + " .pause .glyphicon").addClass("hidden");
	
	
	$("#" + key + " .start").removeClass("hidden");
	$("#" + key + " .start .glyphicon").removeClass("hidden");
	
	current = JSON.parse(localStorage[key]);
	$("#" + key + " .minuteCount").html(current["minutesInput"]);
	$("#" + key + " .hourCount").html(current["hoursInput"]);
	
	clearInterval(timerList[key]);
}

function decrementTimer(key) {
	/*if (parseInt($("#" + key + " .minuteCount").html()) == 0 && parseInt($("#" + key + " .hourCount").html()) >= 1) {
		$("#" + key + " .hourText").html("hour and");
	} else {
		$("#" + key + " .minuteCount").html(parseInt($("#" + key + " .minuteCount").html()-1));
	}*/
	
	if (parseInt($("#" + key + " .minuteCount").html()) == 0 && parseInt($("#" + key + " .hourCount").html()) >= 1) {
		$("#" + key + " .minuteCount").html(59);
		$("#" + key + " .hourCount").html(parseInt($("#" + key + " .hourCount").html()-1));
	} else {
		$("#" + key + " .minuteCount").html(parseInt($("#" + key + " .minuteCount").html()-1));
	}
	
	if (parseInt($("#" + key + " .minuteCount").html()) <= 0) {
		console.log("Done with timer " + key);
		doneTimer(key);
	}
}

function doneTimer(key) {
	stopTimer(key);
	alert("Done with " + key + "!");
	finishDaily(key);
}

function compareDates(date1, date2) {
	if (date1.getFullYear() < date2.getFullYear()) {
		return -1;
	} else if (date1.getFullYear() == date2.getFullYear()) {
		if (date1.getMonth() < date2.getMonth()) {
			return -1;
		} else if (date1.getMonth() == date2.getMonth()) {
			if (date1.getDay() < date2.getDay()) {
				return -1;
			} else if (date1.getDate() == date2.getDate()) {
				return 0;
			} else {
				return 1
			}
		} else {
			return 1;
		}
	} else {
		return 1;
	}
}