//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const city = req.body.city;
    const api_key = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key;
    https.get(url, function(response){
        console.log(response.statusCode);
    
        response.on("data",function(data){
            const WeatherData = JSON.parse(data);
            var windspeed = WeatherData.wind.speed;
            var Weather = WeatherData.weather[0].main;
            var Description = WeatherData.weather[0].description;
            var temperature = WeatherData.main.temp;
            var icon = WeatherData.weather[0].icon;
            var imglink = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' ,
                hour: "numeric", 
                minute: "numeric",
                second: "numeric"
            };
            var today  = new Date();
            var day = today.toLocaleDateString("hi-IN", options);
        
            res.write(
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="icon" href="https://spng.pngfind.com/pngs/s/532-5320332_roronoa-zoro-one-piece-zoro-wallpaper-hd-hd.png">
                    <title>Zoro.to</title>
                    <!-- Add Bootstrap CSS -->
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8sh+WyUq6AYugHvO5bZl+3I2P+JdZYuA2zK" crossorigin="anonymous">
                    <style>
                        body {
                            background: url('https://wallpapers.com/images/hd/lavender-field-nature-ibuz51dxvnz2vhql.webp');
                            font-family: 'Arial', sans-serif;
                            color: #092635; /* Set text color to white */
                            padding: 40px; /* Add padding for better spacing */
                        }
                
                        .container {
                            text-align: center;
                            background-color: #fff; /* Set a semi-transparent black background for better readability */
                            padding: 20px;
                            border-radius: 10px;
                        }
                
                        h1, p {
                            margin-bottom: 20px;
                        }
                
                        img {
                            max-width: 100%;
                            height: auto;
                            margin-top: 20px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Add a dark shadow to the image */
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Welcome to Weather Zoro.to</h1>
                        <h1>`+ day +`</h1>
                        <p>The temperature of `+city+` is `+temperature+` df/dg.</p>
                        <p>Weather is `+ Weather+` with wind speed of `+ windspeed +` m/s.</p>
                        <img src='`+imglink+`'><br>`+ Description+`
                    </div>
                
                    <!-- Add Bootstrap JS and Popper.js -->
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-gprrftzknDRDeFl3xi81RSr3wsKp2x3+Oq4zfuMU6w7Piq7xlF2x4DLGNApejNr" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8sh+WyUq6AYugHvO5bZl+3I2P+JdZYuA2zK" crossorigin="anonymous"></script>
                </body>
                </html>
                
                `
            )
            res.send();


        });
    })
});

//
//const city = "Nashik";
//const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=f8f0ea4c6433c6342f95dccd75300a0f&units=metric";
//https.get(url, function(response){
//    console.log(response.statusCode);
//
//    response.on("data",function(data){
//        const WeatherData = JSON.parse(data);
//        var windspeed = WeatherData.wind.speed;
//        var Weather = WeatherData.weather[0].main;
//        var Description = WeatherData.weather[0].description;
//        var temperature = WeatherData.main.temp;
//        var icon = WeatherData.weather[0].icon;
//        var imglink = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
//
//        res.write("<h1>Welcome to Zoro.to</h1>");
//        res.write("<p>The temprature of "+city+" city is "+temperature+" deg Cel.</p>");
//        res.write("<p>Weather is "+Weather+" with wind speed of "+windspeed+".</p>");
//        res.write("<img src='"+imglink+"' alt='none'><br>"+Description);
//        res.send();
//    });
//})

app.listen(3000, function(){
    console.log("At port 3000");
});