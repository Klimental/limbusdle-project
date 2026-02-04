CREATE TABLE IF NOT EXISTS sinners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS identities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sinner_id INT,
    name VARCHAR(255) NOT NULL,
    rarity VARCHAR(10),
    season VARCHAR(50),
    faction VARCHAR(100),
    skill1 VARCHAR(50),
    skill2 VARCHAR(50),
    skill3 VARCHAR(50),
    defense VARCHAR(50),
    image_path VARCHAR(255),
    FOREIGN KEY (sinner_id) REFERENCES sinners(id) ON DELETE CASCADE
);