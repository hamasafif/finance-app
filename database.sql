CREATE DATABASE IF NOT EXISTS finance_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE finance_app;

-- =========================================================
-- TABLE: transactions
-- =========================================================
DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  `desc` VARCHAR(255) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;