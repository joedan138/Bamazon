//-----------------------------------------------------
// dependencies
//-----------------------------------------------------
require("dotenv").config();
var inquirer = require('inquirer');
var mysql = require("mysql");

//-----------------------------------------------------
// variables
//-----------------------------------------------------
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "bamazon"
});

//-----------------------------------------------------
// Code
//-----------------------------------------------------
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
  showInventory();
})

//-----------------------------------------------------
// Functions
//-----------------------------------------------------

function showInventory() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log("Item #: " + results[i].item_id + "|" +
        "Product: " + results[i].product_name + "|" +
        "Department: " + results[i].department_name + "|" +
        "Price: " + "$" + results[i].price + "|" +
        "Quantity In Stock: " + results[i].inventory_qty);
      console.log("--------------------------------------------------------------------------------");
    }
    buyItem();
  })
}

function buyItem() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer.prompt([{
      type: 'input',
      name: 'product_id',
      message: 'Please enter a product ID from the table above.',
      validate: function (value) {
        if (isNaN(value) === false && value <= results.length) {
          return true;
        }
        return false;
      }
    },
    {
      type: "input",
      name: "quantity",
      message: "How many would you like to buy? (quantity)",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }]).then(function (answer) {
      connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(answer.product_id)) {
            chosenItem = results[i];
          }
        }
        if (chosenItem.inventory_qty >= parseInt(answer.quantity)) {
          console.log("\n\n\n\n\n\nYour total is $" + parseInt(answer.quantity) * chosenItem.price + ". Pay up fool!\n");
          console.log("Line 84. quantity to buy is " + answer.quantity)
          inquirer.prompt([{
            type: 'rawlist',
            name: 'pay',
            message: 'Are you gonna pay or not?',
            choices: ["Of course my man! Here is your money...", "Heck no chump, deal with it!"]
          }]).then(function (answer2) {
            if (answer2.pay === "Of course my man! Here is your money...") {
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    inventory_qty: (chosenItem.inventory_qty - answer.quantity)
                  },
                  {
                    item_id: chosenItem.item_id
                  }
                ],
                function (error) {
                  if (error) console.log(error);
                  console.log("You live to buy another day");
                  console.log("\n\n\n\n\n");
                  showInventory();
                }
              );
            }
            else {
              console.log("You get sucker punched and wake up a day later with no money and your left shoe is gone")
              console.log("\n\n\n\n\n");
              showInventory();
            }
          });
        }
        else {
          console.log("\n\n\n\n\n\nTough luck buttercup, we don't have enough. Try again \n\n\n\n\n\n");
          showInventory();
        }

      })
    });
  });
}