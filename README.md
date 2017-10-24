# bamazon - node mysql app
This is a command line node app for Amazon-like storefront with MySQL as backend.
This app has three user views *Customer*, *Manager* and *Supervisor*

### Features
* Customer
  * The app will take in orders from customers and deplete stock from the store's inventory
  * If item stock is less than the purchase quantity specified, an insufficient quantity message is shown to the customer.
  * After successful purchase the total cost of their purchase is shown to the customer.
* Manager
  * View Products for Sale - lists every available item in the store
  * View Low Inventory - shows all the products with an inventory count lower than five.
  * Add to Inventory - A prompt is displayed that will let "add more" of any item currently in the store by ID.
  * Add New Product - A new product can be added to the store.
* Supervisor
  * View Product Sales by Department - It will display a summarized table of revenue and profit by department.
  * Create New Department - It allows supervisor to add a completely new department to the store

* Regular expressions are used to validate user input
* node console.table package is used to display the database tables to console
* node colors package is used to highlight messages

### Demo Videos

* [![Customer view](https://github.com/minujames/bamazon/blob/master/videos/customer.mov)](https://github.com/minujames/bamazon/blob/master/videos/customer.mov)
* [![Manager view](https://github.com/minujames/bamazon/blob/master/videos/manager.mov)](https://github.com/minujames/bamazon/blob/master/videos/manager.mov)
* [![Supervisor view](https://github.com/minujames/bamazon/blob/master/videos/supervisor.mov)](https://github.com/minujames/bamazon/blob/master/videos/supervisor.mov)


## Built With
* [JavaScript](https://www.javascript.com/)
* [Node](https://nodejs.org/en/)
  * [inquirer](https://www.npmjs.com/package/inquirer)
  * [colors](https://www.npmjs.com/package/colors)
  * [mysql](https://www.npmjs.com/package/node-mysql)
  * [console.table](https://www.npmjs.com/package/console.table)
* [MySQL](https://www.mysql.com/)

## Author
[Minu James](https://minujames.github.io/)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details





