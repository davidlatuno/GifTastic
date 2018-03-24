var moodArray = ["happy", "excited", "angry", "scared"];

for (var i = 0; i < moodArray.length; i++) {

    var newButt = $("<button>");
    newButt.attr("type", "button");
    newButt.attr("class", "btn btn-default");
    newButt.attr("data-name", moodArray[i]);
    newButt.text(moodArray[i].toUpperCase());
    $(".button-area").append(newButt);

}

$(document).ready(function () {

    $(".button-area").on("click", ".btn", function () {

        var userQuery = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=sd2K2qfUpMftQdTEu7WlnmCrlCnZAJB8&q=" + userQuery + "&limit=10&offset=0&rating=PG&lang=en";

        $.ajax({ url: queryUrl, method: "GET" }).then(function (response) {

            for (var j = 0; j < 10; j++) {
                // Response variables
                var gImageActive = response.data[j].images.fixed_height.url;
                var gImageStill = response.data[j].images.fixed_height_still.url;
                var rating = response.data[j].rating.toUpperCase();
                // Jquery newDiv
                var newDiv = $("<div>")
                newDiv.attr("class", "gif");

                // Grab gif from response
                var newImg = $("<img>");
                newImg.attr("src", gImageStill);
                newImg.attr("alt", userQuery);
                newImg.attr("data-active", gImageActive);
                newImg.attr("data-still", gImageStill);
                newImg.attr("data-status", "still");
                newDiv.append(newImg);

                // Add Rating of gif
                var newP = $("<p>");
                newP.text("Rating: " + rating);
                newDiv.append(newP);

                // prepend to html
                $(".gif-area").prepend(newDiv);
            }
        })
    })


    // Toggle gifs between active and still
    $(".gif-area").on("click", "img", function() {
        var still = $(this).attr("data-still");
        var active = $(this).attr("data-active");
        var status= $(this).attr("data-status");

        if (status === "still") {
            $(this).attr("src", active);
            $(this).attr("data-status", "active");
        } else {
            $(this).attr("src", still);
            $(this).attr("data-status", "still");
        }



    })

})