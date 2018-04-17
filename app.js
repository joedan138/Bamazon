//-----------------------------------------------------
// dependencies
//-----------------------------------------------------
var inquirer = require('inquirer');
var mysql = require("mysql");

//-----------------------------------------------------
// variables
//-----------------------------------------------------


//-----------------------------------------------------
// Code
//-----------------------------------------------------

inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'product_id',
      message: 'Which item would you like to buy?',
      choices: [
        'Order a pizza',
        'Make a reservation',
        new inquirer.Separator(),
        'Ask opening hours',
        'Talk to the receptionist'
      ]
    },
    {
      type: 'rawlist',
      name: 'size',
      message: 'What size do you need',
      choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
      filter: function(val) {
        return val.toLowerCase();
      }
    }
  ])