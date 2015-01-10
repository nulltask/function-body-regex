
var assert = require('better-assert');
var regex = require('../');



var fn1 = function(foo) { var bar = 1; return foo + bar; };
var fn2 = function foo(bar) { var baz = 1; return bar + baz; };

describe('function-body-regex', function() {
  it('should be a regex', function() {
    assert('[object RegExp]' == Object.prototype.toString.call(regex));
  });
  it('should be an array', function() {
    var ret = regex.exec(fn1.toString());
    assert('[object Array]' == Object.prototype.toString.call(ret));
    assert(ret[0] == 'function (foo) { var bar = 1; return foo + bar; }');
    assert(ret[1] == ' var bar = 1; return foo + bar; ');
    var ret = regex.exec(fn2.toString());
    assert('[object Array]' == Object.prototype.toString.call(ret));
    assert(ret[0] == 'function foo(bar) { var baz = 1; return bar + baz; }');
    assert(ret[1] == ' var baz = 1; return bar + baz; ')
  });
  it('should be a null', function() {
    assert(null === regex.exec('this is not a function.'))
  })
})
