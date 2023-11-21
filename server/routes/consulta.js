const express = require('express');
const router = express.Router();

const connection = require('../connection'); //Llamada a archivo connection.js

router.get('/todas_las_fechas', async (req, res) => { //Creación de función asíncrona.
    try{
        const query = "SELECT DATE_FORMAT(ord_fecha, '%Y-%m-%d') AS ord_fecha_real FROM orden";
        const fechas = await connection.query(query);
        res.json(fechas);
    }catch(error){
        return res.json({
            error: error //Nombre del atributo: nombre que recibo el atributo
        })
    }
});

router.get('/consulta_uno/:ord_mese_num/:ord_fecha', async (req, res) => {
    try{
        const ord_mese_num = req.params.ord_mese_num;
        const ord_fecha = req.params.ord_fecha;
        //console.log(ord_fecha);
        //console.log(ord_mese_num);
        const query = 'SELECT o.ord_num, o.ord_mes_num, me.mese_nombre, DATE_FORMAT(o.ord_fecha, \'%d/%m/%Y\') AS ord_fecha_real, o.ord_activo '+
                        'FROM orden AS o, mesero AS me, mesa AS m '+
                        'WHERE (me.mese_num = ?) AND (o.ord_fecha = ?) AND (m.mes_num = o.ord_mes_num) AND (me.mese_num=o.ord_mese_num)';
        const ordenes = await connection.query(query, [ord_mese_num, ord_fecha]);
        console.log(ordenes);
        res.json(ordenes);
    } catch(error){
        console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
        }
});

router.get('/consulta_dos/:ord_mes_num/:ord_fecha', async (req, res) => {
    try{
        const ord_mes_num = req.params.ord_mes_num;
        const ord_fecha = req.params.ord_fecha;
        //console.log(ord_fecha);
        //console.log(ord_mese_num);
        const query = 'SELECT o.ord_num, o.ord_mes_num, me.mese_nombre, DATE_FORMAT(o.ord_fecha, \'%d/%m/%Y\') AS ord_fecha_real, o.ord_activo '+
                        'FROM orden AS o '+
                            'INNER JOIN mesero AS me '+
                                'ON me.mese_num = o.ord_mese_num '+
                            'INNER JOIN mesa AS m '+
                                'ON m.mes_num = o.ord_mes_num '+
                            'WHERE (o.ord_fecha = ?) AND (m.mes_num = ?)';
        const ordenes = await connection.query(query, [ord_fecha, ord_mes_num]);
        console.log(ordenes);
        res.json(ordenes);
    } catch(error){
        console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
        }
});

router.get('/consulta3/:ord_fecha', async (req, res)=> {
    try{
        const ord_fecha = req.params.ord_fecha;
        const query = "SELECT o.ord_num, o.ord_mes_num, me.mese_nombre, DATE_FORMAT(o.ord_fecha, '%d/%m/%Y') AS ord_fecha_real, o.ord_activo "+
                        "FROM orden AS o, mesero AS me, mesa AS m "+
                        "WHERE me.mese_num = o.ord_mese_num AND o.ord_fecha = ? AND m.mes_num=o.ord_mes_num";
        const ordenes = await connection.query(query, [ord_fecha]);
        res.json(ordenes);
    } catch(error){
        console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
        }
});

router.get('/consulta4/:ord_fecha', async (req, res)=> {
    try{
        const ord_fecha = req.params.ord_fecha;
        const query = "SELECT COUNT(o.ord_num) AS total_ventas, DATE_FORMAT(o.ord_fecha, '%d/%m/%Y') AS ord_fecha_real "+
                        "FROM orden AS o, mesero AS me, mesa AS m "+
                        "WHERE (me.mese_num = o.ord_mese_num) AND (o.ord_fecha = ?) AND (m.mes_num=o.ord_mes_num) AND (o.ord_activo=\"Pagada\")";
        const ordenes = await connection.query(query, [ord_fecha]);
        //console.log(ordenes);
        res.json(ordenes);
    } catch(error){
        console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
        }
});

router.get('/consulta4_llenar/:ord_fecha', async (req, res)=> {
    try{
        const ord_fecha = req.params.ord_fecha;
        console.log(ord_fecha);
        const query = "SELECT o.ord_num, o.ord_mes_num, me.mese_nombre, DATE_FORMAT(o.ord_fecha, '%d/%m/%Y') AS ord_fecha_real, o.ord_activo "+
                        "FROM orden AS o, mesero AS me, mesa AS m "+
                        "WHERE (me.mese_num = o.ord_mese_num) AND (o.ord_fecha = ?) AND (m.mes_num=o.ord_mes_num) AND (o.ord_activo=\"Pagada\")";
        const ordenes = await connection.query(query, [ord_fecha]);
        console.log(ordenes);
        res.json(ordenes);
    } catch(error){
        console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
        }
});

router.get('/consulta5/:ord_mese_num', async (req, res)=> {
    try{
        const ord_mese_num = req.params.ord_mese_num;
        const query = "SELECT COUNT(o.ord_num) AS total_ventas "+
                        "FROM orden AS o, mesero AS me, mesa AS m "+
                        "WHERE (me.mese_num = ?) AND (m.mes_num=o.ord_mes_num) AND (o.ord_activo=\"Pagada\") AND (o.ord_mese_num=me.mese_num)";
        const ordenes = await connection.query(query, [ord_mese_num]);
        console.log(ordenes);
        res.json(ordenes);
    } catch(error){
        console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
        }
    });

router.get('/consulta5_llenar/:ord_mese_num', async (req, res)=> {
    try{
        const ord_mese_num = req.params.ord_mese_num;
        console.log(ord_mese_num);
        const query = 'SELECT o.ord_num, o.ord_mes_num, me.mese_nombre, DATE_FORMAT(o.ord_fecha, \'%d/%m/%Y\') AS ord_fecha_real, o.ord_activo  '+
                        'FROM orden AS o, mesero AS me, mesa AS m '+
                        'WHERE (me.mese_num = ?) AND (m.mes_num=o.ord_mes_num) AND (o.ord_activo="Pagada") AND (o.ord_mese_num=me.mese_num)';
        const ordenes = await connection.query(query, [ord_mese_num]);
        console.log(ordenes);
        res.json(ordenes);
    } catch(error){
        console.log(error);
            return res.json({
                error: error //Nombre del atributo: nombre que recibo el atributo
            });
        }
});

module.exports = router;