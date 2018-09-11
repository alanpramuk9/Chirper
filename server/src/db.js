let mysql = require('mysql');

//mysql env variables
let connection = mysql.createConnection(
    {
        host: 'localhost',
        database: 'chirpr',
        user: 'chirperapp',
        password: 'sesame'
    }
);

//retrieves all chirps from database
let getChirps = () => {
    //connection.connect();
    return new Promise((resolve, reject) => {
        connection.query(`select * from chirps`, (err, results, fields) => {
            if (err) {
                connection.end();
                console.log('Cannot get chirps', err);
                reject(err);
            };
            let result = results.map((item) => {
                return({
                    text: item.text,
                    id: item.id
                })
            });
            resolve(result);
            //connection.end();
        });
    });
};

//route for retrieving a single chirp from database
let getChirp = (id) => {
    //connection.connect();
    return new Promise((resolve, reject) => {
        connection.query(`select * from chirps where id = ${id}`, (err, results, fields) => {
            if (err) {
                //connection.end();
                console.log('Cannot get individual chirp', err);
                reject(err);
            };
            resolve(results);
        });
    })
};

//route for deleting a chirp
let deleteChirp = (id) => {
    //connection.connect();
    return new Promise((resolve,reject) => {
        connection.query(`DELETE FROM chirps WHERE id = ${id}`, (err, results, fields) => {
            if (err) {
                //connection.end();
                console.log('Cannot get delete individual chirp');
                console.log(err);
                reject(err);
            };
            resolve(results);
            console.log(results);
            //connection.end();
        });
    })
};

//modify an existing chirp
let updateChirp = (id,text) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE chirps SET text = "${text}" WHERE id = ${id}`, (err, results, fields) => {
        if (err) {
            //connection.end();
            console.log('Cannot get update individual chirp', err);
            reject(err);
        }
        resolve(results);
        console.log('updated chirps successfully', results);
        //connection.end();
        })
    })
};

//create a chirp
let createChirp = (text, userid) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO chirps (userid, text, location) VALUES (${userid}, "${text}", "Nashville")`, (err, results, fields) => {
            if (err) {
                //connection.end();
                console.log('Cannot get create individual chirp');
                console.log(err);
                reject(err);
            };
            //getTheMentions(text, userid)
            resolve(results);
            console.log(results);
            //connection.end();
        })
    })
};

//`INSERT INTO mentions (userid, chirpid) VALUES(${userid}, ${chirpid})`
let createMention = (userid, chirpid) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO mentions (userid, chirpid) VALUES(${userid}, ${chirpid})`, (err, results, fields) => {
            if (err) {
                //connection.end();
                console.log('Cannot get create individual mention');
                console.log(err);
                reject(err);
            };
            console.log('successfully doing promise');
            resolve(results);
            
        })
    })
}

let getMentions = (userid) => {
    //connection.connect();
    return new Promise((resolve, reject) => {
        connection.query(`call spUserMentions(${userid})`, (err, results, fields) => {
            if (err) {
                //connection.end();
                console.log(err);
                console.log('Cannot get individual chirp mentions');
                reject(err);
            };
            resolve(results);
        })
    })  
}


let getTheMentions = (text, userid) => {
    return new Promise((resolve, reject) => {
      connection.query(`select * from chirps where userid = ${userid} and text='${text}'`, (err, results, field) => {
        if (err) {
          reject(err);
          //connection.end();
          
        } else {
          console.log('results[0].text = ', results[0].text);
          let array = results[0].text.split(" ");
            console.log(' str = '+ array);
            let index;
            for (let i = 0; i < array.length; i++) {
                let delimeter = array[i].includes('@');    
                if (delimeter === true) {
                index = i;
                };
            };
            console.log(index);
          let chirpid = results[0].id;
          console.log(' chirpid = '+ chirpid);
          
          let userHandle = array[index].slice(1);
          
          console.log('userHandle = ', userHandle)
            updateMentions(userHandle, chirpid)
          
  
          resolve('success');
        };
      });
    });
  };

  let updateMentions = (userHandle, chirpid) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE name = '${userHandle}'`, (err, results, field) => {
        if (err) {
            console.log('error occurred');
          reject(err);
        }
        createMention(results[0].id, chirpid)
        resolve('success');
      
    })
    })
}

module.exports = {
    GetChirps: getChirps,
    GetChirp: getChirp,
    DeleteChirp: deleteChirp,
    UpdateChirp: updateChirp,
    CreateChirp: createChirp,
    CreateMention: createMention,
    GetMentions: getMentions,
    UpdateMentions: updateMentions
}
