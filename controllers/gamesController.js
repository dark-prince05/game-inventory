const db = require('../db/queries');
const supabase = require('../db/supabase');

const getAllGamesGet = async (req, res) => {
  const games = await db.getAllGames();
  res.render('index', {
    title: 'Odin-Gstore',
    games,
    heading: 'All games',
    category: true,
    isForm: false,
    isEdit: false,
    adminPassword: process.env.ADMIN_PASSWORD
  });
};

const getAllCategoryGamesGet = async (req, res) => {
  const games = await db.getAllGames();
  const { category } = req.params;
  const gameList = [];
  games.forEach((game) => {
    if (game.category.includes(category)) {
      gameList.push(game);
    }
  });

  res.render('index', {
    title: 'Odin-Gstore',
    games: gameList,
    heading: `${category} games`,
    category: false,
    isForm: false,
    isEdit: false,
    adminPassword: process.env.ADMIN_PASSWORD
  });
};

const addGameGet = async (req, res) => {
  const games = await db.getAllGames();
  res.render('index', {
    title: 'Odin-Gstore',
    games,
    heading: 'Add Game',
    category: false,
    isForm: true,
    isEdit: false,
  });
};

const addGamePost = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;
    const file = req.file;

    const categories = category
      .split(',')
      .map((c) => c.trim())
      .join(' ');

    if (file) {
    const filePath = `games/${Date.now()}_${file.originalname}`;
    const { data, error } = await supabase.storage
      .from('game-inventory')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from('game-inventory')
      .getPublicUrl(filePath);

      await db.insertGame(name, categories, price, stock, publicUrl.publicUrl)
    } else {
      const defaultImgUrl = "https://kcgycirpyfagnxwbdgmv.supabase.co/storage/v1/object/public/game-inventory/games/gamepad.jpg" 
      await db.insertGame(name, categories, price, stock, defaultImgUrl)
    }

    res.redirect('/')
  } catch (err) {
    console.log(err);
    res.status(500).send('Error adding game', err);
  }
};

const updateGameGet = async (req, res)  => {
  const { id } = req.query;
  const game = await db.getGame(id);
  res.render('index', {
    title: 'Odin-Gstore',
    games: game,
    heading: 'Add Game',
    category: false,
    isForm: true,
    isEdit: true,
  });
}

const updateGamePatch = async (req, res) => {
  try {
    const { id, name, category, price, stock } = req.body;
    const file = req.file;

    const categories = category
      .split(',')
      .map((c) => c.trim())
      .join(' ');

    if (file) {
    const filePath = `games/${Date.now()}_${file.originalname}`;
    const { data, error } = await supabase.storage
      .from('game-inventory')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from('game-inventory')
      .getPublicUrl(filePath);

      await db.updateGame(id, name, categories, price, stock, publicUrl.publicUrl)
    }else {
      await db.updateGame(id, name, categories, price, stock)
    }

    res.redirect('/')
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating game', err);
  }
}

const deleteGameDelete = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await db.deleteGame(id);
    console.log(result)
    if(result) res.redirect("/")
    else res.status(403).send('cannot delete game')
  } catch (err) {
    res.status(500).send('Error deleting game', err)
  }
}

module.exports = {
  getAllGamesGet,
  getAllCategoryGamesGet,
  addGameGet,
  addGamePost,
  updateGameGet,
  updateGamePatch,
  deleteGameDelete
};
