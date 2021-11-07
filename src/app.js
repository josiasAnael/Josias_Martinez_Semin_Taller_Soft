const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();

const clienteRoutes = require('./routes/cliente');
const municipioRoutes = require('./routes/municipio')

app.set('port', process.env.PORT || 11001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'devuser',
  password: '123ABcd.',
  port: 3306,
  database: 'josias_martinez_db'
}, 'single'));
app.use(express.urlencoded({extended: false}));

app.use('/', clienteRoutes);
app.use('/municipio', municipioRoutes)

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
