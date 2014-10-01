/* jshint asi: true, expr: true */
var R = require('ramda')
var _ = require('lodash')

var tap = R.flip(R.tap);

var shift = function(array){
	return function(){
			array.shift()
	}
}

/*
	Pairs two items
*/
var pair = _.curry(Array,2);

/*
	Pairs an item to every item in a list
*/
var pairWith = _.curry(function(array,item){
	return R.compose(R.flip(R.map)(array),pair)(item)
})
/*
	Pairs every item in two lists together without repeating a combination
*/
var pairAll = function(list,otherItems){
	return R.map(
		R.pipe(
			pairWith(otherItems),
			tap(shift(otherItems))
		)
	)(list)
}

/*
	Turns an array into two arrays, where the first removes it's last
	and the second remove's it's first.

	Then calls the callback with the two arrays as it's arguments
*/
var offset = R.curry(function (callback,array){
	return R.converge(callback,_.initial,R.tail)(array)
})

var combinations2 = R.pipe(
	offset(pairAll),
	R.unnest
)

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
