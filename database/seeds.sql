INSERT INTO departments (department_name) VALUES ('HR'), ('Finance'), ('IT'), ('Marketing'), ('Sales');


INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 100000, 1), ('HR Specialist', 75000, 1), ('Finance Manager', 120000, 2), ('Finance Specialist', 80000, 2), ('IT Manager', 110000, 3), ('IT Specialist', 90000, 3), ('Marketing Manager', 105000, 4), ('Marketing Specialist', 85000, 4), ('Sales Manager', 115000, 5), ('Sales Specialist', 95000, 5);


INSERT INTO employee (first_name, last_name, role_id, department_id) VALUES ('John', 'Doe', 1, 1), ('Jane', 'Doe', 2, 2), ('Jim', 'Doe', 3, 3), ('Jill', 'Doe', 4, 4), ('Jack', 'Doe', 5, 5);