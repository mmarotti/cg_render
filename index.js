const csv = require('csvtojson');
const fs = require('fs')


const getVertices = async (csvPath) => {
  try {  
    const vertices = await csv({
      headers: ['id', 'x', 'y'],
      checkType: true
    }).fromFile(csvPath);
  
    return vertices
  } catch (error) {
    console.log('Couldn\'t transform .csv', { error });

    throw error;
  }
};

// Validate if every vertex from face exists
const validateFace = (face, vertices) => {
  for (attribute of ['v_1', 'v_2', 'v_3']) {
    const id = face[attribute];
    const vertex = vertices.find(v => id === v.id);

    if (!vertex) throw new Error(`Vertex with id ${id} doesn't exists (face ${face.id})`)
  };
  
  return true
};

const getFaces = async (csvPath, vertices) => {
  try {  
    const faces = await csv({
      headers: ['id', 'v_1', 'v_2', 'v_3'],
      checkType: true
    }).fromFile(csvPath);
  
    for (face of faces) validateFace(face, vertices);

    return faces
  } catch (error) {
    console.log('Couldn\'t transform .csv', { error });

    throw error;
  }
};

const index = async () => {
  const vertices = await getVertices('./mocks/vertices.csv');

  console.log({ vertices });
  let jsonVert = JSON.stringify(vertices);

  const faces = await getFaces('./mocks/faces.csv', vertices);
  let jsonFaces = JSON.stringify(faces);

  fs.writeFileSync('vertices.json', jsonVert);
  fs.writeFileSync('faces.json', jsonFaces);

  console.log({ faces });
};

index()