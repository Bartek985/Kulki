class Piece {
    constructor(color) {
        this._color = color;
        this.cube = null;
    }

    createGeometry = () => {
        const pieceGeometry = new THREE.SphereGeometry(5, 40, 20);
        const blue = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("../textures/materials/blue.jpg"),
        });
        const green = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("../textures/materials/green.jpg"),
        });
        const orange = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("../textures/materials/orange.jpg"),
        });
        const red = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("../textures/materials/red.jpg"),
        });
        const grey = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("../textures/materials/grey.jpg"),
        });
        const black = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("../textures/materials/black.jpg"),
        });


        var cube;
        //cube.userData = { colorValue: this._color };  //nie dziala-----error
        switch (this._color) {
            case 0:
                console.log("Error, wrong argument!");
                break;
            case 1:
                cube = new THREE.Mesh(pieceGeometry, blue);
                break;
            case 2:
                cube = new THREE.Mesh(pieceGeometry, green);
                break;
            case 3:
                cube = new THREE.Mesh(pieceGeometry, orange);
                break;
            case 4:
                cube = new THREE.Mesh(pieceGeometry, red);
                break;
            case 5:
                cube = new THREE.Mesh(pieceGeometry, grey);
                break;
            case 6:
                cube = new THREE.Mesh(pieceGeometry, black);
                break;
        }
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