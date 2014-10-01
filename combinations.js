/* jshint asi: true, expr: true */
var R = require('ramda')
var _ = require('lodash')

var tap = R.flip(R.tap);

var shift = function(array){
	return function(){
			array.shift()
	}
}

var decrement = R.flip(R.subtract)(1)
var increment = R.add(1)
var union = R.curry(R.union)
var at = R.curry(function(index,array){
	return array[index];
})
var sliceFrom = R.flip(R.converge(
  R.skip,
  R.pipe(R.indexOf,increment),
  R.flip(R.I)
))
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

var combinationsN = R.curry(function(n,items){
	if(n > 2){

		return R.pipe(
			R.reject(R.eq(_.last(items))),
			R.map(
				R.pipe(
					R.converge(
							R.map,
							R.pipe(Array,union),
							R.pipe(sliceFrom(items),combinationsN(decrement(n)))
					)
				)
			),
			R.unnest
		)(items)

	} else {
		return combinations2(items)
	}
})
module.exports = R.flip(combinationsN)
