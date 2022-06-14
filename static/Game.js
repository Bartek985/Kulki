class Game {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
    this.camera.position.set(240, 240, 0);
    //this.camera.position.set(1, 145, 0);
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
    // this.cards = {
    //   color: ["blue", "green", "orange", "red"],
    //   number: ["1", "2", "3", "4"],
    //   fileType: ".jpg"
    // };
    this.randomCardPlayer1 = ""
    this.cardsInterval = null
    // this.randomCardPlayer1 = this.cards.color[Math.floor(Math.random() * 4)] + this.cards.number[Math.floor(Math.random() * 4)] + this.cards.fileType;
    /*this.randomCardPlayer2 = this.cards.color[Math.floor(Math.random() * (12 - 8))] + this.cards.number[Math.floor(Math.random() * (29 - 25))] + this.cards.fileType;
    while (this.randomCardPlayer2 == this.randomCardPlayer1) {
      this.randomCardPlayer2 = this.cards.color[Math.floor(Math.random() * 4)] + this.cards.number[Math.floor(Math.random() * 4)] + this.cards.fileType;
    }*/
    // console.log(this.randomCardPlayer1, /*this.randomCardPlayer2*/);

    this.currentClicked = { type: "none", object: null };
    this.move = 0;
    this.bug = false;
    this.bugIndeX = null;
    this.bugIndeZ = null;
    this.buggedColor = null;
    this.started = false;
    this.onBoard = []
    this.start = false


    //this.player1turn = true;

    document.getElementById("root").append(this.renderer.domElement);

    this.render();
    this.generateBoard();
    this.createPieces()
  }

  generateBoard = () => {
    console.log("generate board");

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        let tile = new BoardTile();
        let cube = tile.createGeometry();
        cube.position.set(-48 + i * 16, 0, -48 + j * 16);
        //this.scene.remove(cube);
        this.scene.add(cube);
      }
    }
    const light1 = new THREE.HemisphereLight(0xffffff, 10); //SpotLight HemisphereLight
    light1.position.set(0, 56, 0);
    light1.target = this.scene;
    light1.intensity = 0.9;
    this.scene.add(light1);

    let BlackSphere = new Piece(6);
    let black = BlackSphere.createGeometry();
    black.userData = { colorValue: 6 };
    black.position.set(0, 5, 0);
    this.scene.add(black);

    let cards = new CardStack("cardTop.jpg", 10);
    this.cards_ = cards.createGeometry();
    this.cards_.position.set(0, 5, -104);
    this.scene.add(this.cards_);


    let table = new Table();
    let table_ = table.createGeometry();
    table_.position.set(0, 0, 0);
    this.scene.add(table_);

  };

  shuffleCards = (card) =>{
    this.myCard = card
    this.randomCardPlayer1 = `${card}.jpg`
    let yourCard = new CardStack("../cards/" + this.randomCardPlayer1, 1);
    let yourCard_ = yourCard.createGeometry();
    yourCard_.position.set(0, 0, -104);
    this.scene.add(yourCard_);

    let rivalCard = new CardStack("cardTop.jpg", 1);
    let rivalCard_ = rivalCard.createGeometry();
    rivalCard_.position.set(0, 0, -104);
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
        })
        .start();

      new TWEEN.Tween(rivalCard_.position)
        .to({ x: -80 }, 2700)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(() => { })
        .onComplete(() => { })
        .start();
      new TWEEN.Tween(this.cards_.position)
        .to({ y: 2 }, 900)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(() => { })
        .onComplete(() => { })
        .start();
    }, 100);

  }

  createPieces = () => {
    console.log("create pieces");

    for (let i = 0; i < this.pieces.length; i++) {
      for (let j = 0; j < this.pieces[i].length; j++) {
        let piece = new Piece(this.pieces[i][j]);
        //piece.userData = { colorValue: this.pieces[i][j] };
        let cube = piece.createGeometry();
        cube.userData = { colorValue: this.pieces[i][j] };
        if (cube != null) {
          cube.position.set(-48 + i * 16 + 16, 1, -48 + j * 16 + 136);
          this.scene.add(cube);
        }
      }
    }
    /*if (ui.clientID == 2) {
      this.camera.position.set(-220, 220, 0); //zmien pozycje swiatla
      this.camera.lookAt(this.scene.position);
    }*/
  };


  clickOnSth = (e) => {
    console.log(this.start, this.move)
    if(this.started && ((this.start && this.move%2 == 0) || (!this.start && this.move%2 == 1))){
      
    if (this.bug) {
      this.piecesOnBoard[this.bugIndeX][this.bugIndeZ] = this.buggedColor;
      this.bug = false;
    }

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();
    mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseVector, this.camera);
    const intersects = raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      let clickedItem = intersects[0].object;
      if (clickedItem.material.shininess == 50) {
        let indeX = (clickedItem.position.x + 48) / 16;
        let indeZ = 6 - (clickedItem.position.z + 48) / 16;

        if (this.currentClicked.type == "piece") {
          let indeX2 = (this.currentClicked.object.position.x + 48) / 16;
          let indeZ2 = 6 - (this.currentClicked.object.position.z + 48) / 16;
          console.log(indeX, indeX2, indeZ, indeZ2);
          if (indeX >= 0 && indeX2 >= 0 && indeZ >= 0 && indeZ2 >= 0 && indeX <= 6 && indeX2 <= 6 && indeZ <= 6 && indeZ2 <= 6) {
            if (indeX != indeX2 || indeZ != indeZ2) {
              if ((Math.abs(indeX - indeX2) == 1 && Math.abs(indeZ - indeZ2) == 0) || (Math.abs(indeZ - indeZ2) == 1 && Math.abs(indeX - indeX2) == 0)) {
                console.log("mozna zamienic");
                this.currentClicked.object.position.set(indeX * 16 - 48, 5, (6 - indeZ) * 16 - 48);
                this.onBoard.push(this.currentClicked.object)
                this.piecesOnBoard[indeX][indeZ] = this.currentClicked.object.userData.colorValue;
                clickedItem.position.set(indeX2 * 16 - 48, 5, (6 - indeZ2) * 16 - 48);
                this.piecesOnBoard[indeX2][indeZ2] = clickedItem.userData.colorValue;
                this.move += 1;//zniana, kolej drugiego gracza
                console.log("ruch nr." + this.move, this.piecesOnBoard);
                socket.emit('moveWasMade', this.piecesOnBoard, this.move, this.myCard);
              }
              else{
                console.log("bug handled");
                this.bug = true;
                this.bugIndeX = indeX2;
                this.bugIndeZ = indeZ2;
                this.buggedColor = this.currentClicked.object.userData.colorValue;
              }
            }
          }
          this.currentClicked.object.material.color.setHex(0xffffff);
          new TWEEN.Tween(this.camera.position) // co
            .to({ x: 240, y: 240 }, 750) // do jakiej pozycji, w jakim czasie
            .easing(TWEEN.Easing.Sinusoidal.Out) // typ easingu (zmiana w czasie)
            .onUpdate(() => {
              this.camera.lookAt(this.scene.position);
            })
            .onComplete(() => {
            })
            .start();
          if (this.currentClicked.object == clickedItem) {
            console.log("Never gonna give you up");
            this.bug = true;
            this.bugIndeX = indeX;
            this.bugIndeZ = indeZ;
            this.buggedColor = clickedItem.userData.colorValue;
          }
          this.currentClicked.type = "none";
          this.currentClicked.object = null;
        } else {
          if (indeX >= 0 && indeX <= 6 && indeZ >= 0 && indeZ <= 6) {
            this.piecesOnBoard[indeX][indeZ] = 0;
          }
          clickedItem.material.color.setHex(0x808080);
          this.currentClicked.type = "piece";
          this.currentClicked.object = clickedItem;
          //this.camera.position.set(1, 145, 0);
          new TWEEN.Tween(this.camera.position) // co
            .to({ x: 1, y: 145 }, 750) // do jakiej pozycji, w jakim czasie
            .easing(TWEEN.Easing.Sinusoidal.Out) // typ easingu (zmiana w czasie)
            .onUpdate(() => {
              this.camera.lookAt(this.scene.position);
            })
            .onComplete(() => {
            })
            .start();
        }
      }
      if (clickedItem.material.shininess == 40) {
        if (this.currentClicked.type == "piece") {
          let indeX = (clickedItem.position.x + 48) / 16;
          let indeZ = 6 - (clickedItem.position.z + 48) / 16;
          if (this.piecesOnBoard[indeX][indeZ] == 0) {
            if (indeX > 0 && indeX < 6 && indeZ > 0 && indeZ < 6 && (this.piecesOnBoard[indeX + 1][indeZ] > 0 || this.piecesOnBoard[indeX][indeZ + 1] > 0 || this.piecesOnBoard[indeX - 1][indeZ] > 0 || this.piecesOnBoard[indeX][indeZ - 1] > 0) && (this.currentClicked.object.position.x != clickedItem.position.x || this.currentClicked.object.position.z != clickedItem.position.z)) {
              new TWEEN.Tween(this.camera.position) // co
                .to({ x: 240, y: 240 }, 750) // do jakiej pozycji, w jakim czasie
                .easing(TWEEN.Easing.Sinusoidal.Out) // typ easingu (zmiana w czasie)
                .onUpdate(() => {
                  this.camera.lookAt(this.scene.position);
                })
                .onComplete(() => {
                })
                .start();
              this.currentClicked.object.position.set(clickedItem.position.x, 5, clickedItem.position.z);
              this.onBoard.push(this.currentClicked.object)
              this.piecesOnBoard[indeX][indeZ] = this.currentClicked.object.userData.colorValue;
              this.currentClicked.object.material.color.setHex(0xffffff);
              this.currentClicked.type = "board";
              this.currentClicked.object = clickedItem;
              this.move += 1;//zniana, kolej drugiego gracza
              console.log("ruch nr." + this.move, this.piecesOnBoard);
              socket.emit('moveWasMade', this.piecesOnBoard, this.move, this.myCard);
            } if ((indeX == 0 && this.piecesOnBoard[indeX + 1][indeZ] > 0) || (indeX == 6 && this.piecesOnBoard[indeX - 1][indeZ] > 0) || (indeZ == 0 && this.piecesOnBoard[indeX][indeZ + 1] > 0) || (indeZ == 6 && this.piecesOnBoard[indeX][indeZ - 1] > 0) && (this.currentClicked.object.position.x != clickedItem.position.x || this.currentClicked.object.position.z != clickedItem.position.z)) {
              new TWEEN.Tween(this.camera.position) // co
                .to({ x: 240, y: 240 }, 750) // do jakiej pozycji, w jakim czasie
                .easing(TWEEN.Easing.Sinusoidal.Out) // typ easingu (zmiana w czasie)
                .onUpdate(() => {
                  this.camera.lookAt(this.scene.position);
                })
                .onComplete(() => {
                })
                .start();
              this.currentClicked.object.position.set(clickedItem.position.x, 5, clickedItem.position.z);
              this.onBoard.push(this.currentClicked.object)
              this.piecesOnBoard[indeX][indeZ] = this.currentClicked.object.userData.colorValue;
              this.currentClicked.object.material.color.setHex(0xffffff);
              this.currentClicked.type = "board";
              this.currentClicked.object = clickedItem;
              this.move += 1;//zniana, kolej drugiego gracza
              console.log("ruch nr." + this.move, this.piecesOnBoard);
              socket.emit('moveWasMade', this.piecesOnBoard, this.move, this.myCard);
            }
          }
        }
      }
    }
      
    }
  };
  //zmien kolej ruchu przy zmianie pozycji pionkow

  resize = () =>{
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
    //console.log("render leci, taborecik");
    TWEEN.update(); //--------- animacja
  };
  editGame = () =>{
    this.started = !this.started
  }

  regenerate = (tab, move)=>{
    this.onBoard.forEach((elem)=>{
      this.scene.remove(elem)
    })

    this.piecesOnBoard = tab

    
    for (let i = 0; i < this.piecesOnBoard.length; i++) {
      for (let j = 0; j < this.piecesOnBoard[i].length; j++) {
        if(this.piecesOnBoard[i][j]!=0){
          console.log(this.piecesOnBoard[i][j])
          let piece = new Piece(this.piecesOnBoard[i][j]);
          let cube = piece.createGeometry();
          cube.userData = { colorValue: this.piecesOnBoard[i][j] };
          if (cube != null) {
            cube.position.set(-48 + i * 16, 5, -48 + (6-j) * 16);
            this.scene.add(cube);
          }

        }
      }
    }

    console.log(move)
    if(this.move != move){
      this.move++
    }

  }

  setStarter = (start) =>{
    this.start = start
  }

  decide = (winner) =>{
    if(winner == this.myCard){
      ui.win()
    }
    else{
      ui.lose()
    }
  }
  
}
