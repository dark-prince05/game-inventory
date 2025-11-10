const db = require('../db/quries')

const getAllGamesGet = async (req, res) => {
  const games = await db.getAllGames();
  res.render('index', { title: "Odin-Gstore", games: games})
}

module.exports = {
  getAllGamesGet
}
