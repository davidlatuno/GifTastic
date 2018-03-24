var moodArray = ["happy", "excited", "angry", "scared"];

for (var i = 0; i < moodArray.length; i++) {

    var newButt = $("<button>");
    newButt.attr("type", "button");
    newButt.attr("class", "btn btn-default");
    newButt.attr("data-name", moodArray[i]);
    newButt.text(moodArray[i]);
    $(".button-area").append(newButt);

}

$(document).ready(function() {

    
})