CREATE TABLE subjects (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL
);

INSERT INTO
    subjects (id, name)
VALUES
    (0, 'Client-Side Development'),
    (1, 'Server-Side Development'),
    (2, 'Full-Stack Development'),
    (3, 'Agile Development & DevOps'),
    (4, 'Application Security'),
    (5, 'Mobile Application Development'),
    (6, 'Introduction Into Machine Learning'),
    (7, 'Capstone (Enterprise) Project'),
    (999, 'None')