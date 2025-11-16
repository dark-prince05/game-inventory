const pool = require('./pool');

const getAllGames = async () => {
  const { rows } = await pool.query('SELECT * FROM game_inventory');
  if (rows) return rows;
  else return [];
};

const getGame = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM game_inventory WHERE id = ($1)',
    [id],
  );
  return rows;
};

const insertGame = async (name, category, price, stock, filepath) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO game_inventory (name, category, price, stock, filepath)
      VALUES ($1, $2, $3, $4, $5)`,
      [name, category, price, stock, filepath],
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const updateGame = async (id, name, category, price, stock, filepath) => {
  try {
    const fields = ['name = $2', 'category = $3', 'price = $4', 'stock = $5']
    const values = [id, name, category, price, stock];

    if ( filepath ){
      fields.push('filepath = $6')
      values.push(filepath)
    }
    const QUERY = `UPDATE game_inventory 
                    SET ${fields.join(", ")} 
                    WHERE id = $1`;
    const result = await pool.query(QUERY, values);
    if (result.rowCount > 0) {
      console.log('Game updated successfully');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Error updating game', err);
  }
};

const deleteGame = async (id) => {
  try {
    const result = await pool.query('DELETE FROM game_inventory WHERE id = $1', [id])
    return result.rowCount > 0;
  } catch (err) {
    console.log('Error deleting game', err)
  }
}

module.exports = {
  getAllGames,
  insertGame,
  getGame,
  updateGame,
  deleteGame,
};
