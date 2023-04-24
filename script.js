var description = $(".description");

var eventsData;

description.text(eventsData);

// current day is displayed at the top of the calendar
var today = dayjs();
$('#currentDay').text(today.format('dddd: MMMM DD, YYYY'));

// each timeblock is color coded to indicate whether it is in the past, present, or future
function setHourColors() {
    var now = dayjs();
    for (var i = 9; i < 18; i++) {
        if (i < now.hour()) {
            $("#hour-" + i + " textarea").addClass("past");
        } else if (i == now.hour()) {
            $("#hour-" + i + " textarea").addClass("present");
        } else if (i > now.hour()) {
            $("#hour-" + i + " textarea").addClass("future");
        }
    }
}

// the text for that event is saved in local storage
function loadStoredData() {
    eventsData = JSON.parse(localStorage.getItem("calendarEvents"));
    if (!eventsData) {
        eventsData = {
            hour9: "",
            hour10: "",
            hour11: "",
            hour12: "",
            hour13: "",
            hour14: "",
            hour15: "",
            hour16: "",
            hour17: "",
        }
    }
}

function handleSaveClick(event) {
    // grab data from HTML
    var hourBlock = $(event.target).parent();
    var value = hourBlock.children("textarea").val();
    var hour = hourBlock.attr('id').split("-")[1];

    // modify our data object
    eventsData["hour" + hour] = value;

    // strore in local storage
    localStorage.setItem("calendarEvents", JSON.stringify(eventsData));
}

$('.saveBtn').on('click', handleSaveClick);

$(function() {
   loadStoredData();
   setHourColors();
});