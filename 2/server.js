var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var log = require('./libs/log')(module); 

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));//путь к иконке

app.use(logger('dev'));//запросы в консоль

app.use(bodyParser());//

app.use(methodOverride());//put and delete

//app.use(app.router); //не надо делает само, устарело

app.use(express.static(path.join(__dirname, "public")));

app.get('/api', function (req, res) {
    res.send('API is running');
}); 

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});

app.get('/api/articles', function(req, res) {
    res.send('This is not implemented now');
});

app.post('/api/articles', function(req, res) {
    res.send('This is not implemented now');
});

app.get('/api/articles/:id', function(req, res) {
    res.send('This is not implemented now');
});

app.put('/api/articles/:id', function (req, res){
    res.send('This is not implemented now');
});

app.delete('/api/articles/:id', function (req, res){
    res.send('This is not implemented now');
});

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.listen(1337, function(){
    log.info('Express server listening on port 1337');
});