$( window ).on("load", function() {

  var topics = ["dog", "giraffe", "panda", "cat", "chipmunk", "elephant", "raccoon", "goat", "pig", "lion", "bear", "mouse", "bird", "ocelot", "dolphin"];
  // create buttons for each item in topics, assigning each item to an id for later
  function createButtons() {
    $.each(topics, function(index, value) {
      var word = value.charAt(0).toUpperCase() + value.slice(1);
      var buttonItem = $("<button>");
      buttonItem.attr("id", word);
      buttonItem.append(word);
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
      $('#newAnimal').val('');
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
          $.each(results, function(index, value) {
            var image = $("<img>").attr({
              "data-state": "still",
      				'src': results[index].images.fixed_height_still.url,
      				"data-animate": results[index].images.fixed_height.url,
      				"data-still": results[index].images.fixed_height_still.url
            });
            $('#images').prepend(image);
            image.on('click', function(){
              console.log(this);
              var state = $(this).attr("data-state");
              if (state === "still") {
                $(this).attr("data-state", "active");
                var active = $(this).attr("data-animate");
                $(this).attr("src", active);
              } else {
                $(this).attr("data-state", "still");
                var still = $(this).attr("data-still");
                $(this).attr("src", still);
              }
            });


// when an image on the page is clicked, the data attributes are assigned to variables, if the data-state is still, the img src is replaced by the url stored in the active variable from data-animate, data-state is also updated to active, so that when clicked again the function can run in reverse in the else block.
          })
          // $('#images').on("click", 'img', function() {
          //   console.log(this);
          //   var state = $(this).attr("data-state");
          //   if (state === "still") {
          //     $(this).attr("data-state", "active");
          //     var active = $(this).attr("data-animate");
          //     $(this).attr("src", active);
          //   } else {
          //     $(this).attr("data-state", "still");
          //     var still = $(this).attr("data-still");
          //     $(this).attr("src", still);
          //   }
          // });
        }
      )
    });


// window load end
});
