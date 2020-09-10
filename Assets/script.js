// Variables
var APIKey = "e9f55feff994f14d8c3aa8dcc774b0f8";
var Cities = [];


$("#searchButton").on("click", function (event) {
    event.preventDefault();

    var city = $("#weatherInput").val();

    Cities.push(city);
    createButtons();


    // AJAX call to OpenWeatherMap API
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // Convert temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // Transfer to HTML
        $(".city").html("<h1>" + response.name + moment().format('l') + "</h1>");
        $(".tempF").text("Temperature (F): " + tempF);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".uvIndex").text("UV Index: " + response.uvi);

        //Console log results
        console.log("City: " + response.name);
        console.log("Temperature (F): " + tempF);
        console.log("Humidity: " + response.main.humidity);
        console.log("Wind Speed: " + response.wind.speed);
        console.log("UV Index: " + response.uvi);
    });
});

// Function for getting city name from data attr
function getCityName() {
    var getcityName = $(this).attr("data-name");
}


// Function for displaying city data
function createButtons() {
    $("#weatherInput").val("");

    for (var i = 0; i < Cities.length; i++) {
        var a = $("<button>");
        a.addClass("weather");
        a.attr("data-name", Cities[i]);
        a.text(Cities[i]);
        $("#search").append(a);
    }
}


$(document).on("click", ".weather", getCityName);


