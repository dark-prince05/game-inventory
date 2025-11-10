const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS game_inventory(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  category VARCHAR(50),
  price INTEGER,
  stock INTEGER
);

INSERT INTO game_inventory (name, category, price, stock) 
VALUES 
  ('God of War', 'action adventure open-world', 3000, 2),
  ('GTA 5', 'adventure open-world shooting', 2500, 4),
  ('Elden Ring', 'adventure role-playing', 2800, 3);
`;

const main = async () => {
  console.log("seeding");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("seeding successfull");
};

main();
