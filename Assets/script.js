// Variables
var APIKey = "e9f55feff994f14d8c3aa8dcc774b0f8";
var Cities = [];
var lastElement = localStorage.getItem("Cities");

lastElement.val
$("#history").append(lastElement);


function search(city) {

    // AJAX call to OpenWeatherMap API (current weather)
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey,
        method: "GET"
    }).then(function (response) {
        console.log(city)
        if (Cities.length === 0) {
            Cities.push(city);
            localStorage.setItem("Cities", JSON.stringify(Cities));
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
                    localStorage.setItem("Cities", JSON.stringify([Cities.length - 1]));
                }
            }
        }

        // To run after search button activated
        $("#fiveDay").show();
        $("#wicon").show();
        $("#cityWeather").show();
        createButtons();
        console.log(response);

        // Variables
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var iconCode = response.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        // Set source attribute for the URL
        $("#wicon").attr("src", iconUrl);

        // Transfer to HTML
        $("#city").html("<h1>" + response.name + " " + "(" + moment().format('l') + ")" + " " + "</h1>");
        $("#tempF").text("Temperature: " + Math.round(tempF) + " °F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#uvIndex").text("UV Index: " + response.uvi);

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

            // Variables
            var iconCode1 = response.list[7].weather[0].icon;
            var iconCode2 = response.list[15].weather[0].icon;
            var iconCode3 = response.list[23].weather[0].icon;
            var iconCode4 = response.list[31].weather[0].icon;
            var iconCode5 = response.list[39].weather[0].icon;
            var iconUrl1 = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
            var iconUrl2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
            var iconUrl3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
            var iconUrl4 = "http://openweathermap.org/img/w/" + iconCode4 + ".png";
            var iconUrl5 = "http://openweathermap.org/img/w/" + iconCode5 + ".png";

            // Set source attribute for URls
            $("#wicon1").attr("src", iconUrl1);
            $("#wicon2").attr("src", iconUrl2);
            $("#wicon3").attr("src", iconUrl3);
            $("#wicon4").attr("src", iconUrl4);
            $("#wicon5").attr("src", iconUrl5);

            // 5-Day forecast
            $("#day1").text(moment().add(1, 'days').format('l'));
            $("#day1Temp").text("Temp: " + Math.round((response.list[7].main.temp - 273.15) * 1.80 + 32) + "°F");
            $("#day1Hum").text("Humidity: " + response.list[7].main.humidity + "%");

            $("#day2").text(moment().add(2, 'days').format('l'));
            $("#day2Temp").text("Temp: " + Math.round((response.list[15].main.temp - 273.15) * 1.80 + 32) + "°F");
            $("#day2Hum").text("Humidity: " + response.list[15].main.humidity + "%");

            $("#day3").text(moment().add(3, 'days').format('l'));
            $("#day3Temp").text("Temp: " + Math.round((response.list[23].main.temp - 273.15) * 1.80 + 32) + "°F");
            $("#day3Hum").text("Humidity: " + response.list[23].main.humidity + "%");

            $("#day4").text(moment().add(4, 'days').format('l'));
            $("#day4Temp").text("Temp: " + Math.round((response.list[31].main.temp - 273.15) * 1.80 + 32) + "°F");
            $("#day4Hum").text("Humidity: " + response.list[31].main.humidity + "%");

            $("#day5").text(moment().add(5, 'days').format('l'));
            $("#day5Temp").text("Temp: " + Math.round((response.list[39].main.temp - 273.15) * 1.80 + 32) + "°F");
            $("#day5Hum").text("Humidity: " + response.list[39].main.humidity + "%");
        });
    });
}


// Functionality for city search button
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

// Functionality for created buttons
$(document).on("click", ".weather", function (event) {
    event.preventDefault();
    var city = $(this).text();
    search(city);
});


