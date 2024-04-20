const express = require('express');
const pool = require('../../mysql-connector');

const routerMediciones = express.Router();

routerMediciones.post('/', (req, res) => {
    const fecha = req.body.fecha;
    const valor = req.body.valor < 0 ? 0 : Math.min(req.body.valor, 100);
    const dispositivoId = req.body.dispositivoId;

    const insertMedicionQuery = `
        INSERT INTO Mediciones
        (fecha, valor, dispositivoId)
        VALUES
        ('${fecha}', ${valor}, ${dispositivoId});
    `;

    pool.query(insertMedicionQuery, (err, _) => {
        if (err) {
            res.send(err).status(400);
            return;
        }

        res.status(201).end();
    });
});

routerMediciones.post('/actualizarUltimaMedicionDeDispositivo', (req, res) => {
    const updateMedicionQuery = `
        UPDATE Mediciones SET
        valor = ${req.body.valor}
        WHERE dispositivoId = ${req.body.dispositivoId};
    `;

    pool.query(updateMedicionQuery, (err, _) => {
        if (err) {
            res.send(err).status(400);
            return;
        }

        res.status(204).end();
    });
});

module.exports = routerMediciones;