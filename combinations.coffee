R = require('ramda')
_ = require('lodash')

var combinations = function(items){

	var compareTo = items.slice(1)//copy and skip first
	var combinations = [];

	for(var i = 0; compareTo.length; i++){
		combinations.push.apply(combinations,combinationsFor(items[i]))
		compareTo.shift()//remove the first item from compareTo to avoid repeating combinations e.g. AB and BA
	}

	function combinationsFor(item){
		return R.map(function(compare){
			return [item,compare];
		},compareTo)
	}
	return combinations;
}

combinationsOf2 = (items) ->
  compareTo = items.slice()

  combinations = []
