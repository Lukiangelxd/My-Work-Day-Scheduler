$(document).ready(function () {
    // Define the hours for time blocks
    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    // Creating and appending time blocks dynamically
    const timeBlocks = document.getElementById("timeBlocks");
    hours.forEach(hour => {
        const time = (hour > 12 ? hour - 12 + 'PM' : hour + 'AM');
        const isFuture = getTimeBlockClass(hour) === 'future';
        createTimeBlock(hour, time, isFuture);
    });
});

function getTimeBlockClass(hour) {
    const currentTime = dayjs().hour();
    if (hour < currentTime) {
        return 'past';
    } else if (hour === currentTime) {
        return 'present';
    } else {
        return 'future';
    }
}
function createTimeBlock(hour, time, isFuture) {
    const timeBlocks = document.getElementById("timeBlocks");

    const div = document.createElement("div");
    div.id = `hour-${hour}`;
    div.className = `row time-block ${isFuture ? 'future' : ''}`;

    div.innerHTML = `
      <div class="col-2 col-md-1 hour text-center py-3">${time}</div>
      <textarea class="col-8 col-md-10 description" rows="3" data-time="${hour}"></textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    `;

    timeBlocks.appendChild(div);
}

$(document).ready(function () {
    $(".saveBtn").click(function () {
      var eventText = $(this).siblings('textarea').val();
      var eventTime = $(this).parent().attr("id");
      
      localStorage.setItem(eventTime, eventText);
      //disabled save button when nothing is input, or is already input
      $(this).prop("disabled", true);
    });
  
    //when text is input, save button is enabled
    $("textarea").on('input', function () {
      $(this).siblings('.saveBtn').prop("disabled", false);
    })
  
    //populates schedule, colors, and date
    getEventInfo()
    hourColor()
    displayDate()
    //recolor and date every sec
    setInterval(function () {
      hourColor()
      displayDate()
    }, 1000);
  });
  
  //gets info from localstorage 
  function getEventInfo() {
    $('.time-block').each(function () {
      var textareaValue = localStorage.getItem($(this).attr('id'));
  
      var textarea = $(this).children('textarea');
  
      textarea.val(textareaValue);
    })
  }
  
  //display todays day and date
  function displayDate() {
    var currentDayEl = $('#currentDay');
    var rightNow = dayjs().format('dddd, MMMM DD, YYYY');
    currentDayEl.text(rightNow);
  }
  
  //color time function
  function hourColor() {
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').replace("hour-", ""));
  
      if (blockHour < currentHour) {
        $(this).addClass('past');
        $(this).removeClass('present');
        $(this).removeClass('future');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
        $(this).removeClass('past');
        $(this).removeClass('future');
      } else {
        $(this).addClass('future');
        $(this).removeClass('past');
        $(this).removeClass('present');
      }
    });
  }




