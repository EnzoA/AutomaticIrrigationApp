//=======[ Settings, Imports & Data ]==========================================

const PORT = 3000;
const cors = require('cors');
const express = require('express');

const app = express();
const jwt = require('jsonwebtoken');

const routerDispositivo = require('./routes/dispositivo');
const routerElectrovalvula = require('./routes/electrovalvula');
const routerRiegos = require('./routes/riego');
const routerMediciones = require('./routes/medicion');

const YOUR_SECRET_KEY = 'mi llave';
const testUser = { username: 'test', password: '1234' };

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const authenticator = (req, res, next) => {
    const autHeader = req.headers.authorization || '';
    let token = '';
    if (autHeader.startsWith('Bearer ')) {
        token = autHeader.split(' ')[1];
    } else {
        return res.status(401).send({ message: 'A Bearer token is required'});
    }
    jwt.verify(token, YOUR_SECRET_KEY, (err) => {
        if (err) {
            return res.status(403).send({ message: 'Invlid token'});
        }
        next();
    });
}

app.use(express.json()); 
app.use(express.static('/home/node/app/static/'));
app.use(cors(corsOptions));
app.use('/dispositivos', authenticator, routerDispositivo);
app.use('/electrovalvulas', authenticator, routerElectrovalvula);
app.use('/logriegos', authenticator, routerRiegos);
app.use('/mediciones', authenticator, routerMediciones);

//=======[ Main module code ]==================================================

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

app.listen(PORT, function(req, res) {
    console.log('NodeJS API running correctly');
});
