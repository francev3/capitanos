require('dotenv').config()
const path = require('path');
const cluster = require('cluster')
const mongoose = require('mongoose');
const express = require('express');
const io_redis = require('socket.io-redis')
// net = require('net')
const redis = require('redis');



const num_processes = require('os').cpus().length
const REDIS_PORT = process.env.REDIS_PORT || 6379
const URLDB = process.env.URLDB || 'mongodb://localhost:27017/capitanos'
const PORT = process.env.PORT || 3000


if (cluster.isMaster) {

    var workers = [];

	var spawn = function(i) {
		workers[i] = cluster.fork();

		workers[i].on('exit', function(code, signal) {
			console.log('respawning worker', i);
			spawn(i);
		});
    };

    for (var i = 0; i < num_processes; i++) {
		spawn(i);
    }
    
    var worker_index = function(ip, len) {
		return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
    };
    
    // var server = net.createServer({ pauseOnConnect: true }, function(connection) {
	// 	// We received a connection and need to pass it to the appropriate
	// 	// worker. Get the worker for this connection's source IP and pass
	// 	// it the connection.
	// 	var worker = workers[worker_index(connection.remoteAddress, num_processes)];
	// 	worker.send('sticky-session:connection', connection);
	// }).listen(process.env.PORT);

}else{

    const app = express();

    app.use( express.static( path.resolve(__dirname, '../public') ) );

    mongoose.connect(URLDB, { 
        useCreateIndex: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true  
    }, (err, res) => {
        if (err) throw err;

        console.log("DB online");
    });
    
    let server = app.listen(PORT, 'localhost' , () => {
        console.log(`Listening on port ${PORT}`);
    })


    // socket io
    const io = require('socket.io')(server);
 
    io.adapter(io_redis({ host: 'localhost', port: REDIS_PORT }));
 
    module.exports.io = io;

    // is necessary if cache function in socket/socket.js is in use
    // const client = redis.createClient(REDIS_PORT);
    // module.exports.clientRedis = client;

    require('./sockets/socket')


    // process.on('message', function(message, connection) {
	// 	if (message !== 'sticky-session:connection') {
	// 		return;
	// 	}

	// 	// Emulate a connection event on the server by emitting the
	// 	// event with the connection the master sent us.
	// 	server.emit('connection', connection);

	// 	connection.resume();
	// });


}




