 // Display Current Date At Top of Calendar //
var CurrentDay = moment().format();
// Get Local Storage for Text Input
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        console.log('about to update', key, 'with this from local S', value)
        $(`#text${key}`).text(value);
    }
}
// Write Function for Current Date //
$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    console.log('current time hour!!', moment().hours())
    var currentHour = moment().hours()
    // Loop for Each Day //
    for (let i = 9; i < 18; i++) {


        // Create Row //
        var row = $(`<div data-time=${i} id='${i}' class="row time-block"></div>`);

        // Create Column //
        var col1 = $('<div class="col-sm-2 hour">' + i + 'am' + '</div>');

        if (i > 12) {
            var newDisplay = i - 12
            newDisplay += 'pm'
            col1.text(newDisplay)
        }

        // Create Column #2 //
        var col2 = $(`<textarea id=text${i} class="description col-sm-8" placeholder="Add your event here..."></textarea>`);
        if (i == currentHour) {
            col2.addClass("present");
        } else if (currentHour > i) {
            col2.addClass("past");
        } else if (currentHour < i) {
            col2.addClass('future')
        }
       // Create Column #3 // 
        var col3 = $(`<button id=${i}  class="saveBtn col-sm-2 fas fa-save"></button>`)

       // Append Column to Row row.append(col#) //
        row.append(col1);
        row.append(col2);
        row.append(col3);

       // Add Rows to Container //
        $(".container").append(row);

        getLocalStorage(i);
    }

// Declare SaveBtn Variable & Write Function for Save Button 
    var saveBtn = $('.saveBtn');
    saveBtn.on('click', function () {
        let eventId = $(this).attr('id');
        let eventText = $(this).siblings('.description').val();
        console.log('about to save tolocal storage!', eventId, eventText)
        // Buttons (save to Local Storage)//
        localStorage.setItem(eventId, eventText);
    });

});