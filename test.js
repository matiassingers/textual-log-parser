'use strict';

var textual = require('./index');
var assert = require('chai').assert;

var file = '2014-07-04.txt';

describe('parse()', function(){
  it('should throw if missing directory argument', function(){
    assert.throws(textual.parse, 'textual-log-parser requires a directory to read logs from.');
  });
});

describe('formatLine()', function(){
  describe('discard unwanted lines', function(){
    it('should handle empty lines', function(){
      var line = textual.formatLine('', file);
      assert.isUndefined(line, 'discarded empty');
    });

    it('should handle empty semi-lines', function(){
      var line = textual.formatLine(' ', file);
      assert.isUndefined(line, 'discarded semi-empty');
    });

    describe('should handle session lines', function(){
      it('beginning of the line - begin', function(){
        var line = textual.formatLine('————————————— Begin Session —————————————', file);
        assert.isUndefined(line);
      });
      it('beginning of the line - end', function(){
        var line = textual.formatLine('————————————— End Session —————————————', file);
        assert.isUndefined(line);
      });
      it('timestamp in front - being', function(){
        var line = textual.formatLine('[00:05:51] ————————————— Begin Session —————————————', file);
        assert.isUndefined(line);
      });
      it('timestamp in front - being', function(){
        var line = textual.formatLine('[00:52:21] ————————————— End Session —————————————', file);
        assert.isUndefined(line);
      });
    });
  });

  describe('should return correctly formatted object', function(){
    it('normal global message', function(){
      var line = textual.formatLine('[2014-06-30T18:09:52+0800] <mts> inception', file);
      var expected = {
        date: '2014-06-30T18:09:52+08:00',
        value: '<mts> inception'
      };
      assert.deepEqual(line, expected);
    });

    it('initial mode channel message', function(){
      var line = textual.formatLine('[2014-07-01T00:14:13+0800] Mode is +cnt', file);
      var expected = {
        date: '2014-07-01T00:14:13+08:00',
        value: 'Mode is +cnt'
      };
      assert.deepEqual(line, expected);
    });

    it('message without full timestamp', function(){
      var line = textual.formatLine('[14:46:29] <mts_> oy stkhlm ', '2013-08-16.txt');
      var expected = {
        date: '2013-08-16T14:46:29+08:00',
        value: '<mts_> oy stkhlm'
      };
      assert.deepEqual(line, expected);
    });
  });
});

describe('formatDate()', function(){
  it('should format date correctly', function(){
    var result = textual.formatDate('[2014-06-30T18:09:52+0800] <mts> inception', file);
    var expected = '2014-06-30T18:09:52+08:00';

    assert.equal(result, expected);
  });

  it('should format date correctly even when not full timestamp', function(){
    var result = textual.formatDate('[14:46:29] <mts_> oy stkhlm ', '2013-08-16.txt');
    var expected = '2013-08-16T14:46:29+08:00';

    assert.equal(result, expected);
  });
});