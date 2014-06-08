$( document ).ready(function() {
	$(".carousel").carousel({
		interval: 0
	})

	$("h1.glyphicon").tooltip()
	$("h2.glyphicon").tooltip()

	adjustDateSelectors();
	
	checkIntervalInput();
	checkDateInput();
	checkDateToggle();
	checkTimedToggle();
});

/* ADD TASK ASTHETICS */
$("#repeat-input").change( function() {
	checkIntervalInput();
	checkDateInput();
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
	
	console.log("should be removing error classes");
	$("#date-input").closest(".form-group").removeClass("has-success");
	$("#date-input").closest(".form-group").removeClass("has-warning");
	$("#date-input").closest(".form-group").removeClass("has-error");
}

$("#month-input").change( function() {
	setAvailableDays( $("#month-input option:selected").index() );
})

/* DATE HANDLING */

function adjustDateSelectors() {
	today = new Date();
	
	populateYears( today.getFullYear(), 1, 9 );
	setDate(today);
}

function populateYears(year, lowerBuffer, higherBuffer) {
	var resetVal = $("#year-input").val();
	
	$("#year-input option").remove();
	for (var i = year-lowerBuffer; i <= year+higherBuffer; i++) {
   		$('#year-input').append( $("<option></option>")
                    .attr("value", i)
                    .text(i)
                    .html(i) );
	};
}

function setAvailableDays(month, year) {
	var resetVal = $("#day-input").val();
	
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
	
	$("#day-input option").remove();
	for (var i = 1; i <= max; i++) {
   		$('#day-input').append( $("<option></option>")
                    .attr("value", i)
                    .text(i)
                    .html(i) );
	};
	
	if (resetVal <= max) {
		$("#day-input").val(resetVal);
	}
}

function setDate(date) {
	
	day = date.getDate()+"";
	month = date.getMonth();
	year = date.getFullYear();
	
	setAvailableDays( month, year );
	
	$("#day-input").val(day);
	$('#month-input option').eq(month).prop('selected', true);
	$('#year-input').val(year);
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
		console.log("Error");
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
	console.log("Add");
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
	console.log("Validate month input");
	validateDateInput();
	changeButtonColor();
});

$("#day-input").change( function() {
	validateDateInput();
	changeButtonColor();
});

$("#year-input").change( function() {
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

function validate() {
	var s = 2;
	
	s = Math.min(validateDescriptionInput(), s);
	s = Math.min(validateIntervalInput(), s);
	s = Math.min(validateDateInput(), s);
	s = Math.min(validateTimerInput(), s);
	s = Math.min(validateRepeatTypeInput(), s);
	
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
	} else {
		$("#date-input").closest(".form-group").addClass("has-success");
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
	checkDateInput();
	
	if ( $("#timed-toggle").html() == "Timed" ) {
		checkTimedToggle();
		$("#timed-toggle").removeClass("active");
	}
}