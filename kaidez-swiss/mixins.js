
var mixin = require('rework-plugin-mixin');

var rework = require('rework');
var css = require('css');
var mixins = require('./mixins');
var fs = require('fs');

var css = rework(css)
  .use(mixin({ overflow: ellipsis }))
  .toString();

function ellipsis(type) {
  if ('ellipsis' == type) {
    return {
      'white-space': 'nowrap',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    }
  }

  return type;
}

module.exports = ellipsis;