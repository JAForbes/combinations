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

/*
	Creates a new list that begins after the index of
	a given item.

	var list = ['A','B','C','D']
	sliceFrom('B',list) //=> [C,D]
*/
var sliceFrom = R.flip(R.converge(
  R.skip,
  R.pipe(R.indexOf,increment),
  R.flip(R.I)
))

/*
	Turns an array into two arrays, where the first removes it's last
	and the second remove's it's first.

	Then calls the callback with the two arrays as it's arguments
*/
var offset = R.curry(function (callback,array){
	return R.converge(callback,_.initial,R.tail)(array)
})

/*
	Pairs two items
*/
var pair = _.curry(Array,2);

/*
	Pairs an item to every item in a list
*/
var pairWith = R.flip(R.converge(
	R.map,
	R.compose(R.prepend,R.I),
	R.flip(R.I)
))

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

var combinations2 = R.pipe(
	offset(pairAll),
	R.unnest
)

var combinationsN = R.curry(function(n,items){
		return R.pipe(
			R.reject(R.eq(_.last(items))), //point to every but the last, as by then we have already referenced it
			R.map(												//map items
				R.pipe(
					R.converge(								//converge so push can accept item and combinations
							R.map,
							R.prepend,				//push item into combinations
							R.pipe(
								sliceFrom(items),							//create a copy of the list shifted to the right
								combinations(decrement(n))		//get all the combinations for the shifted list
							)
					)
				)
			),
			R.unnest		//lift each map's combination list into a single list
		)(items)
})

combinations = R.curry(function (n,items){
	if(n > 2){
		return combinationsN(n,items)
	} else {
		return combinations2(items)
	}
})

module.exports = combinations
