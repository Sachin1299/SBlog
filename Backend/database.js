const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Bhaisachin12@',
    database:'megablog'
})

connection.connect((err)=>{
    if(err){
        console.log('Error connection in database errror is :  '+err);
    }
    else{
        console.log("Database connected");
    }
})

module.exports = connection;