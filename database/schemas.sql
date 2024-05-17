-- Create database and tables
CREATE DATABASE Business_db;

-- Use the database
\c Business_db;

-- Create the table for departments
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- Create the table for employees
CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

-- create the table for roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);