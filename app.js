let etchASketch = document.getElementById('etchasketch');
let content = document.getElementById('content');
let elements = document.getElementsByClassName('grid-item');
let clearButton;
let randomButton;
let blackAndWhiteButton;
let rows = 0;
let cols = 0;
let opacity = 0.1;
let isDrawing = false;
let gridColor = 'black';
content.style.backgroundColor = "rgb(255, 255, 215)"; 

init();

function init(){
  makeClearButton();
  makeRandomColorButton();
  makeBlackAndWhiteButton();
  makeGrid(16,16);
  mouseEvents();
};

randomButton.addEventListener("click", function(){   
  gridColor = getRandomColor();
});

blackAndWhiteButton.addEventListener("click", function(){   
  gridColor = 'black';
});

clearButton.addEventListener("click", function(){    
  let squaresPerSide = prompt("How many squares per side to make new grid?");

  if(parseInt(squaresPerSide) <=100){
    while(content.firstChild){
      content.removeChild(content.firstChild);
    }
    makeGrid(squaresPerSide,squaresPerSide);
    mouseEvents();
  } else{
     alert("No more than 100!")
    } 
});

function mouseEvents(){   
  Array.prototype.forEach.call(elements, function(element) {
 
   element.addEventListener('click',function (){
     isDrawing = true;
      draw(element);
    }); 
    element.addEventListener('mousedown',function (){
      isDrawing = true;
      draw(element);
    }); 
    element.addEventListener('mouseleave',function (){
      draw(element);
    });
    element.addEventListener('mouseup',function (){
      isDrawing = false;     
    });    
  });
};

function draw(element){   
    if(isDrawing == true){
    element.classList.remove('grid-item-clear');
    element.classList.add('grid-item-mouseout');
    element.style.opacity = opacity;
    element.style.backgroundColor = gridColor;
  }
    if(opacity <= 1){
      opacity += 0.1;
    }else{
      opacity = 0.1;
    } 
};  

function getRandomColor(){
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function makeGrid(rows, cols){
    content.style.setProperty('--grid-rows', rows);
    content.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      cell = document.createElement("div");      
      content.appendChild(cell).className = "grid-item";
    };
  };

function makeClearButton (){
  clearButton = document.createElement("button");
  var t = document.createTextNode("Clear");
  clearButton.classList.add('clear-button');
  clearButton.appendChild(t);
  etchasketch.appendChild(clearButton);
};

function makeRandomColorButton (){
  randomButton = document.createElement("button");
  var t = document.createTextNode("Random");
  randomButton.classList.add('random-button');
  randomButton.appendChild(t);
  etchasketch.appendChild(randomButton);
};

function makeBlackAndWhiteButton (){
  blackAndWhiteButton = document.createElement("button");
  var t = document.createTextNode("B & W");
  blackAndWhiteButton.classList.add('blackandwhite-button');
  blackAndWhiteButton.appendChild(t);
  etchasketch.appendChild(blackAndWhiteButton);
};
