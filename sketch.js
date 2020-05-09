var database ;
var drawing = [];
var currentPath ;
var tsanand ;
var path ;
var canvas ;
var point ;
var button1 ;
var nAme ;
var reset ;
var saveButton;
let isDrawing = false ;
function setup(){
    canvas =   createCanvas(window.innerWidth,window.innerHeight);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);
    database = firebase.database();
    reset = createButton("Reset");
    nAme = createInput("Username");
    button1 = createButton("Submit");
}

function startPath(){
  isDrawing = true;
    currentPath = [] ;
 drawing.push(currentPath);
}

function endPath(){
  isDrawing = false ;
}

function draw(){
    background(0);
    reset.mousePressed(resetPage);
    button1.position(displayWidth/2,850);
    nAme.position(displayWidth/2,800);
    reset.position(displayWidth-200,700);
    button1.mousePressed(saveDrawing);

    if(isDrawing){
         point = {
            x : mouseX ,
            y : mouseY
        }
        currentPath.push(point);
    }

    if(mouseIsPressed == button1){
         tsanand = database.ref("/").update({
            x : xpoi ,
            y : ypoi ,
            name : nAme
        });

        resetPage();
    }

        stroke(100,200,150);
        strokeWeight(10);
        noFill();

        for(var i = 0 ; i   < drawing.length ; i++){
             path = drawing[i];
            beginShape();
            for(var t = 0 ; t   < path.length ;t++){
                vertex(path[t].x,path[t].y)
            }
            endShape();
        }

}
function saveDrawing(){
  var saveRef = database.ref('artist');
  var data  = {
    name : nAme.value() ,
    drawing : drawing
  }
   saveRef.push(data );
}

function resetPage(){
  drawing = [];
}
