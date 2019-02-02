var express = require('express');
var app = express();

var request = require('request');

port = process.env.PORT || 3000;
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("search");
});

app.get("/results", (req,res)=>{
    var term = req.query.search;
    request( `http://www.omdbapi.com/?s=${term}&apikey=thewdb`,(error,response,body)=>{
        if(!error&&response.statusCode===200){
        var data = JSON.parse(body);
        res.render("results",{data: data});
    }
    });
});

app.listen(port, () =>{
console.log(`Server is up on port ${port}`);
});