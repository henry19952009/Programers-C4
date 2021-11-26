alert("este es un mensaje emergente lanzado con JavaScript")

let colores = ["red", "blue", "white", "purple", "yellow", "orange"]

function CambiarColor(){
    let indice = Math.floor(Math.random() * colores.length);
    let color = colores[indice];
    console.log(color);
    document.querySelector("body").style.background = color;
    let texto = document.querySelector("#textoInput").value;
    document.querySelector("#miDiv").innerHTML = texto;
}

//funcion que se ejecuta una sola vez a los 4 segundos
setTimeout(() => {
   CambiarColor() 
}, 4000);
//funcion que se ejecuta continuamente cada 2 segundos
setInterval(() => {
    CambiarColor()
}, 2000);