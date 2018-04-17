-- deletes any current databases with same name. Do not run if you have a DB with this name. you big dummy
DROP DATABASE IF EXISTS bamazon;

-- creates the bamazon database and makes sure it is used for the rest of the query.
CREATE DATABASE bamazon;
USE bamazon;

-- table is created with an auto incrementing primary key
CREATE TABLE products
(   item_id MEDIUMINT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NULL,
    price DECIMAL(13,2) NULL,
    inventory_qty INT NULL,
    PRIMARY KEY(item_id)
);

-- inserting sample data into the table. 
INSERT INTO products (product_name, department, price, inventory_qty) 
 
VALUES 
("mouse pad", "electronics", 7.47, 30), 
("mechanical keyboard", "electronics", 50.33, 25), 
("cat nip", "pet supplies", 6.40, 40), 
("fidget spinner", "toys", 2.50, 100), 
("headphones", "electronics", 83.24, 75), 
("legos", "toys", 21.92, 20), 
("shovel", "outdoors", 20.22, 30), 
("toilet paper", "house supplies", 6.43, 78), 
("Ten pound bag of gummi bears", "food", 7.87, 5), 
("Crayons", "toys", 3.45, 23), 
("iPad", "electronics", 420.21, 12);



