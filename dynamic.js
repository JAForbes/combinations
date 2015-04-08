var R = require('ramda')

var limit = process.argv[2]*1;
var loops = process.argv[3]*1;
var __;
var totalInnerIterations = Math.pow(limit,loops);
var indexes = []



indexesFromCount = R.curry(function (limit,loops,count){
  var indexes = R.times(
    R.pipe(
      function(index){
        return count/Math.pow(limit,index);
      },
      R.modulo(__,limit),
      Math.floor
    ))(loops)
  console.log(count,indexes.reverse())
  return indexes;
})

indexesFromCount =
//
// R.times(indexesFromCount(limit,loops),totalInnerIterations)

console.log("---")

function loopGen(loops,limit,finalBody){
  function loopGen(iName,start,limit,body){
    return [
      'for(var ',iName,'='+start+'; ',iName,'<',limit,'; ',iName,'++){',body,'}'
    ].join('');

  }

  var output = [];
  for(var count = loops; count > 0; count--){
    var iName = String.fromCharCode(64+count)
    var prevName = String.fromCharCode(63+count)
    var body = output.shift() || finalBody;
    output.push(loopGen(iName,prevName+'+1',limit,body))
  }
  return output[0].replace('@+1','0')
}

var total =0;
var varNames = R.times(R.pipe(R.add(65),String.fromCharCode))
eval(
  loopGen(
    loops,limit,"console.log(total,["+varNames(loops)+"].reverse()); total++"
  )
)


function start(c,s){
  return Math.ceil(Math.pow(c,s) - 1.5*Math.pow(c,s-2)-1)
}

function greaterThan(c,s){
  // (c^s-c^(s-1))
  return Math.pow(c,s) - Math.pow(c,s-1)
}

sumOf = function(func,limit){
  return R.sum(R.times(func,limit))
}

start = R.curry(function(c,s){
  return sumOf(function(i){
    return (i+c-s)*Math.pow(c,i)
  },s)
})

//start(loop,limits)

exponents = R.times(function(i){
  return Math.pow(limit,i)
},loops)

function isCombination(combination){
  count = {}
  var is = true;
  for(var i = 0; i<combination.length; i++){
    var symbol = combination[i]
    count[symbol] = count[symbol] || 0
    count[symbol]++
    is = count[symbol] == 1
    if(!is){
      break;
    }
  }
  return is
}

function findCombinationOnBranch(index){

  return R.pipe(
    R.map(

    ),
    R.filter(isCombination)
  )(exponents)
}

function traverse(loops,limit){
  var startIndex = start(loops,limit)
  var combinations = indexesFromCount(loops,limit,startIndex)
  var prevIndex = startIndex;
  var visited = [prevIndex]
  for(var i = 0; i < exponents.length; i++){
    var currentIndex = prevIndex - startexponents[i];

    visited = currentIndex

    var possibleCombo = indexesFromCOunt(loops,limits,currentIndex);
    if(isCombination(possibleCombo)){
      //check all exponents on new index
        currentIndex = prevIndex;
        i = -1;
    }
  }
}

//traverse(loops,limit)


//console.log('predicted start',start(limit,loops),indexesFromCount(limit,limit,loops))
