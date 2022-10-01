const { Client } = require('pg2');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

function connect(){
    return  client.connect();
}
 function connectionEveryShow(){
     return new Promise((resolve,reject)=>{
         let connection;
       try {
           connection = connect();
           connection.query('SELECT * FROM d4qdkacn6rpqlb.coche', function (error, results, fields) {
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
                     connection.query(`INSERT INTO d4qdkacn6rpqlb.coche(marca,color,tipocombustible,chapa) VALUES ('${coche.marca}', '${coche.color}', '${coche.tipocombustible}', '${coche.chapa}')`, function (error, results) {
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
                connection.query(`DELETE FROM d4qdkacn6rpqlb.coche WHERE id = '${id}'`, function (error, results) {
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
                let query = "UPDATE d4qdkacn6rpqlb.coche SET marca = ?, color = ?, tipocombustible = ?, chapa = ? WHERE id = ?"
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
                connection.query(`select * FROM d4qdkacn6rpqlb.coche WHERE id = '${id}'`, function (error, results) {
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