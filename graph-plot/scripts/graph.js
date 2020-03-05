/*
 * graphjs: plotting a function graph in JavaScript.
 * MIT License
 */

var graph = (function(){

var $ = function( id ){ return document.getElementById( id );}

    , canvas = $("canvas")

    , WIDTH  = canvas.width

    , HEIGHT = canvas.height
  
    , ctx;

   function init() {

      //checking for support
      if(canvas.getContext) {

         ctx = canvas.getContext('2d')

         _attach()

      } else {

         return;    
      }

      drawAxes() 

      var f = function(x) {return Math.sin(x); }
     
      color = "rgb(11,153,11)";

      render(f, color)
   }

function _attach() {

   graph.addEvent($('form'),'submit', function( e ){

      e.preventDefault() 

      e.stopPropagation()

      var F = $('q').value

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      drawAxes()

      render( function( x ){ return eval(F); }, "rgb(11,153,11)" )  

   }, false) 
}

//returns the left boundary limit inf
function minX() {

    return -10
};

//returns the right boundary limit sup
function plusX() {

    return 10
};

//returns the bottom boundary limit inf
function minY() {

    return minX() * HEIGHT / WIDTH
};

//returns the top boundary limit sup
function plusY() {

    return plusX() * HEIGHT / WIDTH
};

function X( x ) {

    return ( x - minX() ) / ( plusX() - minX() ) * WIDTH;
}

function Y( y ) {

    return  HEIGHT - ( y - minY() ) / ( plusY() - minY() ) * HEIGHT ;        
}
   
function drawAxes() {
 
    ctx.strokeStyle = "rgb(10,10,10)"

    ctx.beginPath()
    ctx.moveTo(WIDTH/2,0)
    ctx.lineTo(WIDTH/2,HEIGHT/2) 
    ctx.stroke()      

    ctx.beginPath()
    ctx.moveTo(WIDTH/2,HEIGHT/2) 
    ctx.lineTo(WIDTH/2,HEIGHT) 
    ctx.stroke()      

    ctx.beginPath()
    ctx.moveTo(0,HEIGHT/2) 
    ctx.lineTo(WIDTH/2,HEIGHT/2) 
    ctx.stroke()      

    ctx.beginPath()
    ctx.moveTo(WIDTH/2,HEIGHT/2) 
    ctx.lineTo(WIDTH,HEIGHT/2) 
    ctx.stroke()      
}

function render(f,color) {

    var x, 
        y, 
        xStep;

    ctx.strokeStyle = color;

    xStep = (plusX() - minX()) / WIDTH

    ctx.beginPath() 

    for(x = minX(); x < plusX(); x += xStep) {

        y = f(x)

        if(x == minX()) ctx.moveTo(X(x), Y(y))

             else
                        ctx.lineTo(X(x), Y(y))
    }
 
    ctx.stroke()
}

  return {init: init, addEvent: function(elem, evType, handler, capture){ 
         if(elem.addEventListener) {
           return elem.addEventListener(evType, handler, capture)
         } else if(elem.attachEvent) {
           return elem.attachEvent('on'+evType,handler) 
         } else {
           elem['on'+evType] = handler
         }   
  }}
})();

graph.init()
