$(document).ready(function(){
    //displays current day
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    //check and adjusts each time block element depending on present hour
    //and adjusts each block to past, present or future depending on this.
    function hourChecker() { 

        var currHour = moment().hours();
    
        $(".time-block").each(function() {
          var blockHour = parseInt($(this).attr("id").split("-")[1]);
    
          if(currHour > blockHour) {
            $(this).addClass("past");
          }

          else if(currHour === blockHour) {
            $(this).removeClass("past");
            $(this).addClass("present");
          }

          else {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
          }
          
        });
      }

    hourChecker();

    //listen for save button clicks and save inputted values to LocalStorage
    var events = []
    $(".saveBtn").on("click", function() {
    
        var value = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");
        var dateAdded = moment().format("dddd, MMMM Do");

        events.push({description: value, time: time, date: dateAdded});

        localStorage.setItem("events", JSON.stringify(events));
    
    });

    //calls hourChecker every 10 seconds to check if time block's classes
    //need to be updated
    var Refresh = 10;
    function setTime() {
    setInterval(function() {
      Refresh--;
  
      if(Refresh === 0) {
        hourChecker();
        Refresh = 10;
      }
  
        }, 1000);
    }

    setTime();

    // reset on new day
    var currentDay = moment().format("dddd, MMMM Do");
    for(var i = 0; i < events.length; i++) {
        if(currentDay.isAfter(events[i].date)) {
        events[i].description = "";
            events[i].time = "";
            events[i].date = "";
            events.length = 0;
        }
    }
  
    // load saved data from localStorage
    var storedEvents = JSON.parse(localStorage.getItem("events"));
  
    if (storedEvents !== null) {
      events = storedEvents;
    }
  
    for(var i = 0; i < events.length; i++) {
      var userDescription = events[i].description;
      $("#" + events[i].time).children(".description").text(userDescription);
    }
    
});