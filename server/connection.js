const mysql = require ('mysql');
const { promisify } = require('util');

//npm run dev

// Configurar conexión a la base de datos.
const connection = mysql.createPool({ 
    host: 'localhost',          //Lugar de la base de datos
    user: 'root',        //Usuario a utilizar
    password: '6fisem02',           //Contraseña del usuario a utilizar
    database: 'restaurante_db'   //Nombre de la db a utililzar
});

/*Crear la función para crear la conexión.
//Normalmente:
connection.getConnection(
    function myfunction(err, conn){
        //Operaciones
    }
);
*/

//Más directo mediante JavaScript; crear función anónima.
//Función de uso local (en este punto)
// [Arrow function]
connection.getConnection(
    (err,conn)=>{
        if (err){
            console.log('Problema en la conexión con la DB.');
        }
        if (conn){
            console.log('DB conectada correctamente.');
        }
        return 
    }
);

connection.query = promisify(connection.query);

module.exports = connection;