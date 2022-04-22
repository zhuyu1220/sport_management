var fs = require('fs');
fs.readFile('./index.vue','utf-8', function(err,data){
 if(err){
  console.log(err);
 }else{
     let result = data.replace(/\d{2,4}px/g, str => {
        return Math.ceil(str.substring(0,str.length-2)*0.8) + 'px';
     })
   fs.writeFile('./index.vue',result, function (error) {
        console.log(error);
        
     })
 }
})