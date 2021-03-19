const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('mongoose-type-email');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb+srv://arya-admin:test123@cluster0.e002p.mongodb.net/customerDB", {useNewUrlParser: true, useUnifiedTopology: true});

const Customer = mongoose.model('Customer', {
  name: String,
  email: mongoose.SchemaTypes.Email,
  currentBalance: Number
});

const cust1 = new Customer({
  name: "Arya Sinha",
  email: "iaryasinha2001@gmail.com",
  currentBalance: 20000
});

const cust2 = new Customer({
  name: "Aditya Sinha",
  email: "iadiyasinha1999@gmail.com",
  currentBalance: 32000
});

const cust3 = new Customer({
  name: "John ",
  email: "john2001@yahoo.com",
  currentBalance: 12000
});


const cust4 = new Customer({
  name: "Tessa",
  email: "tessahere78@gmail.com",
  currentBalance: 9000
});


const cust5 = new Customer({
  name: "Harry Markel",
  email: "styles1994@gmail.com",
  currentBalance: 72000
});


const cust6 = new Customer({
  name: "Johseph Weasly",
  email: "mejosheph10@gmail.com",
  currentBalance: 45000
});


const cust7 = new Customer({
  name: "Sheldon Junior",
  email: "sheldonfire89@hotmail.com",
  currentBalance: 80000
});

const cust8 = new Customer({
  name: "Michel",
  email: "mymichel90@gmail.com",
  currentBalance: 100000
});

const cust9 = new Customer({
  name: "Liam ",
  email: "iliam44@gmail.com",
  currentBalance: 85000
});

const cust10 = new Customer({
  name: "Cole Dylan",
  email: "cole90@gmail.com",
  currentBalance: 97000
});

console.log("Hey!");

const defaultItems = [cust1,cust2,cust3,cust4,cust5,cust6,cust7,cust8,cust9,cust10];

app.get("/money-transfer",function(req,res){
  Customer.find({}, function(err, foundItems){
    if(foundItems.length == 0){
      Customer.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Successfully Inserted default items");
        }
      });
      res.redirect("/money-transfer");
    }
     else{
       res.render("customers", { newListItems: foundItems});
     }
  });

});

app.get("/",function(req,res){
  Customer.find({},function(err, people){
    if(err){
      console.log(err);
    }

    else{
      res.render("home", { newPeople: people});
    }
  });
});



app.post("/money-transfer",function(req,res){
  // res.redirect("/");
  const amount = req.body.money;
  const Sender = req.body.sender;
  const Receiver = req.body.receiver;

  let num1 = 0;
  let num2 = 0;
  console.log("hey!");

 Customer.findOne({name: Sender}, function(err, send){
   num1 = send.currentBalance;

   num1 = parseInt(num1) - parseInt(amount);

   Customer.updateOne({name: Sender}, {
     $set: {currentBalance: num1}}, function(err, res) {
     if (err) throw err;
     console.log("Sender document updated");

   });

 });

 Customer.findOne({name: Receiver}, function(err, receive){
   num2 = receive.currentBalance;

   num2 = parseInt(num2) + parseInt(amount);

   Customer.updateOne({name: Receiver}, {
     $set: {currentBalance: num2}}, function(err, res) {
     if (err) throw err;
     console.log("Receiver document updated");

   });

 });
 res.redirect("/money-transfer");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function(){
  console.log("Server has started Successfully!!");
});
