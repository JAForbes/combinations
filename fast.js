var R = require('ramda')
var _ = require('lodash')

var start = new Date().getTime()

list = _.range(5000)

A = list.slice(0,-1)
B = list.slice(1)

var combinations = [A]
for(var i = 1; i<A.length; i+=1){
  combinations.push(
    R.union(A.slice(0,A.length-i),B.slice(A.length-i))
  )
}
combinations.push(B)
//console.log('\n'+combinations.join('\n'))
console.log(new Date().getTime()-start)
