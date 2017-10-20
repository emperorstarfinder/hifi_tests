// Test material matrix

//(function() {
// Rest of this script below is common to all the scripts
var MODEL_DIR_URL = "https://github.com/highfidelity/hifi_tests/blob/master/assets/models/material_matrix_models/fbx/blender/";
var MODEL_NAME_SUFFIX = ".fbx?raw=true";
var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
var MODEL_SCALE = 0.75;
var MODEL_SPIN = 0.0;
var ROOT_Y_OFFSET = -0.1;
var ROOT_Z_OFFSET = 3.0;


function addTestModel(name, position, orientation) {
  var newModel = Entities.addEntity({
      type: "Model",
      modelURL: MODEL_DIR_URL + name + MODEL_NAME_SUFFIX,
      name: name,
      position: position,    
      rotation: orientation,    
      dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
      angularVelocity:{"x":0.0,"y":MODEL_SPIN,"z":0},
      angularDamping:0,
      lifetime: 60,
    });

  return newModel;
}

function addTestCase(test, origin, orientation) {    
    var unit = MODEL_SCALE * (MODEL_DIMS.x + MODEL_DIMS.z);

    var axisA = Vec3.normalize(Vec3.sum(Quat.getUp(orientation), Quat.getForward(orientation)));

    var center = Vec3.sum(origin, Vec3.multiply(test.a * unit, axisA));
    center = Vec3.sum(center, Vec3.multiply(test.b * unit, Quat.getRight(orientation)));

    return addTestModel(test.name, center, orientation);
}

function addCasesAt(origin, orientation, testCases) {
    var models = [];
    for (var i = 0; i < testCases.length; i++) {
        models.push(addTestCase(testCases[i], origin, orientation));
    }  
    return models;
}
  
addCases = function (testCases) {
    var orientation = MyAvatar.orientation;
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);
    var root = Vec3.sum(MyAvatar.position, Vec3.multiply(ROOT_Z_OFFSET, Quat.getForward(orientation)));
    root = Vec3.sum(root, Vec3.multiply(ROOT_Y_OFFSET, Quat.getUp(orientation)));
        
    return addCasesAt(root, orientation, testCases);
}

/*

// Pick a position in front of the avatar
var orientation = MyAvatar.orientation;
orientation = Quat.safeEulerAngles(orientation);
orientation.x = 0;
orientation = Quat.fromVec3Degrees(orientation);
var root = Vec3.sum(MyAvatar.position, Vec3.multiply(ROOT_Z_OFFSET, Quat.getForward(orientation)));
root = Vec3.sum(root, Vec3.multiply(ROOT_Y_OFFSET, Quat.getUp(orientation)));


// Add the Cases
var createdEntities = addCases(root, orientation, TEST_CASES)

// clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});
*/

//}());

