const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const config = require('./config');
const app = express();
const port = config.const.apiPort;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

//JSON parser
app.use(bodyParser.json());

//Server Routes
app.use('/', routes);

//Start Server
app.listen(port, (error) => {
	if (error) {
		console.log('error', error);
	} else {
		console.log(`Application is runnig on ${port}`);
	}
});


//Can use cluster module of node or can use PM2 Service for multiple instances.

// if (cluster.isMaster) {
//   // Master process
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on('death', function (worker) {
//     console.log('Worker ' + worker.pid + ' died');
//   });
// } else {
//   // Worker process
//     app.listen(port, (error) => {
//       if (error) {
//         console.log('error', error);
//       } else {
//         console.log(`Application is runnig on ${port}`);
//       }
//     });
// }

// cluster.on('exit', (worker) => {
//   console.log(worker.id, ' is no more!')
//   cluster.fork()
// })