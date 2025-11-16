const { Router } = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {
  getAllGamesGet,
  getAllCategoryGamesGet,
  addGamePost,
  addGameGet,
  updateGameGet,
  updateGamePatch,
  deleteGameDelete,
} = require('../controllers/gamesController');
const gameRouter = Router();

gameRouter.get('/', getAllGamesGet);
gameRouter.get('/games/:category', getAllCategoryGamesGet);
gameRouter.get('/add-game', addGameGet);
gameRouter.post('/add-game', upload.single('image'), addGamePost);
gameRouter.get('/edit-game', updateGameGet);
gameRouter.post('/edit-game', upload.single('image'), updateGamePatch);
gameRouter.post('/delete-game', deleteGameDelete);

module.exports = gameRouter;
