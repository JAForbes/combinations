var R = require('ramda')

var loops = 12;
var limit = 4;
var totalInnerIterations = Math.pow(limit,loops);
var indexes = []

R.times(function(count){
  var indexes = R.times(function(index){
    return Math.floor(count/Math.pow(limit,index) % limit) ;
  },loops)
},totalInnerIterations)
