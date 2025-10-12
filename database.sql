
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  `desc` VARCHAR(255) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  amount DECIMAL(15,2) NOT NULL DEFAULT 0
);

--- Dummy Data --- IGNORE ---