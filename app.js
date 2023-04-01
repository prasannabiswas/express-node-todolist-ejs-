const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));  

app.use(express.static("public"));

var items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];

// app.get("/",(req,res)=>{
//     var today = new Date();
//     var currentDay = today.getDay();
//     var day = "";
//     var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//     if(currentDay===6||currentDay===0){
//         day = "Weekend";
//     }
//     else{
//         day = "Weekday";
//     }
//     res.render("list",{kindOfDay: day, whichDay: days[currentDay]});
// });

 app.get("/",(req,res)=>{
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list",{listTitle: day, newListItems: items});
 });

 app.post("/",(req,res)=>{

    item = req.body.newItem;

    if(req.body.list==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }  
    else{
        items.push(item);
        res.redirect("/");
    }    
});

// app.get("/",(req,res)=>{
//     res.sendFile(__dirname + "/index.html");
// });

app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work List", newListItems:workItems});
});

app.post("/work", (req,res)=>{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about",(req,res)=>{
    res.render("about");
});


app.listen(3000,()=>{
    console.log("Server running on port 3000");
});