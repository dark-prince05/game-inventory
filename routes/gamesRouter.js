const { Router} = require('express');
const { getAllGamesGet } = require('../controllers/gamesController');
const gameRouter = Router()

gameRouter.get('/', getAllGamesGet);

module.exports = gameRouter
