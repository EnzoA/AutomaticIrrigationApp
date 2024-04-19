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
    const getDispositivoQuery = `
        SELECT
        d.*,
        m.valor,
        e.abierta
        FROM Dispositivos AS d
        LEFT JOIN (
            SELECT m.dispositivoId, m.valor
            FROM Mediciones AS m
            WHERE m.dispositivoId = ${req.params.id}
            ORDER BY m.fecha DESC
            LIMIT 1
        ) AS m ON d.dispositivoId = m.dispositivoId
        LEFT JOIN Electrovalvulas AS e ON e.electrovalvulaId = d.electrovalvulaId
        WHERE d.dispositivoId = ${req.params.id};
    `;
    pool.query(getDispositivoQuery, (err, result, fields) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        const dispositivo = result[0];
        res.send({
            dispositivoId: dispositivo.dispositivoId,
            nombre: dispositivo.nombre,
            ubicacion: dispositivo.ubicacion,
            electrovalvulaId: dispositivo.electrovalvulaId,
            ultimaMedicion: dispositivo.valor,
            electrovalvulaAbierta: dispositivo.abierta === 1,
        });
    });
});

module.exports = routerDispositivo;