var mysql = require('mysql2');

function connect(){
    return  mysql.createConnection({
        host     : process.env.DATABASE_HOST,
        user     : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_NAME
    });
}
 function connectionEveryShow(){
     return new Promise((resolve,reject)=>{
         let connection;
       try {
           connection = connect();
           connection.query('SELECT * FROM COCHE_DB.coche', function (error, results, fields) {
               if (error) throw error;
               resolve(results);
           });
           connection.end();
       }
       catch (e){
           if(connection){
               connection.end();
           }
           reject(e);
       }
     })
}

function connectionCreateShow(coche){
    return new Promise((resolve,reject)=>{
        let connection;
        try {
            connection = connect();
            connection.connect(function(error) {
                if (error) throw error;
                     connection.query(`INSERT INTO COCHE_DB.coche(marca,color,tipocombustible,chapa) VALUES ('${coche.marca}', '${coche.color}', '${coche.tipocombustible}', '${coche.chapa}')`, function (error, results) {
                if (error) throw error;
                resolve(results);
            });
            connection.end();
        })
        }
        catch (e){
            if(connection){
                connection.end();
            }
            reject(e);
        }
    })
}

function connectionDeleteShow(id){
    return new Promise((resolve,reject)=>{
        let connection;
        try {
            connection = connect();
            connection.connect(function(error) {
                if (error) throw error;
                connection.query(`DELETE FROM COCHE_DB.coche WHERE id = '${id}'`, function (error, results) {
                    if (error) throw error;
                    resolve(results);
                });
                connection.end();
            })
        }
        catch (e){
            if(connection){
                connection.end();
            }
            reject(e);
        }
    })
}

function connectionUpdateShow(coche){
    console.log(coche.color)
    return new Promise((resolve,reject)=>{
        let connection;
        try {
            connection = connect();
            connection.connect(function(error) {
                if (error) throw error;
                let query = "UPDATE COCHE_DB.coche SET marca = ?, color = ?, tipocombustible = ?, chapa = ? WHERE id = ?"
                connection.query(query,[coche.marca, coche.color, coche.tipoCombustible, coche.chapa, coche.id], function (error, results) {
                    if (error) throw error;
                    resolve(results);
                });
                connection.end();
            })
        }
        catch (e){
            if(connection){
                connection.end();
            }
            reject(e);
        }
    })
}

function getCarById(id){
    return new Promise((resolve,reject)=>{
        let connection;
        try {
            connection = connect();
            connection.connect(function(error) {
                if (error) throw error;
                connection.query(`select * FROM COCHE_DB.coche WHERE id = '${id}'`, function (error, results) {
                    if (error) throw error;
                    resolve(results);
                });
                connection.end();
            })
        }
        catch (e){
            if(connection){
                connection.end();
            }
            reject(e);
        }
    })
}
module.exports = {
     connectionEveryShow : connectionEveryShow,
    connectionCreateShow : connectionCreateShow,
    connectionDeleteShow : connectionDeleteShow,
    connectionUpdateShow : connectionUpdateShow,
    getCarById: getCarById
}