// Variables
var APIKey = "e9f55feff994f14d8c3aa8dcc774b0f8";
var Cities = [];

function search(city) {

    // AJAX call to OpenWeatherMap API (current weather)
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey,
        method: "GET"
    }).then(function (response) {
        console.log(city)
        if (Cities.length === 0) {
            Cities.push(city);
        }
        else {
            for (var i = 0; i < Cities.length; i++) {
                var countCity = 1
                for (var j = 0; j < Cities.length; j++) {
                    if (Cities[j].includes(city)) {
                        countCity++;
                    }
                }
                console.log(countCity, Cities)
                if (countCity === 1) {
                    Cities.push(city);
                }
            }
        }

        localStorage.setItem("Cities", JSON.stringify(Cities))

        $("#fiveDay").show();
        createButtons();
        console.log(response);

        // Convert temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // Transfer to HTML
        $(".city").html("<h1>" + response.name + " " + "(" + moment().format('l') + ")" + "</h1>");
        $(".tempF").text("Temperature: " + Math.round(tempF) + " °F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".uvIndex").text("UV Index: " + response.uvi);

        // Console log results
        console.log("City: " + response.name);
        console.log("Temperature: " + Math.round(tempF) + " °F");
        console.log("Humidity: " + response.main.humidity + "%");
        console.log("Wind Speed: " + response.wind.speed + " MPH");
        console.log("UV Index: " + response.uvi);

        // AJAX call to OpenWeatherMap API (5-day forecast)
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // Convert temp to fahrenheit
            // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            // Transfer to HTML
            // $(".city").html("<h1>" + response.name + " " + "(" + moment().format('l') + ")" + "</h1>");
            // $(".tempF").text("Temperature (F): " + tempF);
            // $(".humidity").text("Humidity: " + response.main.humidity);
            // $(".wind").text("Wind Speed: " + response.wind.speed);
            // $(".uvIndex").text("UV Index: " + response.uvi);

            // Console log results
            // console.log("City: " + response.name);
            // console.log("Temperature (F): " + tempF);
            // console.log("Humidity: " + response.main.humidity);
            // console.log("Wind Speed: " + response.wind.speed);
            // console.log("UV Index: " + response.uvi);
        });
    });
}

$("#searchButton").on("click", function (event) {
    event.preventDefault();
    var city = $("#weatherInput").val()
    search(city)
});


// Function for creating buttons 
function createButtons() {
    var city = $("#weatherInput").val()
    $("#weatherInput").val("");
    $("#history").empty();
    console.log(Cities)
    for (var i = 0; i < Cities.length; i++) {


        var a = $("<button>");
        a.addClass("weather");
        a.addClass("form-control");
        a.text(Cities[i]);
        $("#history").append(a);
    }
}


$(document).on("click", ".weather", function (event) {
    event.preventDefault();
    var city = $(this).text();
    search(city);
});


