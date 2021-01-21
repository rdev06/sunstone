const config = {
    uploadPath: __dirname + '/public',
    PORT: 5001,
    MONGODBURI: 'mongodb://localhost/sunstone',
    MONGODBOPTION: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    superAdminToken: 'super.admin.token'
}



module.exports = config;