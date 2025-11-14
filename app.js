const express = require('express')
const app = express();
require('dotenv').config()
const path = require('path');
const gameRouter = require('./routes/gamesRouter');

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/', gameRouter)

app.listen(8000, () => console.log("server is running 8000"))
