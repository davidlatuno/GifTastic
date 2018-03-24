var moodArray = ["happy", "excited", "angry", "scared"];

for (var i = 0; i < moodArray.length; i++) {

    var newButt = $("<button>");
    newButt.attr("type", "button");
    newButt.attr("class", "btn btn-default");
    newButt.attr("data-name", moodArray[i]);
    newButt.text(moodArray[i]);
    $(".button-area").append(newButt);

}

$(document).ready(function () {

    $(".button-area").on("click", ".btn", function () {

        var userQuery = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=sd2K2qfUpMftQdTEu7WlnmCrlCnZAJB8&q=" + userQuery + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({ url: queryUrl, method: "GET" }).then(function (response) {

            var gImage = response.data[0].images.fixed_height.url;
            var newImg = $("<img>");
            newImg.attr("src", gImage);
            newImg.attr("alt", userQuery);
            $(".gif-area").append(newImg);

        })



    })

})