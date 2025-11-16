const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS game_inventory(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  category VARCHAR(50),
  price INTEGER,
  stock INTEGER,
  filepath TEXT
);

INSERT INTO game_inventory (name, category, price, stock, filepath) 
VALUES 
  ('God of War', 'action adventure open-world', 3000, 2, 'https://kcgycirpyfagnxwbdgmv.supabase.co/storage/v1/object/public/game-inventory/games/1762996623298_god%20of%20war.jpg'),
  ('GTA 5', 'adventure open-world shooting', 2500, 4, 'https://kcgycirpyfagnxwbdgmv.supabase.co/storage/v1/object/public/game-inventory/games/1762996869691_Grand_Theft_Auto_V.png'),
  ('Elden Ring', 'adventure role-playing', 2800, 3, 'https://kcgycirpyfagnxwbdgmv.supabase.co/storage/v1/object/public/game-inventory/games/1762996804318_elden%20ring.webp');
`;

const main = async () => {
  console.log("seeding");
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false},
  });
 try {
    await client.connect();
    console.log("Connected to database");
    
    await client.query(SQL);
    console.log("Seeding successful");
    
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
};

main();
