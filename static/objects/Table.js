class Table {
    constructor() {
        this.cube = null
    }

    createGeometry = () => {
        const geometry = new THREE.PlaneGeometry(800, 800, 50, 50);
        const texture = new THREE.TextureLoader().load("../textures/materials/wood.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(50, 50);
        const tableMaterial = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 10,
            side: THREE.DoubleSide,
            map: texture,// = new THREE.TextureLoader().load("textures/materials/wood.jpg"),
            //wrapS: THREE.RepeatWrapping,
            //wrapT: THREE.RepeatWrapping,
        });

        /*const texture = new THREE.TextureLoader().load("textures/materials/wood.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);*/
        //const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        var cube;
        cube = new THREE.Mesh(geometry, tableMaterial);
        cube.rotation.x = Math.PI / 2;
        return cube;
    }
}