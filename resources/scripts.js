function geoFindMe() {
  var output = $("#out");
  var temp = $("#temp");

  if (!navigator.geolocation){
    output.html("<p>Geolocation is not supported by your browser</p>");
    return;
  }
  function getWeather(latitude, longitude){
    var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=41dbda3747ee77b4607ca5f6ca39352e";

    console.log(url);
    $.ajax({url: url, success: function(result){
      var fahrenheit = Math.round(result.main.temp * (9/5) - 459.67);
      var celsius = Math.round(result.main.temp-273.15);

     //show the button
     $("#temperature").removeClass("hidden");

     $("#city").text(result.name);
     $("#temp").text(fahrenheit);
    
     //convert units:      
     $("#convert-celsius").click(function() {
      if ($("#convert-celsius").hasClass("unit-active")) {
         $("#temp").text(celsius);
         $("#convert-celsius").removeClass("unit-active");
        $("#convert-fahrenheit").addClass("unit-active");
      }
    }); 
      
      $("#convert-fahrenheit").click(function() {
      if ($("#convert-fahrenheit").hasClass("unit-active")) {
         $("#temp").text(fahrenheit);
         $("#convert-fahrenheit").removeClass("unit-active");
        $("#convert-celsius").addClass("unit-active");
      }
    }); 
    
      
    var currentWeather = result.weather[0].id;
    //show icons depending on weather conditions:
   if (currentWeather === 800 || (currentWeather > 950 && currentWeather < 956)) {
       $(".sunny").removeClass("hidden");
    }  else if(currentWeather > 800){   
       $(".cloudy").removeClass("hidden");
    }  else if (currentWeather >= 600 && currentWeather < 700){
      $(".flurries").removeClass("hidden");
    } else if (currentWeather >= 500){
      $(".rainy").removeClass("hidden");
    } else if (currentWeather >= 300){
      $(".sun-shower").removeClass("hidden");
    } else if (currentWeather >= 200){
      $("thunder-storm").removeClass("hidden");
    } else {
      $(".sunny").removeClass("hidden");
    }
    }});
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;


    getWeather(latitude, longitude);

  }

  function error() {
    $(output).html("Unable to retrieve your location");
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

geoFindMe();
