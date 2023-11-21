const express = require('express');
const router = express.Router();

const connection = require('../connection'); //Llamada a archivo connection.js

router.get('/todas_las_comidas', async (req, res) => { //Creación de función asíncrona.
    try{
        const query = 'SELECT * FROM comida';
        const comidas = await connection.query(query);
        res.json(comidas);
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/eliminar_comida', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const com_codigo = req.body.com_codigo;
        const query = 'DELETE FROM comida WHERE com_codigo = ?';
        const result = await connection.query(query, [com_codigo]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/nueva_comida', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const body = req.body;
        const query = 'INSERT INTO comida (com_codigo, com_nombre, com_categoria, com_precio, com_descripcion) VALUES (?,?,?,?,?)';
        const result = await connection.query(query, [body.com_codigo, body.com_nombre, body.com_categoria, body.com_precio, body.com_descripcion]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

module.exports = router;