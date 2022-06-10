class Game {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
    this.camera.position.set(220, 220, 0);
    this.camera.lookAt(this.scene.position);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    //0-brak, 1-niebieski, 2-zielony, 3-pomaranczowy, 4-czerwony, 5-szary, 6-czarny
    this.pieces = [
      [1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2],
      [3, 3, 3, 3, 3, 3],
      [4, 4, 4, 4, 4, 4],
      [5, 5]
    ];
    this.piecesOnBoard = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    //karty: blue1.jpg, blue2.jpg ... red4.jpg
    this.cards = {
      color: ["blue", "green", "orange", "red"],
      number: ["1", "2", "3", "4"],
      fileType: ".jpg"
    };
    this.randomCardPlayer1 = this.cards.color[Math.floor(Math.random() * 4)] + this.cards.number[Math.floor(Math.random() * 4)] + this.cards.fileType;
    this.randomCardPlayer2 = this.cards.color[Math.floor(Math.random() * (12 - 8))] + this.cards.number[Math.floor(Math.random() * (29 - 25))] + this.cards.fileType;
    while (this.randomCardPlayer2 == this.randomCardPlayer1) {
      this.randomCardPlayer2 = this.cards.color[Math.floor(Math.random() * 4)] + this.cards.number[Math.floor(Math.random() * 4)] + this.cards.fileType;
    }
    console.log(this.randomCardPlayer1, this.randomCardPlayer2);

    this.currentClicked = { type: "none", object: null };
    this.move=0;


    //this.selectedPiece;
    //this.player1turn = true;

    document.getElementById("root").append(this.renderer.domElement);

    this.render(); // wywołanie metody render
    this.generateBoard();
    this.createPieces()
  }

  generateBoard = () => {
    console.log("generate board");

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        var tile = new BoardTile();
        let cube = tile.createGeometry();
        cube.position.set(-48 + i * 16, 0, -48 + j * 16);
        //this.scene.remove(cube);
        this.scene.add(cube);
      }
    }/**/
    const light1 = new THREE.HemisphereLight(0xffffff, 10); //SpotLight HemisphereLight
    light1.position.set(0, 56, 0);
    light1.target = this.scene;
    light1.intensity = 0.9;
    this.scene.add(light1);

    var Nigger = new Piece(6);
    var nigga = Nigger.createGeometry();
    nigga.userData = { colorValue: 6 };
    nigga.position.set(0, 5, 0);
    this.scene.add(nigga);

    let cards = new CardStack("cardTop.jpg", 10);
    let cards_ = cards.createGeometry();
    cards_.position.set(0, 5, -98);
    this.scene.add(cards_);

    let yourCard = new CardStack("../cards/" + this.randomCardPlayer1, 1);
    let yourCard_ = yourCard.createGeometry();
    yourCard_.position.set(0, 0, -98);
    this.scene.add(yourCard_);

    let rivalCard = new CardStack("../cards/" + this.randomCardPlayer2, 1);
    let rivalCard_ = rivalCard.createGeometry();
    rivalCard_.position.set(0, 0, -98);
    rivalCard_.rotation.y = Math.PI * 3 / 2;
    this.scene.add(rivalCard_);


    //animacje----------------------------------------------------------
    setTimeout(() => {
      new TWEEN.Tween(yourCard_.position) // co
        .to({ x: 80 }, 2700) // do jakiej pozycji, w jakim czasie
        .easing(TWEEN.Easing.Sinusoidal.Out) // typ easingu (zmiana w czasie)
        .onUpdate(() => {
          //console.log(this.camera.position);
        })
        .onComplete(() => {
          //console.log("koniec animacji");
        }) // funkcja po zakończeniu animacji
        .start();

      new TWEEN.Tween(rivalCard_.position) // co
        .to({ x: -80 }, 2700)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(() => { })
        .onComplete(() => { })
        .start();
      new TWEEN.Tween(cards_.position) // co
        .to({ y: 2 }, 900)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(() => { })
        .onComplete(() => { })
        .start();
    }, 1250);



    let table = new Table();
    let table_ = table.createGeometry();
    table_.position.set(0, 0, 0);
    this.scene.add(table_);
  };

  createPieces = () => {
    console.log("create pieces");

    for (let i = 0; i < this.pieces.length; i++) {
      for (let j = 0; j < this.pieces[i].length; j++) {
        var piece = new Piece(this.pieces[i][j]);
        //piece.userData = { colorValue: this.pieces[i][j] };
        //piece.setX(444);
        let cube = piece.createGeometry();
        cube.userData = { colorValue: this.pieces[i][j] };
        if (cube != null) {
          cube.position.set(-48 + i * 16 + 16, 1, -48 + j * 16 + 120);
          this.scene.add(cube);
        }
        //this.scene.remove(cube);
      }
    }
    /*if (ui.clientID == 2) {
      this.camera.position.set(-220, 220, 0); //zmien pozycje swiatla
      this.camera.lookAt(this.scene.position);
    }*/
  };


  clickOnSth = (e) => {
    const raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
    const mouseVector = new THREE.Vector2(); // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D

    mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseVector, this.camera);
    const intersects = raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      //console.log(intersects[0].object.material.shininess);
      // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
      let clickedItem = intersects[0].object;
      if (clickedItem.material.shininess == 50) {
        let indeX = (clickedItem.position.x + 48) / 16;
        let indeZ = 6 - (clickedItem.position.z + 48) / 16;

        if (this.currentClicked.type == "piece") {
          let indeX2 = (this.currentClicked.object.position.x + 48) / 16;
          let indeZ2 = 6 - (this.currentClicked.object.position.z + 48) / 16;
          console.log(indeX, indeX2, indeZ, indeZ2);
          //zamien miescami, jesli oba na planszy i obok siebie
          if (indeX >= 0 && indeX2 >= 0 && indeZ >= 0 && indeZ2 >= 0 && indeX <= 6 && indeX2 <= 6 && indeZ <= 6 && indeZ2 <= 6) {
            if (indeX != indeX2 || indeZ != indeZ2) {
              if((Math.abs(indeX-indeX2)==1&&Math.abs(indeZ-indeZ2)==0)||(Math.abs(indeZ-indeZ2)==1&&Math.abs(indeX-indeX2)==0)){
                console.log("mozna zamienic");
                this.currentClicked.object.position.set(indeX * 16 - 48, 5, (6 - indeZ) * 16 - 48);
                this.piecesOnBoard[indeX][indeZ] = this.currentClicked.object.userData.colorValue;
                clickedItem.position.set(indeX2 * 16 - 48, 5, (6 - indeZ2) * 16 - 48);
                this.piecesOnBoard[indeX2][indeZ2] = clickedItem.userData.colorValue;
                this.move += 1;
                console.log("ruch nr."+this.move,this.piecesOnBoard);
              }
            }
          }

          this.currentClicked.object.material.color.setHex(0xffffff);
          this.currentClicked.type = "none";
          this.currentClicked.object = null;
        } else {
          if (indeX >= 0 && indeX <= 6 && indeZ >= 0 && indeZ <= 6) {
            this.piecesOnBoard[indeX][indeZ] = 0;
          }
          clickedItem.material.color.setHex(0x757575);
          this.currentClicked.type = "piece";
          this.currentClicked.object = clickedItem;
        }
      }
      if (clickedItem.material.shininess == 40) {
        if (this.currentClicked.type == "piece") {
          let indeX = (clickedItem.position.x + 48) / 16;
          let indeZ = 6 - (clickedItem.position.z + 48) / 16;
          if (this.piecesOnBoard[indeX][indeZ] == 0) {
            if(this.piecesOnBoard[indeX+1][indeZ]>0||this.piecesOnBoard[indeX][indeZ+1]>0||this.piecesOnBoard[indeX-1][indeZ]>0||this.piecesOnBoard[indeX][indeZ-1]>0){
              this.currentClicked.object.position.set(clickedItem.position.x, 5, clickedItem.position.z);
              this.piecesOnBoard[indeX][indeZ] = this.currentClicked.object.userData.colorValue;
              this.currentClicked.object.material.color.setHex(0xffffff);
              this.currentClicked.type = "board";
              this.currentClicked.object = clickedItem;
              this.move += 1;
              console.log("ruch nr."+this.move,this.piecesOnBoard);
            }
          }
        }
      }
    }
  };
  //zmien kolej ruchu przy zmianie pozycji pionkow


  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
    //console.log("render leci, taborecik");
    TWEEN.update(); //--------- animacja
  };


}


window.addEventListener("mousedown", (e) => {
  game.clickOnSth(e);
});