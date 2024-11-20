const db = require('./database');

auth={
    CreateAccount: createaccount,
    Login: login
}


function createaccount(Name, Email, Password){
    const query = "Insert into users (fullname, email, password) values (?, ?, ?)";
return new Promise((resolve,reject)=>{
    db.query(query, [Name, Email, Password],(error,result)=>{
        if(error){
            console.log("error in create account"+error)
            reject()
        }
        else{
            resolve(result);
        }
    })
}) 
}

function login(Email, Password){
const query = "Select * from users where email = ? && password = ?";
return new Promise((resolve, reject)=>{
    db.query(query, [Email, Password], (error, result)=>{
        if(error){
            reject(error)
        }
       if(result.length>0){
            resolve(result[0]);
        }
        else{
            //console.log("we are in else of login funtion");
            resolve(null)
        }
    })
})
}

module.exports=auth;