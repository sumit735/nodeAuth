// includes
const app = require('./app');

// providing port for heroku
const port = process.env.PORT;

// const multer = require('multer');

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc | docx)$/)) {
//             return cb(new Error('Please upload doc or docx file only'));
//         }

//         cb(undefined, true);
//     }
// })


// express middlewares

// server maintenance mode
// app.use((req, res, next) => {
// 	res.status(503).send('Server is under maintenance');
// });


// start the server
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});


