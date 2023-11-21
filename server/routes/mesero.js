const express = require('express');
const router = express.Router();

const connection = require('../connection'); //Llamada a archivo connection.js

router.get('/todos_los_meseros', async (req, res) => { //Creación de función asíncrona.
    try{
        const query = 'SELECT * FROM mesero';
        const meseros = await connection.query(query);
        res.json(meseros);
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/eliminar_mesero', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const mese_num = req.body.mese_num;
        const query = 'DELETE FROM mesero WHERE mese_num = ?';
        const result = await connection.query(query, [mese_num]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/nuevo_mesero', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const body = req.body;
        console.log(body);
        const query = 'INSERT INTO mesero (mese_num, mese_nombre, mese_salario, mese_dia, mese_turno) VALUES (?,?,?,?,?)';
        const result = await connection.query(query, [body.mese_num, body.mese_nombre, body.mese_salario, body.mese_dia, body.mese_turno]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

module.exports = router;