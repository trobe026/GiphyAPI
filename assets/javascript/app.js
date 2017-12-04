$( window ).on("load", function() {

  var topics = ["dog", "giraffe", "panda"];
  // create buttons for each item in topics
  function createButtons() {
    $.each(topics, function(index, value) {
      console.log(value);
      var buttonItem = $("<button>");
      buttonItem.attr("id", value);
      buttonItem.append(value);
      $('#buttonList').append(buttonItem);
    });
  }
  createButtons();
// add an animal to the list without duplication
    $("#addNewAnimal").on("click", function() {
      event.preventDefault();
      var userInput = $("#newAnimal").val().trim();
      topics.push(userInput);
      $('#buttonList').html(" ");
      createButtons();
    });

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
          var results = response.data;
          $.each(results, function(index, value) {
            var image = $("<img>");
            image.attr("src", results[index].images.fixed_height.url);
            image.attr("alt", topics);
            $('#images').prepend(image);
          })
        }
      )
    });

  // get 10 giphy images for the name in the button clicked





// window load end
});
