const mysql = require ('mysql2');
const { promisify } = require('util');

//npm run dev

// Configurar conexión a la base de datos.
const connection = mysql.createPool({ 
    host: '127.0.0.1',
    port: '3306',          //Lugar de la base de datos
    user: 'admin',        //Usuario a utilizar
    password: 'YT5gfhfisem02',           //Contraseña del usuario a utilizar 
    database: 'restauranteDb'   //Nombre de la db a utililzar
});

//http://192.168.0.14:8080/
//http://127.0.0.1:3306/

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
            console.log('Problema en la conexión con la DB.', err);
        }
        if (conn){
            console.log('DB conectada correctamente.');
        }
        return 
    }
);

connection.query = promisify(connection.query);

module.exports = connection;