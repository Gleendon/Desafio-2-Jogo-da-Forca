//let bancoPalavras= ["CASA", "VERDE", "AZUL", "PAPEL", "AMOR", "VIDA", "PEDRA", "MESA", "VIAJAR", "BRANCO"]
let letraAcionada = 0


//adicionar palavras
function cancelar(){
    location.reload();
}

function salvarPalavra(){    
    var palavra = document.querySelector("#novaPalavra").value
    var palavraUpperCase = palavra.toUpperCase()

    if(palavra.length == 0 || palavra.length > 8){
        alert("[ERRO]! Verificar palavra adicionada!")
    }else{
        bancoPalavras.push(palavraUpperCase)
        console.log(bancoPalavras)
        console.log(palavraUpperCase)
        
        iniciar()
    }
}

function adicionarPalavra(){
    var secao_inicial = document.querySelector(".secao-inicial")
    secao_inicial.classList.remove("secao-inicial")
    secao_inicial.classList.add("invisivel")

    var secao_adicionar = document.querySelector(".secao-invisivel")
    secao_adicionar.classList.remove("secao-invisivel")
    secao_adicionar.classList.add("secao-adicionar")
}

//Iniciar o jogo
function comecar(){

    desenharLinhas()

    var secao_inicial = document.querySelector(".secao-inicial")
    secao_inicial.classList.remove("secao-inicial")
    secao_inicial.classList.add("invisivel")

    var secao_adicionar = document.querySelector(".secao-jogar-invisivel")
    secao_adicionar.classList.remove("secao-jogar-invisivel")
    secao_adicionar.classList.add("secao-jogar")
}

function iniciar(){

    var secao_inicial = document.querySelector(".secao-adicionar")
    secao_inicial.classList.remove("secao-inicial")
    secao_inicial.classList.add("invisivel")

    var secao_adicionar = document.querySelector(".secao-jogar-invisivel")
    secao_adicionar.classList.remove("secao-jogar-invisivel")
    secao_adicionar.classList.add("secao-jogar")
}


//Sortear Palavra
function SortearPalavra(){
    let i = Math.round(Math.random() * 10)
    let palavraSorteada = bancoPalavras[i]
    console.log(palavraSorteada)
}


// testar as palavras
window.addEventListener("keydown", function (event) {
    letraAcionada = event.key    
    for(var i = 0; i < palavraSorteada.length; i++){        
        if(letraAcionada == palavraSorteada[i]){         
            console.log(letraAcionada)
            console.log("Na posição " + i)     
        }else{
            testador = true
        }
    }
})

//mostrar quantidades de letras
function desenharLinhas(){
    for(var i = 0; i < palavraSorteada.length; i++){
        var img = document.createElement("IMG");    
        img.src = "img/linha.png";
        img.style.paddingRight = "16px";
        document.querySelector('.secao-palavra-certa').appendChild(img)
    }
}

// desistir do jogo
function desistir(){
    
    location.reload();

}




