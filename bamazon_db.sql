DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ice cream", "produce", 1.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kale", "produce", 1.50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apples", "produce", 2.00, 30);
