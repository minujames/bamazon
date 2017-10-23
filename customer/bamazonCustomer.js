var mysql = require("mysql");
var inquirer = require("inquirer");
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
  console.log("connected as id " + connection.threadId);

  listAllProducts();
});

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
    message: "Item ID to purchase?",
  },
  {
    name: "purchaseQuantity",
    message: "How many?",
  }
  ]).then(function(input){
    purchaseProduct(input.id, input.purchaseQuantity);
  });
}

function purchaseProduct(id, quantity){
  var query = connection.query("SELECT stock_quantity from products WHERE ?", {item_id: id}, 
    function(err, res) {
      if (err) throw err;

      var stockQuantity = parseInt(res[0].stock_quantity);
      var purchaseQuantity = parseInt(quantity);
      if(stockQuantity < purchaseQuantity){
        console.log("\nInsufficient Quantity!\n");
        listAllProducts();
      }
      else{
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
        });
        listAllProducts();
      }
    });
}
