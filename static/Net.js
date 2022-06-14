class Net {
    constructor() { }
  
    handleLogIn = () =>{
        const body = JSON.stringify({ user: document.getElementById("login-name").value }); // body czyli przesyłane na serwer dane
        fetch("/LOG_IN", { method: "post", body }) // fetch
          .then((response) => response.json())
          .then(
            (data) => {
              console.log(data);
            } // dane odpowiedzi z serwera
         );
         }
}
  