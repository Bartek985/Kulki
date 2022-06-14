class Ui {
    constructor() {}

    hideLogin = () =>{
        document.getElementById('login').style.display = "none"
        document.getElementById('error-empty').style.display = "none"
        document.getElementById('error-many').style.display = "none"
        document.getElementById('error-repeat').style.display = "none"
        document.getElementById('waiting').style.display = "block"
    }

    showErrorEmpty = () =>{
        document.getElementById('error-empty').style.display = "block"
        document.getElementById('error-many').style.display = "none"
        document.getElementById('error-repeat').style.display = "none"
    }

    showErrorMany = () =>{
        document.getElementById('error-many').style.display = "block"
        document.getElementById('error-empty').style.display = "none"
        document.getElementById('error-repeat').style.display = "none"
    }

    showErrorRepeat = () =>{
        document.getElementById('error-repeat').style.display = "block"
        document.getElementById('error-empty').style.display = "none"
        document.getElementById('error-many').style.display = "none"
    }

    showStart = () =>{
        document.getElementById('waiting').style.display = "none"
        document.getElementById('start-info').style.display = "block"
        this.startingTimeout = setTimeout(this.hideStart, 5000)
    }

    hideStart = ()=>{
        document.getElementById('waiting').style.display = "none"
        document.getElementById('start-info').style.display = "none"
    }

    win = ()=>{
        document.getElementById('winner').style.display = "block"
    }

    lose = ()=>{
        document.getElementById('loser').style.display = "block"
    }
    
}
  