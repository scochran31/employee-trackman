INSERT INTO departments (title)
VALUES
    ('HR'),
    ('Sales'),
    ('Web Development'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Salesperson', 80000, 1),
    ('Sales Lead', 100000, 1),
    ('Software Engineer', 120000, 3),
    ('Lead Engineer', 150000, 3),
    ('Accountant', 125000, 2),
    ('Lawyer', 190000, 4),
    ('Legal Team Lead', 250000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
	('John', 'Doe', 2, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 4, NULL),
    ('Kevin', 'Tupik', 3, 3),
    ('Malia', 'Brown', 5, NULL),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 6, 6);