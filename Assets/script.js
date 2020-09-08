var APIKey = "e9f55feff994f14d8c3aa8dcc774b0f8";

$.ajax({
    url: " http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + APIKey,
    method: "GET"
}).then(function (response) {
    console.log(response);
});