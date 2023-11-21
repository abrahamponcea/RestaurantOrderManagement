const express = require('express');
const router = express.Router();

const connection = require('../connection'); //Llamada a archivo connection.js

router.get('/todas_las_bebidas', async (req, res) => { //Creación de función asíncrona.
    try{
        const query = 'SELECT * FROM bebida';
        const bebidas = await connection.query(query);
        res.json(bebidas);
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/eliminar_bebida', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const beb_codigo = req.body.beb_codigo;
        const query = 'DELETE FROM bebida WHERE beb_codigo = ?';
        const result = await connection.query(query, [beb_codigo]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/nueva_bebida', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const body = req.body;
        const query = 'INSERT INTO bebida (beb_codigo, beb_nombre, beb_categoria, beb_precio, beb_descripcion, beb_tamanio) VALUES (?,?,?,?,?,?)';
        const result = await connection.query(query, [body.beb_codigo, body.beb_nombre, body.beb_categoria, body.beb_precio, body.beb_descripcion, body.beb_tamanio]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

module.exports = router;