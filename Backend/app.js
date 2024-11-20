const express = require('express')
const app = express();
const port = 4000;
const db = require('./database')
const auth = require('./auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const imageupload = require('./multer');
const post = require('./postdb')
const path = require('path');
const { dirname } = require('path');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/images', express.static(path.join("C:\Users\DELL\Desktop\Programs\React\MegaBlog\Backend", 'images')));
app.use('/images', express.static(path.join(__dirname, 'images')));

const mul = multer();

app.post('/signup', async (req, res) => {
    const data = req.body
    const result = await auth.CreateAccount(data.name, data.email, data.password);
    console.log(result);
    res.send(result);

})


app.post('/login', async (req, res) => {
    const data = req.body
    const result = await auth.Login(data.email, data.password);
    console.log(result);
    res.send(result);

})


app.post('/uploadimage', (req, res) => {
    const uploadMiddleware = imageupload.single('image');
    uploadMiddleware(req, res, (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        console.log("Image upload called");
        console.log("File info:", req.file);
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        res.send(req.file.destination + req.file.filename);
    });
    //     imageupload.single('image')(req, res, (err) => {
    //         if (err) {
    //             return res.status(500).send(err.message);
    //         }
    //         console.log("Image upload called");
    //         console.log("File info:", req.file);
    //         if (!req.file) {
    //             return res.status(400).send('No file uploaded.');
    //         }
    //         res.send('Image uploaded successfully');
    //     });
});

app.post('/createblog', mul.any(), async (req, res) => {
    const data = req.body;
    const savepost = await post.savepost(data.document_id, data.title, data.content, data.featured_image, data.status, data.user_id)
    res.send(data);
})

app.post('/updateblog', mul.any(), async (req, res) => {
    const data = req.body;
    console.log("update data: ", data);
    const savepost = await post.updatepost(data.title, data.content, data.featured_image, data.status, data.document_id, data.user_id)
    res.send(data);
})

app.post('/deleteblog', mul.any(), async (req, res) => {
    const data = req.body;
    console.log("data.document_id: ",data);
    const savepost = await post.deletepost(data.document_id)
    console.log(savepost);
    res.send(data);
})

app.post('/getblog', mul.any(), async (req, res) => {
    const data = req.body;
    const getpost = await post.getpost(data.document_id)
    res.send(getpost);
})

app.post('/getblogs', mul.any(), async (req, res) => {
    const data = req.body;
    const getposts = await post.getposts(data.status)
    res.send(getposts);
})

app.post('/getmyblogs', mul.any(), async (req, res) => {
    const data = req.body;
    const getmyposts = await post.getmyposts(data.user_id)
    res.send(getmyposts);
})

app.post('/deleteimage', mul.any(), async (req, res) => {
    const data = req.body;
    const deletepost = await post.deleteimage(data.featured_image)
    res.send(deletepost);
})

app.post('/imagepreview', mul.any(), async (req, res) => {
    //console.log("image preview called");
    const data = req.body;
    //console.log(" data.featured image: ",data.featured_image);
    if(data.featured_image == undefined){
        res.send("featured image:  undefined")
    }
    else{
        try {
            const imagepreview1 = await post.filepreview(data.featured_image)
     //   console.log("preview generated :", imagepreview1);
        res.send({imagepreview1});
        } catch (error) {
            console.log("error in try catch at line 117 app.js",error)
        }
        
    }
    
})
















app.listen(port, () => {
    console.log("backend server is on action ");
})
console.log('hello backend')


