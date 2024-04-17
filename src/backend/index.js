//=======[ Settings, Imports & Data ]==========================================

const PORT = 3000;

const cors = require('cors');

const express = require('express');
const app = express();
const pool = require('./mysql-connector');
const jwt = require('jsonwebtoken');
const routerDispositivo = require('./routes/dispositivo');

const YOUR_SECRET_KEY = 'mi llave';
const testUser = { username: 'test', password: '1234' };

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const authenticator = function(req, res, next) {
    const autHeader = req.headers.authorization || '';
    let token = '';
    if (autHeader.startsWith('Bearer ')) {
        token = autHeader.split(' ')[1];
    } else {
        res.status(401).send({ message: 'Se requiere un token de tipo Bearer'});
    }
    jwt.verify(token, YOUR_SECRET_KEY, function(err) {
        if (err) {
            res.status(403).send({ message: 'Token inválido'});
        }
    })
    next();
}

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));
// to enable cors
app.use(cors(corsOptions));

app.use('/dispositivo', routerDispositivo);

//=======[ Main module code ]==================================================

app.get('/', function(req, res, next) {
    res.send({ 'mensaje': 'Hola DAM' }).status(200);
});

app.post('/login', (req, res) => {
    if (req.body) {
        const user = req.body;

        if (user && testUser.username === user.username && testUser.password === user.password) {
            const token = jwt.sign(user.username, YOUR_SECRET_KEY);
            res.status(200).send({
                signed_user: user.username,
                token: token
            });
        } else {
            res.status(403).send({
                errorMessage: 'Auth required'
            });
        }
    } else {
        res.status(403).send({
            errorMessage: 'Se requiere un usuario y contraseña'
        })
    }
});

app.get('/user/', function(req, res, next) {
    pool.query('Select * from Usuarios', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

app.get('/prueba', authenticator, function(req, res) {
    res.send({ message: 'Está autenticado, accede a los datos' });
});

app.listen(PORT, function(req, res) {
    console.log('NodeJS API running correctly');
});
