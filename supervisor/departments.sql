USE bamazon;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INT 0,

  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs) VALUES ("Books", 50);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Furniture", 500);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Kitchen & Dining", 100);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Toys", 70);