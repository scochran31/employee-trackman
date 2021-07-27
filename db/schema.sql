DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    dept_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE CASCADE
);


CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY(id),

-- Sets the relationship between the employee table and the role table
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employee(id) ON DELETE SET NULL,
-- Self references manager with employee in the employee table
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);