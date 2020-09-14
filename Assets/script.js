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

        $("#fiveDay").show();
        createButtons();
        console.log(response);

        // Convert temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // Transfer to HTML
        $(".city").html("<h1>" + response.name + " " + "(" + moment().format('l') + ")" + " " + response.weather.icon + "</h1>");
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
        }).then(function (list) {
            console.log(list);

            // Convert temp to fahrenheit
            var tempF = (list.main.temp - 273.15) * 1.80 + 32;

            // 5-Day forecast
            $(".day1").text(moment().add(1, 'days').calendar());
            $(".day1Icon").text(list.weather.icon);
            $(".day1Temp").text("Temp: " + Math.round(tempF) + " °F");
            $(".day1Hum").text("Humidity: " + list.main.humidity + "%");

            $(".day2").text(moment().add(2, 'days').calendar());
            $(".day2Icon").text(list.weather.icon);
            $(".day2Temp").text("Temp: " + Math.round(tempF) + " °F");
            $(".day2Hum").text("Humidity: " + list.main.humidity + "%");

            $(".day3").text(moment().add(3, 'days').calendar());
            $(".day3Icon").text(list.weather.icon);
            $(".day3Temp").text("Temp: " + Math.round(tempF) + " °F");
            $(".day3Hum").text("Humidity: " + list.main.humidity + "%");

            $(".day4").text(moment().add(4, 'days').calendar());
            $(".day4Icon").text(list.weather.icon);
            $(".day4Temp").text("Temp: " + Math.round(tempF) + " °F");
            $(".day4Hum").text("Humidity: " + list.main.humidity + "%");

            $(".day5").text(moment().add(5, 'days').calendar());
            $(".day5Icon").text(list.weather.icon);
            $(".day5Temp").text("Temp: " + Math.round(tempF) + " °F");
            $(".day5Hum").text("Humidity: " + list.main.humidity + "%");
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

// Functionality for all created buttons
$(document).on("click", ".weather", function (event) {
    event.preventDefault();
    var city = $(this).text();
    search(city);
});


