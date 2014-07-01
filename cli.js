#!/usr/bin/env node
'use strict';

var fs = require('fs');

var pkg = require('./package.json');
var parser = require('./index');
var input = process.argv[2];

function help() {
  console.log(pkg.description);
  console.log('');
  console.log('Usage');
  console.log('  $ textual-log-parser ~/Documents/Textual\\ logs/Freenode/Channels/#braws');
}

if (!input || process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
  return help();
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
  return console.log(pkg.version);
}

parser(input, function(results, days, meta){
  console.log(days + ' days of logs');

  fs.writeFile(meta.title.concat('.json'), JSON.stringify(results, null, 2));
});