/* jshint asi:true, expr:true */

var expect = require('./expect')
var combinations = require('./combinations')

var list = ['A','B','C','D']
expect(
  'Combination Size:2',
  combinations(2,list)[5],'C,D'
)
expect(
  'Combination Size:3',
  combinations(3,list)[3],'B,C,D'
)
expect(
  'Combination Size:4',
  combinations(4,list),'A,B,C,D'
)
expect(
  'Combination Size:5',
  combinations(4,['A','B','C','D','E'])[3],'A,C,D,E'
)

expect(
  'Combination Size:2 Number',
  combinations(2,[1,2,3,4])[5],'3,4'
)

expect(
  'Combination Size:3 Object',
  combinations(2,[{a:1},{b:2},{c:3},{d:3}])[5][0].c,3
)
