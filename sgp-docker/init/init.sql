CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cadastro INT,
    nome VARCHAR(255),
    email VARCHAR(255),
    data_checkin DATE,
    data_checkout DATE,
    quarto VARCHAR(50),
    FOREIGN KEY (id_cadastro) REFERENCES cadastro(id)
);

CREATE TABLE cadastro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);