drop database if exists employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL,
name varchar(30) NOT NULL,
PRIMARY KEY(id)
);
CREATE TABLE role(
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary decimal,
departmentId int, 
FOREIGN KEY(departmentId) REFERENCES department(id),
PRIMARY KEY(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
firstName VARCHAR(30),
lastName  VARCHAR(30),
roleId	INT,
managerId INT,
PRIMARY KEY(id),
FOREIGN KEY(roleId) REFERENCES role(id),
FOREIGN KEY(managerId) REFERENCES employee(id)
);



