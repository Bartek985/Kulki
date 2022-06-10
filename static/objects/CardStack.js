class CardStack {
    constructor(_texture, _height) {
        this.cube = null
        this.texture = _texture;
        this.height = _height;
    }

    createGeometry = () => {
        const cardsGeometry = new THREE.BoxGeometry(40, this.height, 56);
        const materials = [];

        materials.push(new THREE.MeshPhongMaterial({ specular: 0xffffff, shininess: 20, side: THREE.DoubleSide, map: new THREE.TextureLoader().load('../textures/materials/paper.jpg') }));
        materials.push(new THREE.MeshPhongMaterial({ specular: 0xffffff, shininess: 20, side: THREE.DoubleSide, map: new THREE.TextureLoader().load('../textures/materials/paper.jpg') }));
        materials.push(new THREE.MeshPhongMaterial({ specular: 0xffffff, shininess: 20, side: THREE.DoubleSide, map: new THREE.TextureLoader().load('../textures/materials/' + this.texture) }));
        materials.push(new THREE.MeshPhongMaterial({ specular: 0xffffff, shininess: 20, side: THREE.DoubleSide, map: new THREE.TextureLoader().load('../textures/materials/paper.jpg') }));
        materials.push(new THREE.MeshPhongMaterial({ specular: 0xffffff, shininess: 20, side: THREE.DoubleSide, map: new THREE.TextureLoader().load('../textures/materials/paper.jpg') }));
        materials.push(new THREE.MeshPhongMaterial({ specular: 0xffffff, shininess: 20, side: THREE.DoubleSide, map: new THREE.TextureLoader().load('../textures/materials/paper.jpg') }));
        /*const cardsMaterial = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 40,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("textures/materials/paper.jpg"),
        });*/
        var cube;
        cube = new THREE.Mesh(cardsGeometry, materials);
        cube.rotation.y = Math.PI / 2;
        return cube;
    }
}