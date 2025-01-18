import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config';

console.log(process.env);

const app = express();
const port = 3000;
const WEATHERAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_TOKEN = process.env.API_TOKEN;
const iso = "PH";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true}));

app.get("/",  async (req, res) => {
    res.render("index.ejs");
});

app.post("/get-weather", async (req, res) => {
    try{
        const city = req.body.city;
        const weatherResult = await axios.get(WEATHERAPI_URL, {
            params: {
                q: `${city},${iso}`,
                appid: API_TOKEN,
                units: "metric",
            },
        });

        console.log(weatherResult.data);
        res.render("index.ejs", { data: weatherResult.data});
    }catch(error){
        console.log(error.response.data);
        res.render("index.ejs", {
            status: error.response.status,
            error: error.response.data.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});