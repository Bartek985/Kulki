class BoardTile {
    constructor() {
        this.cube = null;
    }

    createGeometry = () => {
        const tileGeometry = new THREE.BoxGeometry(16, 8, 16);
        const boardMaterial = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 40,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("../textures/materials/iron.jpg"),
        });
        var cube;
        cube = new THREE.Mesh(tileGeometry, boardMaterial);
        //cube.userData = { allowed: true };
        return cube;
    }

    set color(val) {
        console.log("setter")
        this._color = val
    }
    get color() {
        console.log("getter")
        return this._color
    }
}