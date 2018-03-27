// Holds button names/data-name
var moodArray = ["stoked", "excited", "frustrated", "sad"];

// Uses jquery to add buttons to html based on array
function originalButtons() {

    for (var i = 0; i < moodArray.length; i++) {
        var newButt = $("<button>");
        newButt.attr("type", "button");
        newButt.attr("class", "btn btn-default");
        newButt.attr("data-name", moodArray[i]);
        newButt.text(moodArray[i].toUpperCase());
        $(".button-area").append(newButt);
    }
}

originalButtons();

$(document).ready(function () {

    var moarGifs = 0;

    $(".button-area").on("click", ".btn", function () {

        var userQuery = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=sd2K2qfUpMftQdTEu7WlnmCrlCnZAJB8&q=" + userQuery + "&limit=10&offset=" + 10 * moarGifs + "&rating=PG&lang=en";

        $.ajax({ url: queryUrl, method: "GET" }).then(function (response) {

            // function to call gifs two at a time to fill 5 different divs so that the gifs are "floated" from left to right and top to bottom
            function gifCol(x, y, z) {
                for (var j = y; j < z; j++) {
                    // Response variables
                    var gImageActive = response.data[j].images.fixed_width.url;
                    var gImageStill = response.data[j].images.fixed_width_still.url;
                    var rating = response.data[j].rating.toUpperCase();
                    var source = response.data[j].url;
                    var title = response.data[j].title.toUpperCase();
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
                    newDiv.append("<div class='dropdown'><button class='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>Info<span class='caret'></span></button><ul class='dropdown-menu' aria-labelledby='dropdownMenu1'><li>Title: " + title + "</li><li>Rating: " + rating + "</li><li role='separator' class='divider'></li><li><a href=" + source + " target='_blank'>Url Link</a></li></ul></div>");

                    // prepend to html
                    $(x).prepend(newDiv);
                }
            }

            // at a certain width using the function to fill the 5 divs of the gif area
            if ($(window).width() > 491) {
                gifCol(".gifCol1", 0, 2);
                gifCol(".gifCol2", 2, 4);
                gifCol(".gifCol3", 4, 6);
                gifCol(".gifCol4", 6, 8);
                gifCol(".gifCol5", 8, 10);
            } else {
                gifCol(".gifCol1", 0, 10);
            }

            moarGifs++;
            if (moarGifs > 0) {
                $(".counter").text((moarGifs * 10));
            }
        })
    })

    // Reset counter for multiple gif request clicks
    $(".button-area").on("mouseout", ".btn", function () {
        moarGifs = 0;
        $(".counter").text(10);

    })

    // Clear gifs from page
    $(".clearButton").click(function () {
        $(".gifCol1").empty();
        $(".gifCol2").empty();
        $(".gifCol3").empty();
        $(".gifCol4").empty();
        $(".gifCol5").empty();
    })


    // Toggle gifs between active and still
    $(".gif-area").on("click", "img", function () {
        var still = $(this).attr("data-still");
        var active = $(this).attr("data-active");
        var status = $(this).attr("data-status");

        if (status === "still") {
            $(this).attr("src", active);
            $(this).attr("data-status", "active");
        } else {
            $(this).attr("src", still);
            $(this).attr("data-status", "still");
        }
    })

    // On Button Press add new button
    $(".gifButton").on("click", function () {

        // Prevents default submit function
        event.preventDefault();

        // Takes userinput to create new button
        var userInput = $("#gifInput").val().trim();
        if (userInput !== "" && !moodArray.includes(userInput)) {
            $(".button-area").empty();
            moodArray.push(userInput);
            originalButtons();
        }

        // reset input field after submit
        $("#gifInput").val("");
    })

    // Toggle display of back to top based on window scroll
    $(window).scroll(function () {

        var top = $(".gifPanel").offset().top;
        var windowTop = $(window).scrollTop();
        function topScroll() {

            if (top < windowTop) {
                console.log("hi");
                $(".backTop").css("display", "block");
            } else {
                $(".backTop").css("display", "none");
            }
        }
        topScroll();
    })


    // Back to top button function
    $(".backTop").click(function () {
        $("html, body").animate({scrollTop: 0}, "fast");
    })
})
