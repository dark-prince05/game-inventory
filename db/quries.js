const pool = require("./pool");

const getAllGames = async () => {
  const { rows } = await pool.query("SELECT * FROM game_inventory");
  if(rows) return rows;
  else return [];
};

module.exports = {
  getAllGames,
};
