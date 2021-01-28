const express = require('express'),
 bodyParser = require('body-parser'),
 {connectToDB,w3Topics} = require("./db"),
 {ObjectId} = require("mongodb"),
 app = express(),
 rp = require('request-promise'),
 $ = require('cheerio');

app.set("view engine","ejs");
app.use(bodyParser.json());

const url = 'http://www.w3schools.com';
let answer = {};

connectToDB((err,dbname)=>{
  if(err) return console.log(err);
  console.log(`Connected to ${dbname}`);
  rp(url)
  .then(async (html)=>{
    let heading = $('.w3-sidebar > .w3-bar-block > *',html);
    let num = heading.length;
    let curr = "";
    for(i=0;i<num;i++){
      if(heading[i].name=="div"){
        curr =String($(heading[i]).text().trim());
        answer[curr]= [];
      }
      if(heading[i].name=="a"){
        answer[curr].push(String($(heading[i]).text().trim()));
      }
    }
    await w3Topics().remove();
    await w3Topics().insertOne(answer);
  });

  app.get("/",(req,res)=>{
    res.render("home.ejs",{"body":"To see the data of w3schools sidebar, please click on the button below"});
  });

  app.get("/getData" ,async(req,res)=>{
    let answer = await w3Topics().find({}).toArray()
    res.render("index.ejs",{"topics":answer});
  });
 const server_port = process.env.PORT|| 3000 || 80;
  const server_host = '0.0.0.0' || 'localhost';
    app.listen(server_port, server_host, ()=>{ console.log(`listening on ${server_port}`);
    })
})
