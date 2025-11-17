CREATE DATABASE IF NOT EXISTS hyveepharm;
USE hyveepharm;

DROP TABLE IF EXISTS prescriptions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount VARCHAR(100),
    time_to_take VARCHAR(100),
    description VARCHAR(255),
    
    user_id INT NOT NULL,
    
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
);

INSERT INTO users (name) VALUES 
    ('Sheinddide');

INSERT INTO prescriptions (user_id, name, amount, time_to_take, description)
VALUES
    (1, 'Lisinopril', '10 mg', 'Once daily in morning', 'For high blood pressure'),
    (1, 'Amoxicillin', '250 mg', 'Every 8 hours', 'For infection. Finish all.'),
    (1, 'Metformin', '500 mg', 'Twice daily with meals', 'For diabetes');