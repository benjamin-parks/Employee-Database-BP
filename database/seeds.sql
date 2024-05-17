-- insert into schemas
-- CREATE TABLE IF NOT EXISTS employee (
--     id SERIAL PRIMARY KEY,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     salary INT NOT NULL,
--     department_id INT NOT NULL,
--     FOREIGN KEY (department_id) REFERENCES departments (id)
-- );

INSERT INTO departments (department_name) VALUES ('HR'), ('Finance'), ('IT'), ('Marketing'), ('Sales');


INSERT INTO employee (first_name, last_name, salary, department_id) VALUES ('John', 'Doe', 50000, 1), ('Jane', 'Doe', 60000, 2), ('Jim', 'Doe', 70000, 3), ('Jill', 'Doe', 80000, 4), ('Jack', 'Doe', 90000, 5);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

INSERT INTO roles (title, department_id) VALUES ('HR Manager', 1), ('Finance Manager', 2), ('IT Manager', 3), ('Marketing Manager', 4), ('Sales Manager', 5);