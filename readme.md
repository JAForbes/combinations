Idea for a variable combination length function
===============================================

    combinations = (items,combinationLength) ->


      //items = [A,B,C,D]

Step 1. create a copy of `items` called `sublist` and an empty array for the results.

    sublist = items.slice() //[A,B,C,D]
    results = []

Step 2. shift sublist by 1 so we don't compare A to A

    sublist = sublist.shift() //[B,C,D]

Step 3. Find combinations of `combinationLength` -1 of this `subList`

    subCombinations = combinations(sublist,combinationLength-1)

    //  sublist is [B,C,D]
    //    subCombinations is [ [B,C] , [B,D] , [C,D] ]
    //

Step 4. Select the item preceding the sublist from the list

    item = items[list.length-sublist.length+1] // A == items[4-(3+1)] == items[0]

Step 5. join the current `item` with each subCombination

    var combininations = _.map subCombinations, (combination) ->
      return _.union(item,combination)

    //combinations is [
    //  [A,B,C],
    //  [A,B,D],
    //  [A,C,D]
    //]

    results.push.apply(result,combinations) //add our combinations to the results


Step 6. Repeat from Step 2.


Step 6.2. `subList` = shift `sublist` by 1

    sublist = sublist.shift() //[C,D]

Step 6.3. Find combinations of `combinationLength` -1 of this `subList`

    subCombinations = combinations(sublist,combinationLength-1)

    //  sublist is [C,D]
    //    subCombinations is [ [C,D] ]
    //

Step 6.4 Select the item preceding the sublist from the list

    item = items[list.length-sublist.length+1] // B == items[4-(3+1)] == items[1]

Step 6.5. join the current `item` with each subCombination

    var combininations = _.map subCombinations, (combination) ->
      return _.union(item,combination)

    //combinations is [
    //  [B,C,D],
    //]

    results.push.apply(result,combinations) //add our combinations to the results

Step 7. We can no longer repeat Step 2. because the new `subList`
would be too short to make a valid combination.

    sublist = sublist.shift() //[D] too short!!

Step 8. Flatten our combinations list together and return them.

    return results;

    // [
    //  [A,B,C],
    //  [A,B,D],
    //  [A,C,D],
    //  [B,C,D]
    //]

How do we get the sub-combinations?
-----------------------------------

The idea is, you ask for combinations recursively down until
your combination length is just 2.  And when that happens
we use this function.

    function combinations(){

      var compareTo = items.slice(1)//copy and skip first
      var combinations = [];

      function combinationsFor(item){
        return R.map(function(compare){
          return [item,compare];
        },compareTo)
      }

      for(var i = 0; compareTo.length; i++){
        combinations.push.apply(combinations,combinationsFor(items[i]))
        compareTo.shift()
      }
      return combinations;
    }
