const express = require('express');
const pool = require('../../mysql-connector');

const routerDispositivo = express.Router();

routerDispositivo.get('/', (req, res) => {
    pool.query('Select * From Dispositivos;', (err, result, fields) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

routerDispositivo.get('/:id', (req, res) => {
    pool.query('Select * From Dispositivos Where dispositivoId = ' + req.params.id + ' Limit 1;', (err, result, fields) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result[0]);
    });
});

module.exports = routerDispositivo;