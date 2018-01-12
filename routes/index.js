module.exports = function (io) {
    var express = require('express');
    var router = express.Router();
    var redis  = require('redis');

    router.get('/', function (req, res, next) {
        res.render('index', {title: '123'});
    });

    io.on('connection', function(socket){
        console.log('io connected');

        var redisClient =  redis.createClient();
        redisClient.subscribe('message');
        
        redisClient.on('message', function (channel, msg) {
            console.log('channel: ' + channel);
            console.log('message: ' + msg);

            socket.emit(channel, msg);
        });
    });

    return router;
};
