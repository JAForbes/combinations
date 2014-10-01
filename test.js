/* jshint asi:true, expr:true */

var expect = require('./expect')
var combinations = require('./combinations')

var list = ['A','B','C','D']
expect(
  'Combination Size:2',
  combinations(list,2)[5],'C,D'
)
expect(
  'Combination Size:3',
  combinations(list,3)[3],'B,C,D'
)
expect(
  'Combination Size:4',
  combinations(list,4),'A,B,C,D'
)
expect(
  'Combination Size:5',
  combinations(['A','B','C','D','E'],4)[3],'A,C,D,E'
)
