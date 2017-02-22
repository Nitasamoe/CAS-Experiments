var ftns = [];
var baseAgent = {
  gate : function( rec,arg ){
                          yes = true;
                          var own   = this.rec.split("");
                          var fremd = rec.split("");
                           for( var i=0;i<own.length;i++ ){
                               if(own[i]===fremd[i] || own[i]==="#"){
                                 yes = true;
                               } else {yes = false; break;}
                           }
                          if( yes === true ){ this.init(arg) }
                          else { console.log("Has failed the Gate!!!") }
          }, // checks if the incoming signal can be let through the gate and computed
  init : function( a ){ console.log("start of "+this.name);
                        var computed =  this.ftn.apply(this,a);
                        this.scream(computed);
                        //console.log("Output : "+this.send)
                        start( ftns,this.send,[computed,2]);
                       },
  scream : function( a ){ console.log(a) } // just logs something to the console
}

function ftn(name,inp,rec,send){ // Creates an Function and puts into FTN ARRAY
  var cap = Object.create(baseAgent);
  cap.rec = rec;
  cap.send = send;
  cap.name = name;
  cap.ftn = inp;
  ftns.push(cap)
  return cap;
}

var div = ftn("div",function(inp,num){return inp/num},"###1","0010");
var add = ftn("add",function(inp,num){return inp+num},"##10","0100");
var mult = ftn("mult",function(inp,num){return inp*num},"#101","1010");
var sub = ftn("sub",function(inp,num){return inp-num},"0#00","1110");

function start( arr,signalIncoming,arg ){
  arr.forEach(function(el){
      el.gate( signalIncoming,arg );
  })
}
start( ftns,"1111",[23,49] );
console.log(ftns)
