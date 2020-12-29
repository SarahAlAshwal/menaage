// this is a test file 
const url = 'https://www.youtube.com/watch?v=1NrHkjlWVhM&list=RDCMUCFbNIlppjAuEX4znoulh0Cw&start_radio=1&t=2649';
const start = url.indexOf('=');
let vID = ''
if( url.includes("&")){
  const end = url.indexOf("&");
  vID = url.slice(start+1,end-1);
}else {
 vID= url.substr(start+1);
}


console.log('1NrHkjlWVhM'.length)
console.log(vID);