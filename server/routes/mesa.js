const express = require('express');
const router = express.Router();

const connection = require('../connection'); //Llamada a archivo connection.js

router.get('/todas_las_mesas', async (req, res) => { //Creación de función asíncrona.
    try{
        const query = 'SELECT * FROM mesa';
        const mesas = await connection.query(query);
        res.json(mesas);
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/eliminar_mesa', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const mes_num = req.body.mes_num;
        const query = 'DELETE FROM mesa WHERE mes_num = ?';
        const result = await connection.query(query, [mes_num]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/nueva_mesa', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const body = req.body;
        console.log(body);
        const query = 'INSERT INTO mesa (mes_num, mes_capacidad, mes_sala) VALUES (?,?,?)';
        const result = await connection.query(query, [body.mes_num, body.mes_capacidad, body.mes_sala]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

module.exports = router;