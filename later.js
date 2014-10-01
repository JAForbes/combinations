/* jshint expr:true, asi:true */
var later = (function(){
  var stack = [];
  tick = function(){
    while(stack.length){
      stack.pop()()
    }
    requestAnimationFrame(tick)
  }
  var register = function(fn){
    stack.push(fn)
  }
  tick()
  return register;
})()

module.exports = later;
