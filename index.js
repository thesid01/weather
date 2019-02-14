var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var dateFormat = require('dateformat');
const axios = require("axios");
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var WeatherData;
var formData={};
var marker;
var tme;

app.get('/', function (req, res) {
  res.render("index",{weather:WeatherData,name:"siddharth","current":0});
  WeatherData={};
});

app.get("/info",function(req,res){
  if(Object.keys(formData).length!=0){
      res.render("info",{weather:WeatherData,name:"praval","current":1,formData:formData,city:marker,tme:tme});
  }else {
      res.render("info",{weather:WeatherData,name:"praval","current":0});
  }
  formData={};
});

app.post('/', function (req, res) {
  var now = new Date();
  dateFormat(now, "isoDate");
  var url="https://api.darksky.net/forecast/b5c493e7b5be90511f6eb8df4958a1f9/"+req.body.lat+","+req.body.lon+","+now.toISOString().slice(0,-5);
  axios.get(url)
      .then((response) => {
        WeatherData=response.data;
        console.log(response.data);
        return res.redirect('/info');
      })
      .catch((error) =>{
        console.log(error);
      })
});

app.post('/cityWeather', function (req, res) {
  console.log(":::::::::::::::::::::::::::::::::::::::::::::::::");
  let city = req.body.city;
  marker=city;
  let apiKey = "f2c6d51e3c98b9dfe98ee854024a1257";
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(url)
      .then((response) => {
        var now = new Date();
        dateFormat(now, "isoDate");
        var p=req.body.hour;
        tme=p;
        if(req.body.hour<9){
          p="0"+p;
        }
        var s=now.toISOString().slice(0,-13)+p+":"+"00:00";
        console.log(s);
        var url="https://api.darksky.net/forecast/b5c493e7b5be90511f6eb8df4958a1f9/"+response.data.coord.lat+","+response.data.coord.lon+","+s;
        axios.get(url)
            .then((response) => {
              formData=response.data;
              console.log(response.data);
              return res.redirect('/info');
            })
            .catch((error) =>{
              console.log(error);
            })
      })
      .catch((error) =>{
        console.log(error);
      })
});

app.listen(process.env.PORT||5000,function(){
  console.log("ON!!!!");
});
// app.listen(3000,function(){
// console.log("Server On");
// });
