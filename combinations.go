package main

import (
  "math"
  "os"
  "strconv"
  "encoding/json"
  "io/ioutil"
  "fmt"
)

func main(){

  //get the number of loops and the range from the command line arguments
    args := os.Args[1:]
    loops, _ := strconv.ParseFloat(args[0],64)
    limit, _ := strconv.ParseFloat(args[1],64)

  //get the total number of iterations
    totalInnerIterations := int(math.Pow(limit,loops))

  combos :=  map[string][][]int{
    "combinations": make([][]int,totalInnerIterations),
  }



  for count:=0; count<totalInnerIterations; count++ {
    //[i,j,k,l,m, ...] in a traditional nested for loop
    indexes := make([]int,int(loops))

    //generate the indexes
    for index:=0; index<int(loops); index++ {
      var lastIterator int;
      if index>0 {
        lastIterator = indexes[index-1]

      }
      fmt.Println(lastIterator)
      indexes[index] = int( math.Mod(float64(count)/math.Pow(limit,float64(index)),limit) )
    }
    combos["combinations"][count] = indexes

  }

  output,_ := json.Marshal(combos)
  limitStr := 	strconv.FormatFloat(limit, 'f', 0, 64)
  loopsStr := 	strconv.FormatFloat(loops, 'f', 0, 64)
  //dump json in a file
  err := ioutil.WriteFile("c("+limitStr+"_"+loopsStr+").json", output, 0644)
  if err != nil {
      panic(err)
  }
}
