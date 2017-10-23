DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  product_sales INT DEFAULT 0,
  stock_quantity INT DEFAULT 0,

  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
  ("Goodnight Mooon", "Books", "6.85", 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("The Very Hungry Caterpillar", "Books", "8", 18);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Oh The Places You'll Go!", "Books", "15.09", 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Table", "Furniture", "200", 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Chair", "Furniture", "75", 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Bed", "Furniture", "399.75", 25);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Digital Slow Cooker", "Kitchen & Dining", "32.99", 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Blender", "Kitchen & Dining", "199.99", 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Non-Stick Fry Pan", "Kitchen & Dining", "48.89", 60);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Touch and Learn Activity Desk", "Toys", "40", 35);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Musical Rainbow Tea Set", "Toys", "19.30", 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("LEGO City Fire Ladder Truck", "Toys", "19.99", 6);






