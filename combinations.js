/* jshint asi: true, expr: true */
var R = require('ramda')
var _ = require('lodash')

var tap = R.flip(R.tap);

var shift = function(array){
	return function(){
			array.shift()
	}
}

var pair = _.curry(Array,2);
var pairWith = _.curry(function(array,item){
	return R.compose(R.flip(R.map)(array),pair)(item)
})

var combinations2 = function(items){

	var compareTo = R.tail(items)


	var combinationsFor = R.compose(R.flip(R.map)(compareTo),pair)

	return R.pipe(
		_.initial,
		R.map(
			R.pipe(
				pairWith(compareTo),
				tap(
					shift(compareTo)
				)
			)
		),
		R.unnest
	)(items)

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
