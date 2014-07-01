'use strict';

var fs = require('fs');
var path = require('path');
var readline = require('readline');
var stream = require('stream');
var async = require('async');
var moment = require('moment-timezone');

var dir;

function parse(directory, callback){
  if(!directory)
    throw 'textual-log-parser requires a directory to read logs from.';

  dir = directory;

  var directoryParts = path.resolve(directory).split(path.sep);
  var meta = {
    server: directoryParts[directoryParts.length - 3],
    type: directoryParts[directoryParts.length - 2].toLowerCase(),
    title: directoryParts[directoryParts.length - 1]
  };
  console.log('parsing logs for ' + meta.title);

  return fs.readdir(directory, function(error, files){
    files = files.filter(function(file){
      return file.substr(-4) === '.txt';
    });

    return async.map(files, readFileContent, function(error, results){
      return callback(results, results.length, meta);
    });
  });
}

function readFileContent(file, callback){
  var lines = [];

  var instream = fs.createReadStream(path.join(dir, file));
  var outstream = new stream;
  outstream.readable = true;
  outstream.writable = true;

  var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
  });

  rl.on('line', function(line){
    if(!line.length || line.length < 2)
      return;

    // Remove "Begin Session" and "End Session"
    var indexOf = line.indexOf('—————————————');
    if(indexOf === 0 || indexOf === 27 || indexOf === 11)
      return;

    var date = formatDate(line, file);
    lines.push({
      date: date,
      value: line.replace(/\[([^\]]+)\]/, '').trim()
    });
  });

  rl.on('close', function(){
    callback(null, lines);
  });
}

function formatDate(line, file){
  var date = /\[([^\]]+)\]/.exec(line);
  date = date && date[1].trim();

  if(date.indexOf('-') === -1){
    var fileDate = file.slice(0, file.indexOf('.txt'));
    date = fileDate.concat('T', date);
  }

  return moment(date).format();
}

module.exports = parse;