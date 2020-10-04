const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const connection = mysql.createPool({
  host: process.env.NODE_BOOKLIST_HOST,
  user: process.env.NODE_BOOKLIST_USER,
  password: process.env.NODE_BOOKLIST_PASSWORD,
  database: process.env.NODE_BOOKLIST_DB,
  queueLimit: 0,
  waitForConnections: true
});
const navigation = [{ title: 'Books', link: '/books' }];
const bookRouter = require('./src/routes/book-routes')(navigation, connection);
const authRoutes = require('./src/routes/auth-routes')(connection);

const app = express();
const port = process.env.PORT || 3000;

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport')(app, connection);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/books', bookRouter);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
