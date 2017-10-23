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

  displayOptions();
});

function displayOptions(){
  inquirer.prompt([
  {
    type: "list",
    name: "option",
    message: "Select an option",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
  }
  ]).then(function(input){

    switch(input.option){
      case "View Products for Sale": {
        listAllProducts();
        break;
      }
      case "View Low Inventory": {
        listLowInventory();
        break;
      }
      case "Add to Inventory": {
        addToInventory();
        break;
      }
      case "Add New Product": {
        getAllDepartments(function(departments){
          addNewProduct(departments);
        });
        break;
      }
      case "Quit": {
        connection.end();
        break;
      }
    }
  });
}

function listAllProducts(){
  var query = connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.table(res);
    displayOptions();
  });
}

function listLowInventory(){
  var query = connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) throw err;

    console.table(res);
    displayOptions();
  });
}

function addToInventory(){
  inquirer.prompt([
  {
    name: "id",
    message: "Item ID to add more?",
  },
  {
    name: "addQuantity",
    message: "How many?",
  }
  ]).then(function(input){
    updateProductInventory(input.id, input.addQuantity);
  });
}

function updateProductInventory(id, quantity){
  var query = connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
    [
      quantity, id
    ], function(err, res) {
    if (err) throw err;

    console.log("\nAdded", quantity, "units to product with id:", id, "\n");
    displayOptions();
  });
}

function getAllDepartments(callBack){
  var query = connection.query("SELECT DISTINCT department_name FROM products", function(err, res) {
    if (err) throw err;

    var departments = res.map(function(row){
      return row.department_name;
    });

    if(typeof callBack === "function"){
      callBack(departments);
    }
  });
}

function addNewProduct(departments){
  inquirer.prompt([
  {
    name: "name",
    message: "Item name?",
  },
  {
    type: "list",
    name: "department",
    message: "Department?",
    choices: departments
  },
  {
    name: "unitPrice",
    message: "Unit Price?",
  },
  {
    name: "quantity",
    message: "Stock Quantity?",
  }
  ]).then(function(input){
    insertNewProduct(input.name, input.department, input.unitPrice, input.quantity);
  });
}

function insertNewProduct(name, department, unitPrice, stockQuantity){
  var query = connection.query("INSERT INTO products SET ?",
    {
      product_name: name,
      department_name: department,
      price: unitPrice,
      stock_quantity: stockQuantity
    },function(err, res) {
    if (err) throw err;

    console.log("\nitem '", name, "' added to department '", department, "'\n");
    displayOptions();
  });
}
