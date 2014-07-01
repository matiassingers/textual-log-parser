# textual-log-parser
> parses Textual log files and returns JavaScript objects

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
You can also use it as a CLI app by installing it globally.

```sh
$ npm install --global textual-log-parser
```

#### Usage
The CLI will output the results as a JSON file in the directory you are running the command from.

```sh
$ textual-log-parser --help

Usage
  $ textual-log-parser <directory>
```