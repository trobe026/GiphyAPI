$( window ).on("load", function() {

  var topics = ["dog", "giraffe", "panda"];
  // create buttons for each item in topics, assigning each item to an id for later
  function createButtons() {
    $.each(topics, function(index, value) {
      var buttonItem = $("<button>");
      buttonItem.attr("id", value);
      buttonItem.append(value);
      $('#buttonList').append(buttonItem);
    });
  }
  createButtons();
// add an animal to the list with no dups
    $("#addNewAnimal").on("click", function() {
      event.preventDefault();
      var userInput = $("#newAnimal").val().trim();
      topics.push(userInput);
      $('#buttonList').html(" ");
      createButtons();
    });
// when button in buttonList is clicked the animal in the id of that button populates queryURL.  Ajax response is passed to results, for each item in results an img is created with data attributes for later, images are prepended to the #images div
    $('#buttonList').on("click", 'button', function() {
      console.log("test");
      var animal = $(this).attr("id");
      console.log(animal);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=2CTA4pXLRSvVbq0A27I41ABNk1lDbxJs&limit=10";
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
          console.log(response);
          $('#images').html(" ");
          var results = response.data;
          // var timesClicked = 0;
          $.each(results, function(index, value) {
            var image = $("<img>").attr({
              "data-state": "still",
      				'src': results[index].images.fixed_height_still.url,
      				"data-animate": results[index].images.fixed_height.url,
      				"data-still": results[index].images.fixed_height_still.url
            });
            $('#images').prepend(image);

// when an image on the page is clicked, the data attributes are assigned to variables, if the data-state is still, the img src is replaced by the url stored in the active variable from data-animate, data-state is also updated to active, so that when clicked again the function can run in reverse in the else block.
          })
          $('#images').on("click", 'img', function() {
            var state = $(this).attr("data-state");
            var active = $(this).attr("data-animate");
            var still = $(this).attr("data-still");
            if (state === "still") {
              $(this).attr("data-state", "active");
              $(this).attr("src", active);
            } else {
              $(this).attr("data-state", "still");
              $(this).attr("src", still);
            }
          });
        }
      )
    });


// window load end
});
