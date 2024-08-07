const express = require('express');
const pool = require('../../mysql-connector');

const routerRiegos = express.Router();

routerRiegos.get('/', (req, res) => {
    const getLogsRiegosDeElectrovalvulaQuery = `
        SELECT
        *
        FROM Log_Riegos AS l
        WHERE l.electrovalvulaId = ${req.query.electrovalvulaId};
    `;

    pool.query(getLogsRiegosDeElectrovalvulaQuery, (err, result, _) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        let riegos = [];
        for (x of result || []) {
            riegos.push({
                logRiegoId: x.logRiegoId,
                fecha: x.fecha,
                electrovalvulaId: x.electrovalvulaId,
                abierta: x.apertura === 1,
            });
        }
        res.send(riegos);
    });
});

routerRiegos.post('/', (req, res) => {
    const apertura = req.body.abierta ? 1 : 0;
    const electrovalvulaId = req.body.electrovalvulaId;
    const fecha = req.body.fecha;

    const insertLogRiegoQuery = `
        INSERT INTO Log_Riegos
        (apertura, fecha, electrovalvulaId)
        VALUES
        (${apertura}, '${fecha}', ${electrovalvulaId});
    `;

    pool.query(insertLogRiegoQuery, (err, _) => {
        if (err) {
            res.send(err).status(400);
            return;
        }

        res.status(201).end();
    });
});

module.exports = routerRiegos;