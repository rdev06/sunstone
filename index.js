const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const { uploadPath, PORT, MONGODBURI, MONGODBOPTION } = require('./config');

const app = express();

app.use(express.static(uploadPath));
app.use(require('morgan')('dev'));
app.use(require('cors')());


mongoose.connect(MONGODBURI, MONGODBOPTION);
const db = mongoose.connection;

//for successful connection

db.once('open', () => {
    console.log('connected to MongoDB successfully!!!');
});

//for error in connection
db.on('error', err => {
    console.log(err);
});

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// default options
app.use(fileUpload({
    preserveExtension: true,
    createParentPath: true
}));

app.post('/upload', function (req, res) {
    if (!req.body.pathId) {
        req.body.pathId = 'global';
    };
    let errMsg;
    const filePathMap = {};
    for (const file of req.files.public) {
        const PATH = '/' + req.body.pathId + '/' + file.name;
        filePathMap[file.name] = PATH;
        file.mv(uploadPath + PATH, err => errMsg = err);
        if (errMsg) {
            res.status(500).send(errMsg);
            break;
        };
    }
    res.json(filePathMap);
});

app.use('/api', require('./routes'));

app.get('/', (re, res) => res.send('Welcome to studen teacher and subject mapping'));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))