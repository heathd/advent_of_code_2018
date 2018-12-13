"use strict";

const stringify = require('string.ify')

function build(type, time, guardNumber) {
  return {
    type: type,
    guardNumber: guardNumber,
    time: time,
    date: time.substring(0,10),
    minute: parseInt(time.substring(time.length - 2)),
    valueOf: function() { return time; },
    toString: function() { return time; }
  }
}

function shiftStart(match) {
  return build(
    "shift start",
    match[1],
    parseInt(match[2])
  )
}


function fallsAsleep(match) {
  return build(
    "falls asleep",
    match[1]
  )
}


function wakesUp(match) {
  return build(
    "wakes up",
    match[1]
  )
}

function parse(input) {
  var matchers = [
    [shiftStart, /^\[([0-9]+-[0-9]+-[0-9]+ [0-9]+:[0-9]+)\] Guard #([0-9]+) begins shift$/],
    [fallsAsleep, /^\[([0-9]+-[0-9]+-[0-9]+ [0-9]+:[0-9]+)\] falls asleep$/],
    [wakesUp, /^\[([0-9]+-[0-9]+-[0-9]+ [0-9]+:[0-9]+)\] wakes up$/],
  ];

  var matcher = matchers.find(([fn, re]) => re.exec(input))
  if (matcher) {
    var [builder, re] = matcher
    return builder(re.exec(input))
  }
}

module.exports = {
  parse: parse
}
