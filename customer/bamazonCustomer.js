var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

connection.connect(function(err){
  if (err) throw err;

  listAllProducts();
});

function endConnection(){
  connection.end();
}

function listAllProducts(){
  var query = connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.table(res);
    displayOptions();
  });
}

function displayOptions(){

  inquirer.prompt([
  {
    name: "id",
    message: "Item ID to purchase? [Quit with Q]",
    validate: function(value) {
      var quitPattern = new RegExp("^[qQ]$");
      var numberPattern = new RegExp("^[0-9]+$");

      if(quitPattern.test(value)){
        connection.end();
        process.exit(1);
      }
      else if(numberPattern.test(value)){
        return true;
      }
      return false;
    }
  },
  {
    name: "purchaseQuantity",
    message: "How many? [Quit with Q]",
    validate: function(value) {
      var quitPattern = new RegExp("^[qQ]$");
      var numberPattern = new RegExp("^[0-9]+$");

      if(quitPattern.test(value)){
        connection.end();
        process.exit(1);
      }
      else if(numberPattern.test(value)){
        return true;
      }
      return false;
    }
  }
  ]).then(function(input){
    purchaseProduct(input.id, input.purchaseQuantity);
  });
}

function purchaseProduct(id, quantity){
  var query = connection.query("SELECT * from products WHERE ?", {item_id: id}, 
    function(err, res) {
      if (err) throw err;

      if(res.length === 0){
        console.log(colors.red.bold("\nThere is no item with id", id, "exists in bamazon!\n"));
        return listAllProducts();
      }
      
      var stockQuantity = parseInt(res[0].stock_quantity);
      var productName = res[0].product_name;
      var unitPrice = parseFloat(res[0].price);

      var purchaseQuantity = parseInt(quantity);

      if(stockQuantity < purchaseQuantity){
        console.log(colors.red.bold("\nInsufficient Quantity!\n"));
        return listAllProducts();
      }

      query = connection.query("UPDATE products SET ? WHERE ?", 
        [
        {
          stock_quantity: stockQuantity - purchaseQuantity,
          product_sales: purchaseQuantity
        }, 
        {
          item_id: id
        }
        ], 
        function(err, res){
          if (err) throw err;

          console.log(colors.green.bold("\nYou have purchased", purchaseQuantity, productName + "'s.", 
            "Total cost:", unitPrice * purchaseQuantity, "\n"));
          listAllProducts();
        });
    });
}
