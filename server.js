const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// var cors = require('cors')
// app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//route
const applicantRouter = require('./js/route/applicant')
app.use('/api', applicantRouter);

// 启动服务
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/homeDB', function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info('===> LZHome server is running at localhost:' + port)
        }
    });
});

