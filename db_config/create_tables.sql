DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_alias;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS product_price;
DROP TABLE IF EXISTS product_picture;
DROP TABLE IF EXISTS product_stock;
DROP TABLE IF EXISTS order;
DROP TABLE IF EXISTS order_complete;

CREATE TABLE user (
  email VARCHAR(128) NOT NULL,
  password VARCHAR(255) NOT NULL
  PRIMARY KEY (email)
);

CREATE TABLE user_alias(
  
);
CREATE TABLE product();
CREATE TABLE product_price();
CREATE TABLE product_picture();
CREATE TABLE product_stock();
CREATE TABLE order();
CREATE TABLE order_complete();
