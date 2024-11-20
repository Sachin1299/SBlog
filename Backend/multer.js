const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:(req, file, callbak)=>{
        console.log("diskstorage called");
        callbak(null, 'C:/Users/DELL/Desktop/Programs/React/MegaBlog/Backend/images/')
    },
    filename:(req, file, callbak)=>{
        const userName = req.body.userName || 'anonymous';
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        const fileName = `${userName}_${uniqueSuffix}`;
        console.log("filename called");
        callbak(null, fileName)
    }

})

 const upload = multer({ storage: storage });

 module.exports = upload;

// // Middleware to parse form-data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Route to handle file upload
// app.post('/upload', upload.single('image'), (req, res) => {
//     res.send('File uploaded successfully');
// });

// // Start the Express server
// app.listen(3000, () => {
//     console.log('Server started on port 3000');
// });
//When a POST request is made to /upload, Multer processes the incoming request, which is expected to contain a file (uploaded via a form field named 'image').