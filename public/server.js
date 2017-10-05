var express = require('express');
var path = require('path');
var request = require('request');
var webpack = require('webpack');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackconfig =require('../webpack.development.config.js');
var os = require("os");

var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

console.log('NODE_ENV',app.get('env'));
var env = app.get('env')

var isDeveloping = true;
console.log("mod is like this.................",env);
if(env=='production'){
	isDeveloping = false;
}

app.use(cors());
app.use(express.static(__dirname));
app.use(bodyParser.json());


var port = process.env.PORT || 3000;
// var env = process.env.NODE_ENV || 'production';
app.listen(port);
console.log('Server started in port ' + port);


if (isDeveloping) {
	console.log("Running in DEV mode");
	app.use('/node_modules', express.static('/node_modules'));
	app.use(express.static('public/'));
	const compiler = webpack(webpackconfig);
	const middleware = webpackMiddleware(compiler,{
		publicPath: webpackconfig.output.publicPath,
		headers: {
			"Cache-Control" : "public, max-age=604800"
		},
		constentBase:'dist',
		stats:{
			color:true,
			hash:false,
			timings:true,
			chunks:false,
			chunkModules:false,
			modules:false
		}

	});
	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.get('/',function response(req,res){
	  console.log("Hitting /");
	  res.write(middleware.fileSystem.readFileSync(path.join(__dirname,'public/index.html')));
	  res.end();
	});
} else {

  	app.use('/node_modules', express.static('/node_modules'));
  	app.use(express.static(__dirname));
  	// app.use(express.static('dist'));
    app.get('/', function response(req, res,next) {
        	console.log("Processing req");
        	console.log("dir name inside",__dirname);
		    var entryFile = path.join(__dirname, 'dist', 'index.html');
       	    console.log("Hitting the Root",entryFile);
            res.sendFile(entryFile);
	    });
}

app.get('/cpuLoad',function (req,res){
    var date = new Date();
    var dStr = date.toLocaleTimeString();
    console.log('getting cpu load......', dStr);

    var percentageCPU;

    //create function to get CPU information
    function cpuAverage() {

        //initialise sum of idle and time of cores and fetch cpu info
        var totalIdle = 0;
        var totalTick = 0;
        var cpus = os.cpus();

        //loop through cpu cores
        for (var i = 0, len = cpus.length; i < len; i++) {

            //select CPU core
            var cpu = cpus[i];

            //total up the time in the cores tick
            for (type in cpu.times) {
                totalTick += cpu.times[type];
            }

            //total up the idle time of the core
            totalIdle += cpu.times.idle;
        }

        //return the average idle and tick times
        return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
    }

//start measure
    var startMeasure = cpuAverage();

//set delay for second measure
    setTimeout(function() {

        var endMeasure = cpuAverage();

        //calc difference in idle and total time between the measures
        var idleDifference = endMeasure.idle - startMeasure.idle;
        var totalDifference = endMeasure.total - startMeasure.total;

        //calculate the average percentage CPU usage
        percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

        var date = new Date();
        var dateS = date.toLocaleTimeString();
        var time = date.getTime();
        console.log( dateS + ": "+percentageCPU + "% CPU Usage.");

        res.send( { 'time':time, 'cpuUsage':percentageCPU} );

    }, 1000);

});
