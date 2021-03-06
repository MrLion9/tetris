function detailBuilder (size, scene){
	this.scene = scene;

	this.size = size;
}

detailBuilder.prototype.create = function(path, color, position){
	var figure = [];

	var material = new BABYLON.StandardMaterial("color", this.scene);
    material.diffuseColor = new BABYLON.Color3.FromInts(color[0], color[1], color[2]);

	var start = BABYLON.MeshBuilder.CreateBox("box", {size: this.size}, this.scene);
	start.setPhysicsState({
        impostor: BABYLON.PhysicsEngine.MeshImpostor,
        mass: 1
    });
    start.material = material;
    start.position = position;
	figure.push(start);

	var parent = start;
	for(var i = 0; i <= path.length; i++){
		switch (path[i]){
			case 0: // back to previous parent
				parent = figure[figure.length-2];
				break;
			case 1: // up
				var cube = BABYLON.MeshBuilder.CreateBox("box", {size: this.size}, this.scene);
				cube.setPhysicsState({
		            impostor: BABYLON.PhysicsEngine.MeshImpostor,
		            mass: 1
		        });
				cube.material = material;
				cube.parent = parent;
				parent = cube;
				cube.position.y = this.size;
				figure.push(cube);
				break;
			case 2: // down
				var cube = BABYLON.MeshBuilder.CreateBox("box", {size: this.size}, this.scene);
				cube.setPhysicsState({
		            impostor: BABYLON.PhysicsEngine.MeshImpostor,
		            mass: 1
		        });
				cube.material = material;
				cube.parent = parent;
				parent = cube;
				cube.position.y = -this.size;
				figure.push(cube);
				break;
			case 3: // left
				var cube = BABYLON.MeshBuilder.CreateBox("box", {size: this.size}, this.scene);
				cube.setPhysicsState({
		            impostor: BABYLON.PhysicsEngine.MeshImpostor,
		            mass: 1
		        });
				cube.material = material;
				cube.parent = parent;
				parent = cube;
				cube.position.x = this.size;
				figure.push(cube);
				break;
			case 4: // right
				var cube = BABYLON.MeshBuilder.CreateBox("box", {size: this.size}, this.scene);
				cube.setPhysicsState({
		            impostor: BABYLON.PhysicsEngine.MeshImpostor,
		            mass: 1
		        });
				cube.material = material;
				cube.parent = parent;
				parent = cube;
				cube.position.x = -this.size;
				figure.push(cube);
				break;
		}
	}
	return figure;
};