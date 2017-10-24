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
    type: "list",
    name: "option",
    message: "Select an option",
    choices: ["View Product Sales by Department", "Create new Department", "Quit"]
  }
  ]).then(function(input){
    switch(input.option){
      case "View Product Sales by Department": {
        getProductSalesByDepartment();
        break;
      }
      case "Create new Department": {
        addNewDepartment();
        break;
      }
      case "Quit": {
        connection.end();
        break;
      }
    }
  });
}

function getProductSalesByDepartment(){

  // var queryStr = "SELECT department_id, department_name, over_head_costs, product_sales, " +
  // "(product_sales - over_head_costs) as total_profit FROM " + 
  // "(SELECT departments.department_id, departments.department_name, departments.over_head_costs, " +
  // "SUM(products.product_sales * products.price) AS product_sales FROM departments "+
  // "LEFT JOIN products ON departments.department_name = products.department_name  GROUP BY "+
  // "departments.department_id, departments.department_name, departments.over_head_costs) as total_sales";


  var queryStr = "SELECT department_id, department_name, over_head_costs, product_sales, total_revenue, " +
  "(total_revenue - over_head_costs) as total_profit FROM " + 
  "(SELECT departments.department_id, departments.department_name, departments.over_head_costs, "+
  "CASE WHEN SUM(products.product_sales * products.price) IS NULL THEN 0 " + 
  "ELSE  SUM(products.product_sales * products.price) END AS total_revenue, " + 
  "CASE WHEN SUM(products.product_sales) IS NULL THEN 0 ELSE SUM(products.product_sales) END AS product_sales " +
  "FROM departments " +
  "LEFT JOIN products ON departments.department_name = products.department_name  GROUP BY " +
  "departments.department_id, departments.department_name, departments.over_head_costs) as total_sales;"


  var query = connection.query(queryStr, function(err, res) {
    if (err) throw err;

    console.table(res);
    displayOptions();
  });
}

function addNewDepartment(){
  inquirer.prompt([
  {
    message: "Department Name?",
    name: "name"
  },
  {
    message: "Overhead cost of the department?",
    name: "overheadCost"
  }
  ]).then(function(input){
    insertNewDepartment(input.name, input.overheadCost);
  });
}

function insertNewDepartment(name, overheadCost){
  var query = connection.query("INSERT INTO departments SET ?",
  {
    department_name: name,
    over_head_costs: overheadCost
  },function(err, res) {
    if (err) throw err;

    console.log("\n","New department '"+ name +"' added to bamazon!!", "\n");
    displayOptions();
  });
}


