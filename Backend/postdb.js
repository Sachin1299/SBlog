const db = require('./database');
const fs = require('fs').promises;
const path = require('path');
const { error } = require('console');

post = {
    savepost: savepostfunc,
    updatepost: updatepostfunc,
    deletepost: deletepostfunc,
    getpost: getpostfunc,
    getposts: getpostsfunc,
    getmyposts: getmypostfunc,
    deleteimage: deletefile,
    filepreview: imagepreview
}

function savepostfunc(document_id, title, content, featured_image, status, user_id) {
    const query = 'Insert into documents(document_id, title, content, featured_image, status, user_id) values (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [document_id, title, content, featured_image, status, user_id], (err, result) => {
            if (err) {
                console.log(err);
                resolve("error while saving to database" + err);
            }
            else {
                console.log(result);
                resolve("data saved successfully" + result);
            }


        })
    })
}

function updatepostfunc(title, content, featured_image, status, document_id, user_id) {
    const query = 'UPDATE documents SET title = ?,content = ?,featured_image = ?,status = ?,user_id = ? WHERE document_id = ?;';
    return new Promise((resolve, reject) => {
        db.query(query, [title, content, featured_image, status, user_id, document_id], (err, result) => {
            if (err) {
                console.log(err);
                resolve("error while updating to database : " + err);
            }
            else {
                console.log(result);
                resolve("data updated successfully : " + result);
            }


        })
    })
}

function deletepostfunc(document_id) {
    const query = 'delete from documents WHERE document_id = ?;';
    return new Promise((resolve, reject) => {
        db.query(query, [document_id], (err, result) => {
            if (err) {
                console.log(err);
                resolve("error while deleting to database : " + err);
            }
            else {
                console.log(result);
                resolve("data deleted successfully : " + result);
            }


        })
    })
}

function getpostfunc(document_id) {
    const query = 'select * from documents WHERE document_id = ?;';
    return new Promise((resolve, reject) => {
        db.query(query, [document_id], (err, result) => {
            if (err) {
                console.log(err);
                resolve("error while getting a post to database : " + err);
            }
            else {
               // console.log("result of getpostfunc: ",result);
                resolve(result);
            }


        })
    })
}

function getmypostfunc(user_id) {
    const query = 'select * from documents WHERE user_id = ?;';
    return new Promise((resolve, reject) => {
        db.query(query, [user_id], (err, result) => {
            if (err) {
                console.log(err);
                resolve("error while getting all my post to database : " + err);
            }
            else {
                console.log(result);
                resolve(result);
            }


        })
    })
}

function getpostsfunc(status) {
    const query = 'select * from documents WHERE status = ?;';
    return new Promise((resolve, reject) => {
        db.query(query, [status], (err, result) => {
            if (err) {
                console.log(err);
                resolve("error while getting all post to database : " + err);
            }
            else {
                console.log(result);
                resolve(result);
            }


        })
    })
}

function deletefile(pathfile) {
    return fs.unlink(pathfile)
        .then(() => {
            console.log('File deleted successfully');
        })
        .catch(err => {
            console.error(`Error deleting file: ${err}`);
        });
}

function imagepreview(featured_image) {
    return new Promise((resolve, reject) => {
        // Check if the file exists
        //console.log(featured_image);
        const absolutePath = path.resolve(featured_image);
        fs.stat(absolutePath)
            .then(() => {
                console.log("File found");
                return fs.readFile(featured_image)
            })
            .then((data) => {
                const ext = path.extname(featured_image).toLowerCase();
                let mimeType;

                switch (ext) {
                    case '.png':
                        mimeType = 'image/png';
                        break;
                    case '.jpg':
                    case '.jpeg':
                        mimeType = 'image/jpeg';
                        break;
                    default:
                        console.error("Unsupported file extension:", ext);
                        return reject(new Error('Unsupported file type'));
                }

                console.log("MIME type determined:", mimeType);
                const base64Image = `data:${mimeType};base64,${data.toString('base64')}`;
                console.log("Image converted to base64 successfully");
                resolve(base64Image);
            })
            .catch((error) => {
                reject(`error while generating preview: ${error}`)
            })

    })

}
// function imagepreview(featured_image) {
//     return new Promise((resolve, reject) => {
//         const absolutePath = path.resolve(featured_image); // Ensure you have the absolute path

//         // Check if the file exists
//         fs.stat(absolutePath)
//             .then(() => {
//                 console.log("File found");

//                 // Read the file
//                 return fs.readFile(absolutePath);
//             })
//             .then(data => {
//                 console.log("File read successfully");

//                 // Determine the MIME type based on the file extension
//                 const ext = path.extname(featured_image).toLowerCase();
//                 let mimeType;

//                 switch (ext) {
//                     case '.png':
//                         mimeType = 'image/png';
//                         break;
//                     case '.jpg':
//                     case '.jpeg':
//                         mimeType = 'image/jpeg';
//                         break;
//                     default:
//                         console.error("Unsupported file extension:", ext);
//                         return reject(new Error('Unsupported file type'));
//                 }

//                 console.log("MIME type determined:", mimeType);
//                 const base64Image = `data:${mimeType};base64,${data.toString('base64')}`;
//                 console.log("Image converted to base64 successfully");
//                 resolve(base64Image);
//             })
//             .catch(err => {
//                 console.error("Error:", err);
//                 reject(new Error('Error processing image'));
//             });
//     });
// }




module.exports = post;