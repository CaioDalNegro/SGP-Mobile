CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    data_checkin DATE NOT NULL,
    data_checkout DATE NOT NULL,
    quarto VARCHAR(10) NOT NULL
);