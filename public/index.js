$(document).ready(function(){
  var WeatherData={};
  var a = function () {
    if(Object.keys(WeatherData).length==0){
      if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
            $.post("/",
            { lon:position.coords.longitude,
              lat:position.coords.latitude
            },
            function(data, status){
            })
            .done((data)=>{
              console.log(data);
              WeatherData=data;
              var a=new Date();
              var data = `
              <div class="card"><hr>
              <br><span> <b>Your current Location Weather</b></span><hr>
              <br><span> <b>`+WeatherData.currently.summary +`</b></span>
              <br><span style="font-size:2rem;"> <b></b> `+WeatherData.currently.temperature +`F</span>
              <br><span> <img src="SVG\/`+WeatherData.currently.icon+`.svg"></span>
              <br><span> <b>Precipitation Intensity:</b> `+WeatherData.currently.precipIntensity +`</span>
              <br><span> <b>Precipitation Probability:</b> `+WeatherData.currently.precipProbability +`</span>
              <br><span> <b>Apparent Temperature:</b> `+WeatherData.currently.apparentTemperature +` F</span>
              <br><span> <b>Dew Point:</b> `+WeatherData.currently.dewPoint +` F</span>
              <br><span> <b>Humidity:</b> `+WeatherData.currently.humidity*100 +` %</span>
              <br><span> <b>Pressure:</b> `+WeatherData.currently.pressure +` mb</span>
              <br><span> <b>Wind Speed:</b> `+WeatherData.currently.windSpeed+` mph</span>
              <br><span> <b>Wind Gust:</b> `+WeatherData.currently.windGust+` mph</span>
              <br><span> <b>Wind Bearing:</b> `+WeatherData.currently.windBearing +`<sup>o</sup></span>
              <br><span> <b>Cloud Cover:</b> `+WeatherData.currently.cloudCover +`</span>
              <br><span> <b>UV Index:</b> `+WeatherData.currently.uvIndex +`</span>
              <br><span> <b>Visibility:</b> `+WeatherData.currently.visibility +` mi</span>
              <br><span> <b>Ozone:</b> `+WeatherData.currently.ozone +` DU</span>
              <div style="background:white; color: black; margin-top: 15px;width:100%;">
              <span style="font-size:0.75rem">`+a+`</span>
              </div>
              </div>
              `;
              WeatherData = {};
              $("#localdata").html(data);
              $("#loading").css("display","none");
              $("#formsub").css("display","block");
              $("#calleddata").css("display","none");
            });
          });
      }else{
        console.log("Browser doesn't support geolocation!");
      }
    }
  }
 
  vieworiginal = function(){
    $("#loading").css("display","none");
    $("#formsub").css("display","block");
    $("#calleddata").css("display","none");
    $("#localdata").css("display","block");
  }


  $('#getinfo').submit(function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.post("/cityWeather", formData).done(function(data) {
      console.log(data);
      WeatherData=data;
              var a=new Date();
              var tme= $("#time").val();
              if(tme>12){
                tme=tme-12;
                tme= tme+ " pm";
              }else{
                tme= tme+ " am";
              }
              var data = `
              <div class="card">
              <button id="original" onclick="vieworiginal()">View Weather condition of your location</button>
              <hr>
              <br><span>You Requested Data For: <b>`+$("#cityId option:selected").text()+`, `+tme+`</b></span><hr>
              <br><span> <b>`+WeatherData.currently.summary +`</b></span>
              <br><span style="font-size:2rem;"> <b></b> `+WeatherData.currently.temperature +`F</span>
              <br><span> <img src="SVG\/`+WeatherData.currently.icon+`.svg"></span>
              <br><span> <b>Precipitation Intensity:</b> `+WeatherData.currently.precipIntensity +`</span>
              <br><span> <b>Precipitation Probability:</b> `+WeatherData.currently.precipProbability +`</span>
              <br><span> <b>Apparent Temperature:</b> `+WeatherData.currently.apparentTemperature +` F</span>
              <br><span> <b>Dew Point:</b> `+WeatherData.currently.dewPoint +` F</span>
              <br><span> <b>Humidity:</b> `+WeatherData.currently.humidity*100 +` %</span>
              <br><span> <b>Pressure:</b> `+WeatherData.currently.pressure +` mb</span>
              <br><span> <b>Wind Speed:</b> `+WeatherData.currently.windSpeed+` mph</span>
              <br><span> <b>Wind Gust:</b> `+WeatherData.currently.windGust+` mph</span>
              <br><span> <b>Wind Bearing:</b> `+WeatherData.currently.windBearing +`<sup>o</sup></span>
              <br><span> <b>Cloud Cover:</b> `+WeatherData.currently.cloudCover +`</span>
              <br><span> <b>UV Index:</b> `+WeatherData.currently.uvIndex +`</span>
              <br><span> <b>Visibility:</b> `+WeatherData.currently.visibility +` mi</span>
              <br><span> <b>Ozone:</b> `+WeatherData.currently.ozone +` DU</span>
              <div style="background:white; color: black; margin-top: 15px;width:100%;">
              <span style="font-size:0.75rem">`+a+`</span>
              </div>
              </div>
              `;
              WeatherData = {};
      $("#calleddata").html(data);
      $("#formsub").css("display","block");
      $("#loading").css("display","none");
      $("#localdata").css("display","none");
      $("#calleddata").css("display","block");
    });
  });
  a();
});
