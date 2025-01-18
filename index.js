import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const GEOAPI_URL = "http://api.openweathermap.org/geo/1.0/zip?";
const WEATHERAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_TOKEN = "2755ab8796f4ba56de06ee465fdfdebf";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true}));

app.get("/",  async (req, res) => {
    res.render("index.ejs");
});

app.post("/get-location", async (req, res) => {
    try{
        const zipCode = req.body.zipCode;
        const iso = req.body.iso;
        const locResult = await axios.get(GEOAPI_URL, {
            params: {
                zip: `${zipCode},${iso}`,
                appid: API_TOKEN
            }
        });

        const {lat, lon} = locResult.data;

        const weatherResult = await axios.get(WEATHERAPI_URL, {
            params: {
                lat: lat,
                lon: lon,
                appid: API_TOKEN,
                units: "metric",
            },
        });

        console.log(weatherResult.data);
        res.render("index.ejs", { data: weatherResult.data});
    }catch(error){
        console.log(error.response.data);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});