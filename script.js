// DOM variables
var searchBtn = $("#search-button");
var searchHist = $("search-history");
console.log(searchHist);

var storedCities = [];
function showHistory() {
    let localHistory = JSON.parse(localStorage.getItem("cities"));
}
// JS variables
console.log(city);
// function definitions
// function calls
// Event listeners
searchBtn.on("click", function weatherData() {
  console.log("this activated");
  var cityName = $("#city").val();
  var apiKey = "c5adcca041c764a8c9d9a0c71af18792";
  let queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" +cityName +"&appid=" +apiKey;
  if (city != "") {
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      console.log(data);

      var country = data.sys.country;
      var cityEL = cityName + ", " + country;
      $("#city-name").text(cityEL);

      let tempEl = "Temperature: " + Math.round(((data.main.temp - 273.15) * 9) / 5 + 32) + "F";
      $("#temperature").text(tempEl);

      var humidtyEl = "Humidity: " + data.main.humidity; + "%"
      $("#humidity").text(humidtyEl);

      var windEl = "Wind Speed: " + data.wind.speed + "m/s";
      $("#windSpeed").text(windEl);

      function getUV() {
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        let uvURL =
          "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" +  lat + "&lon=" + lon;

        $.ajax({
          url: uvURL,
          method: "GET",
        }).then(function (data) {
            console.log(data);
          var uvEl = "UV Index: " + data.value;
          $("#uvIndex").text(uvEl);
        });
      }
      getUV();
    
      
      function storeCity() {
          localStorage.setItem("cities", JSON.stringify(cityEL)); 
          storedCities = [];
          storedCities.push(cityEL)
        }

        function showHistory() {
            for (i = 0; i < storedCities.length; i++) {
                searchHist.html("");
                var searchedCity = storedCities[i]

                var buttonEl = $("<div> <button>")
                buttonEl.addClass("list-button");
                buttonEl.attr("value", storedCities[i]);
                $("#search-history").append(buttonEl, searchedCity,)
                            
            }
                
        }
        storeCity();
        showHistory()     

        console.log(storedCities);
    });
      
      // function showSearch() {
  } else {alert("Please input a city name");
    }
    //var listBtn = $(".list-button");
    //listBtn.on("click", function () {
     //   weatherData(.value)

});



