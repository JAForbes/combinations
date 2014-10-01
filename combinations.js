/* jshint asi: true, expr: true */
var R = require('ramda')
var _ = require('lodash')

var union = R.curry(function(array,array2){
	array.push.apply(array,array2)
	return array;
})

var shift = function(array){
	return function(){
			array.shift()
	}
}



var combinations2 = function(items){

	var compareTo = items.slice(1)//copy and skip first
	var combinations = [];

	var combinationsFor = R.curry(function(compareTo,item){
		return R.map(function(compare){
			return [item,compare];
		},compareTo)
	})

	R.pipe(
		_.initial,
		R.map(
			R.pipe(
				combinationsFor(compareTo),
				union(combinations),
				shift(compareTo)
			)
		)
	)(items)
	return combinations;
}

var combinationsN = function(items,n){
	if(n > 2){

		var results = []
		var sublist = items.slice() //step 1

		analyse = function(){
				//step 2
				sublist.shift()


				//step 3
				var subCombinations = combinationsN(sublist, n -1 )
				//step 4
				var item = items[items.length - sublist.length -1]
				//step 5
				var combinations = R.map(function(combination){
					return _.union([item],combination)
				},subCombinations)

				;([]).push.apply(results,combinations);
				if(sublist.length > n-2){
					analyse()
				}
		}

		analyse()
		return results;

	} else {
		return combinations2(items)
	}
}
module.exports = combinationsN
