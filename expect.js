/* jshint asi:true, expr:true */
function expect(message,input,value){

  input = (typeof input == 'function') && input() || input

  var answer = ''+input == ''+value;

  if(!answer){
    console.error('FAIL:',message,'\n\texpected '+value+' instead of',input)
  } else {
    console.log('PASSED:',message)
  }
}

module.exports = expect
