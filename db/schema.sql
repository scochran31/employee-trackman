DROP DATABASE IF EXISTS trackman;
CREATE DATABASE trackman;
USE trackman;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    dept_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE CASCADE
);


CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES employee_role(id)
    -- FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
