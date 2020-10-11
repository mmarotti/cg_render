//getting faces and vertices
let faces, vertices;
$.ajaxSetup({
  async: false
});
$.getJSON("faces.json", function (json) {
  faces = json;
});
$.getJSON("vertices.json", function (json) {
  vertices = json
});


function returnVerticeData(vertice_id) {

  return vertices.find(vertice => vertice.id == vertice_id);
}

faces.map(face => { //mudando os vertices para seus respectivos pontos
  face.v_1 = returnVerticeData(face.v_1);
  face.v_2 = returnVerticeData(face.v_2);
  face.v_3 = returnVerticeData(face.v_3);
})

console.log(faces);

function setup() {
  // createCanvas must be the first statement
  createCanvas(800, 800);
  stroke(255, 0, 0); // Set line drawing color to white
  strokeWeight(5); //set stroke size
  frameRate(1);
  noLoop(); //only draw once
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
  background(0); // Set the background to black
  
  for (face of faces){
    triangle(face.v_1.x/5+400, face.v_1.y/5+400, face.v_2.x/5+400, face.v_2.y/5+400, face.v_3.x/5+400,   face.v_3.y/5+400);
  }
  
}