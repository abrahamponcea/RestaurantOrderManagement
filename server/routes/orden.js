const express = require('express');
const router = express.Router();

const connection = require('../connection'); //Llamada a archivo connection.js

router.get('/todas_las_ordenes', async (req, res) => { //Creación de función asíncrona.
    try{
        /*const query = "SELECT o.ord_num, o.ord_mes_num, m.mese_nombre, DATE_FORMAT(o.ord_fecha, '%d/%m/%Y') as ord_fecha_real, o.ord_activo '+ 
                        "FROM orden AS o,  mesero AS m, comida AS c, comida_orden AS co "+
                        "WHERE (o.ord_mese_num=m.mese_num) AND (co.co_ord_num=o.ord_num AND co.co_com_codigo=c.com_codigo)";*/
        //const query = 'SELECT * FROM orden';
        const query = "SELECT o.ord_num, o.ord_mes_num, m.mese_nombre, DATE_FORMAT(o.ord_fecha, '%d/%m/%Y') as ord_fecha_real, o.ord_activo " +
                        'FROM orden AS o '+
                        'INNER JOIN mesero AS m '+
                        'ON m.mese_num=o.ord_mese_num';
        /*const query = 'SELECT (o.ord_num, o.ord_mes_num, m.mese_nombre) '+
                        'FROM orden AS o'+
                        'INNER JOIN mesero AS m';*/
        const ordenes = await connection.query(query);
        res.json(ordenes);
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/eliminar_orden', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const ord_num = req.body.ord_num;
        const query = 'DELETE FROM orden WHERE ord_num = ?';
        const result = await connection.query(query, [ord_num]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/nueva_orden', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const body = req.body;
        console.log(body);
        const query = 'INSERT INTO orden (ord_mes_num, ord_mese_num, ord_fecha, ord_activo) VALUES (?,?,?,?)';
        const result = await connection.query(query, [body.ord_mes_num, body.ord_mese_num, body.ord_fecha, body.ord_activo]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/editar_orden', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const body = req.body;
        console.log(body);
        const query = "UPDATE orden SET ord_mes_num = ?, ord_mese_num = ?, ord_fecha = ? , ord_activo = ? "+
                        'WHERE ord_num = ?';
        const result = await connection.query(query, [body.ord_mes_num, body.ord_mese_num, body.ord_fecha, body.ord_activo, body.ord_num]);
        console.log(result)
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/nuevo_det_comida', async (req, res) => {
    try{
        const body = req.body;
        console.log(body);
        const query = 'INSERT INTO comida_orden '+
                        '(co_ord_num, co_com_codigo, co_notas, co_cantidad) '+
                        'VALUES (?, ?, ?, ?)';
        await connection.query(query, [body.co_ord_num, body.co_com_codigo, body.co_notas, body.co_cantidad ]);
        res.json('OKa');
    }catch(error){
            console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
    }
});

router.get('/leer_det_comidas/:co_ord_num', async (req, res)=> {
    try{
        const co_ord_num = req.params.co_ord_num;
        const query = 'SELECT co.co_com_codigo, co.co_ord_num, c.com_nombre, co.co_notas, c.com_precio, co.co_cantidad '+
                        'FROM comida AS c '+
                        'INNER JOIN comida_orden AS co '+
                        'ON co.co_com_codigo = c.com_codigo '+
                        'WHERE co.co_ord_num = ?';
        const ordenes = await connection.query(query, [co_ord_num]);
        res.json(ordenes);
    } catch(error){
        console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
        }
});

router.post('/nuevo_det_bebida', async (req, res) => {
    try{
        const body = req.body;
        console.log(body);
        const query = 'INSERT INTO bebida_orden '+
                        '(bo_ord_num, bo_beb_codigo, bo_notas, bo_cantidad) '+
                        'VALUES (?, ?, ?, ?)';
        await connection.query(query, [body.bo_ord_num, body.bo_beb_codigo, body.bo_notas, body.bo_cantidad ]);
        res.json('OKa');
    }catch(error){
            console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
    }
});

router.get('/leer_det_bebida/:bo_ord_num', async (req, res)=> {
    try{
        const bo_ord_num = req.params.bo_ord_num;
        const query = 'SELECT bo.bo_beb_codigo, bo.bo_ord_num, b.beb_nombre, bo.bo_notas, b.beb_precio, bo.bo_cantidad '+
                        'FROM bebida AS b '+
                        'INNER JOIN bebida_orden AS bo '+
                        'ON bo.bo_beb_codigo = b.beb_codigo '+
                        'WHERE bo.bo_ord_num = ?';
        const ordenes = await connection.query(query, [bo_ord_num]);
        res.json(ordenes);
    } catch(error){
        console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
        }
});

//CÓDIGOS PARA OBTENER PRECIOS ._.XD

router.get('/calcular_precio_comida/:ord_num', async (req, res) => { //Creación de función asíncrona.
    try{        
        const ord_num = req.params.ord_num;
        const query = 'SELECT SUM(com_precio*co_cantidad) AS total '+
                        'FROM orden '+
                        'INNER JOIN comida_orden '+
                            'ON ord_num = co_ord_num '+
                        'INNER JOIN comida '+
                            'ON com_codigo = co_com_codigo '+
                        'WHERE ord_num = ?';        
        const precio = await connection.query(query, [ord_num]);
        //console.log(precio);
        res.json(precio);
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.get('/calcular_precio_bebida/:ord_num', async (req, res) => { //Creación de función asíncrona.
    try{        
        const ord_num = req.params.ord_num;
        console.log(ord_num);
        const query = 'SELECT SUM(beb_precio*bo_cantidad) AS total '+
                        'FROM orden '+
                        'INNER JOIN bebida_orden '+
                            'ON ord_num = bo_ord_num '+
                        'INNER JOIN bebida '+
                            'ON beb_codigo = bo_beb_codigo '+
                        'WHERE ord_num = ?';        
        const precio = await connection.query(query, [ord_num]);
        //console.log(precio);
        res.json(precio);
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/eliminar_co', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const co_ord_num = req.body.co_ord_num;
        const co_com_codigo = req.body.co_com_codigo;
        const query = 'DELETE FROM comida_orden WHERE (co_ord_num = ?) AND (co_com_codigo = ?)';
        const result = await connection.query(query, [co_ord_num, co_com_codigo]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/editar_co', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const body = req.body;
        console.log(body);
        const query = 'UPDATE comida_orden SET co_cantidad=?, co_notas=? WHERE (co_ord_num = ?) AND (co_com_codigo = ?);';
        const result = await connection.query(query, [body.co_cantidad, body.co_notas, body.co_ord_num, body.co_com_codigo]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/eliminar_bo', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const bo_ord_num = req.body.bo_ord_num;
        const bo_beb_codigo = req.body.bo_beb_codigo;
        console.log(bo_ord_num);
        console.log(bo_beb_codigo);
        const query = 'DELETE FROM bebida_orden WHERE (bo_ord_num = ?) AND (bo_beb_codigo = ?)';
        const result = await connection.query(query, [bo_ord_num, bo_beb_codigo]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.post('/editar_bo', async (req, res) => { //Post -> cambio en la base de datos.
    try{
        const body = req.body;
        console.log(body);
        const query = 'UPDATE bebida_orden SET bo_cantidad=?, bo_notas=? WHERE (bo_ord_num = ?) AND (bo_beb_codigo = ?);';
        const result = await connection.query(query, [body.bo_cantidad, body.bo_notas, body.bo_ord_num, body.bo_beb_codigo]);
        res.json('OKa.');
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

module.exports = router;