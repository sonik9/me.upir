/**
 * Created by vital on 5/10/2015.
 */
var winston = require('winston');
var fs = require('fs');
//var FileStreamRotator = require('file-stream-rotator');
var ENV = process.env.NODE_ENV;
function getLogger(module){
    var path=module.filename.split('\\').slice(-2).join('\\');
    var logDirectory = __dirname + '/../log';
// ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
   /* var accessLogStream = FileStreamRotator.getStream({
        filename: logDirectory + '/access-%DATE%.log',
        frequency: 'daily',
        verbose: false
    });*/
    winston.cli();
    return new winston.Logger({
        transports:[
            new (winston.transports.Console)({
                colorize: true,
                level: (ENV === 'development') ? 'debug':'error',
                handleExceptions: true,
                prettyPrint:true,
                label:path,
                timestamp:true
            }),
            //new (logger.transports.File)({filename:accessLogStream}),
            new(require('winston-daily-rotate-file'))({
                label: path,
                json:false,
                prettyPrint:true,
                handleExceptions: true,
                filename: 'log-',
                dirname: logDirectory,
                datePattern: 'yyyy-MM-dd.log',
            })
        ]
    });
}

module.exports=getLogger;