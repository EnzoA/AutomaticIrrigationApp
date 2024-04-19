const express = require('express');
const pool = require('../../mysql-connector');

const routerElectrovalvula = express.Router();

routerElectrovalvula.patch('/:id', (req, res) => {
    const valuesToUpdate = [];
    Object.keys(req.body).forEach(key => {
        valuesToUpdate.push(`${key} = ${req.body[key]}`);
    });
    
    let updateElectrovalvulaQuery = 'UPDATE Electrovalvulas SET ';
    updateElectrovalvulaQuery += valuesToUpdate.join(', ');
    updateElectrovalvulaQuery += ' WHERE electrovalvulaId = ' + parseInt(req.params.id);

    pool.query(updateElectrovalvulaQuery, (err, _) => {
        if (err) {
            res.send(err).status(400);
            return;
        }

        res.status(204).end();
    });
});

module.exports = routerElectrovalvula;