# textual-log-parser [![Build Status](http://img.shields.io/travis/matiassingers/textual-log-parser.svg?style=flat-square)](https://travis-ci.org/matiassingers/textual-log-parser) [![Dependency Status](http://img.shields.io/gemnasium/matiassingers/textual-log-parser.svg?style=flat-square)](https://gemnasium.com/matiassingers/textual-log-parser)
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/matiassingers/textual-log-parser?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
> parses Textual log files and returns JavaScript objects

## Features:
- Removes empty lines and `Begin`/`End` session lines
- Corrects missing date in timestamp from early Textual logs.
- Formats dates consistently with local timezone data.

## Module
Point the parser to a directory of Textual logs and it'll return you objects for each line:
```json
{
  "date": "2014-06-30T18:53:44+08:00",
  "value": "<@srn_> ZIGGAGAGAGAGA"
}
```

The parser will also return number of days and metadata(server, type and title).
Example use of the parser:
```js
var parser = require('textual-log-parser')

var directory = "~/Documents/Textual\ logs/Freenode/Channels/#atp";
parser(directory, function(results, days, metadata){
  console.log(days + ' days of logs');
});
```

## CLI
You can also use the parser as a CLI app by installing it globally.

```sh
$ npm install --global textual-log-parser
```

#### Usage
The CLI will output the results as a JSON file in your current working directory.

```sh
$ textual-log-parser --help

Usage
  $ textual-log-parser <directory>
```

## License
MIT © [Matias Singers](http://mts.io)
