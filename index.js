import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/3.0/onecall"

app.get("/",  async (req, res) => {
    try{
        const result = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`);
        res.render("index.ejs", { content : result.data});
    }catch(error){
        console.log(error.response.data);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});