class Net {
    constructor() { }
  
    handleLogIn = () =>{
        const body = JSON.stringify({ user: document.getElementById("login-name").value }); // body czyli przesyłane na serwer dane
        fetch("/LOG_IN", { method: "post", body }) // fetch
          .then((response) => response.json())
          .then(
            (data) => {
              console.log(data.error);
              if(data.error == "none"){
                ui.hideLogin()
                game.shuffleCards(data.card)
              }
              else if(data.error == "many"){
                ui.showErrorMany()
              }
              else if(data.error == "repeat"){
                ui.showErrorRepeat()
              }
              else if(data.error == "empty"){
                ui.showErrorEmpty()
              }
            } // dane odpowiedzi z serwera
         );
    }

    handleReset = () => {
      const body = JSON.stringify({ reset: true }); // body czyli przesyłane na serwer dane
      fetch("/RESET", { method: "post", body }) // fetch
    }
}
  