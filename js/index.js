//Variáveis
let letrasTeclado =['A', 'B', 'Ç','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z']
let bancoPalavras= ["CASA", "VERDE", "VIAJAR", "PRATOS", "AMOR", "MONTANHA", "PEDRA", "MULHER", "VIAJAR", "BRANCO", "LOUCO", "LARANJA", "MACACO", "NARIZ", "PRAIA", "AREIA", "FLORES"]
var boneco = document.querySelector(".telaJogar__conteudo___forca--imagem")
let testeTelaJogar = false
let testeAcertou = false

let palavraSorteada = ""
let letrasCerta = []
let letrasErrada = []
let vida = 7
let erro = 1

//Botão cancelar adicionar palavra
function cancelar(){
    location.reload();
}

//Desistir do jogo
function desistir(){
    location.reload();
}

//Salvar palavra no BD
function salvarPalavra(){    
    var palavra = document.querySelector("#novaPalavra").value
    var palavraUpperCase = palavra.toUpperCase()

    if(palavra.length == 0 || palavra.length > 8){
        alert("[ERRO]! Verificar palavra adicionada!")
    }else{
        bancoPalavras.push(palavraUpperCase)   
        iniciar()
    }
}

//Sortera palavra do BD
function SortearPalavra(){
    let i = Math.round(Math.random() * (bancoPalavras.length-1))
    return i
}

//Mostrar quantidades de letras
function desenharLinhas(){
    palavraSorteada = bancoPalavras[SortearPalavra()]
    for(var i = 0; i < palavraSorteada.length; i++){
        var qtdLetra = document.createElement("span");
        qtdLetra.classList.add("telaJogar__conteudo___letraCerta")
        qtdLetra.setAttribute("id", "letra" + i)
        document.querySelector(".telaJogar__conteudo___palavraCerta").appendChild(qtdLetra)
    }
}

//Remover linhas
function removerLinhas(){    
    for(var i = 0; i < palavraSorteada.length; i++){
        var qtdLetra = document.querySelector(`#letra${i}`);
        qtdLetra.remove()
    }

    console.log(letrasErrada.length)

    if(letrasErrada.length > 0){
        for(var i = 0; i < letrasErrada.length; i++){
            var letraErr = document.querySelector(`#letraErr`);
            letraErr.remove()
        }
    }
}

//Desenhar Boneco
function desenharBoneco(erro){    
    boneco.setAttribute("src", "img/boneco/boneco" + erro +".png")

    if(vida == erro){
        setInterval(alert("Você Perdeu!! A Palavra é " + palavraSorteada), 10000)
    }
}

//Identificar letra acionada
window.addEventListener("keydown", function (event) {
    let letraAcionada = event.key.toUpperCase()

    if(testeAcertou){
        console.log("Você ganhou!")
    }else{
        if(testeTelaJogar && erro < 7){
            if(letrasErrada.includes(letraAcionada) || letrasCerta.includes(letraAcionada)){
                this.alert("Palavra já utilizada!")
            }else if(palavraSorteada.includes(letraAcionada) && letrasTeclado.includes(letraAcionada)){         
                addLetraCerta(letraAcionada) 
                acertouPalavra()     
            }else if(letrasTeclado.includes(letraAcionada)){
                letrasErrada.push(letraAcionada)
                erro++  
                if(erro < vida){
                    addLetraErrada(letraAcionada);
                    desenharBoneco(erro)
                }else if (erro == vida){
                    addLetraErrada(letraAcionada)
                    desenharBoneco(7)            
                }       
            }
        }else if(!testeTelaJogar){
            console.log("Você não está na tela de jogo!")
        }else if(erro == 7){
            console.log("Você perdeu!")
        }
    }
})

//Verificar se o jogador acertou a palavra
function acertouPalavra(){
    
    if(letrasCerta.length > 0 && letrasCerta.length == palavraSorteada.length){
        alert("Parabéns! Você acertou a palavra")
        testeAcertou = true
    }
}

//Armazenar letras corretas 
function addLetraCerta(letraAcionada){
    for(var i = 0; i < palavraSorteada.length; i++){        
        if(letraAcionada == palavraSorteada[i]){  
            letrasCerta.push(letraAcionada)       
            let span = document.getElementById(`letra${i}`)
            span.innerHTML = letraAcionada       
        }
    }
}

//Armazenar Letras erradas
function addLetraErrada(letraAcionada){
    let letraErrada = document.createElement("span");
    letraErrada.setAttribute("id", "letraErr")
    document.querySelector('.telaJogar__conteudo___palavraErrada').appendChild(letraErrada)
    letraErrada.innerHTML = letraAcionada
}

//Navegação pela página
function novoJogo(){
    erro = 1
    desenharBoneco(erro)
    removerLinhas()
    desenharLinhas()
    testeAcertou = false
    letrasCerta.splice(0,letrasCerta.length)
    letrasErrada.splice(0, letrasErrada.length) 
}

function adicionarPalavra(){
    var secao_inicial = document.querySelector(".telaInicial")
    secao_inicial.classList.remove("telaInicial")
    secao_inicial.classList.add("telaInicial--invisivel")

    var secao_adicionar = document.querySelector(".telaAdicionarPalavra--invisivel")
    secao_adicionar.classList.remove("telaAdicionarPalavra--invisivel")
    secao_adicionar.classList.add("telaAdicionarPalavra")
}
function comecar(){
    testeTelaJogar = true

    var secao_inicial = document.querySelector(".telaInicial")
    secao_inicial.classList.remove("telaInicial")
    secao_inicial.classList.add("telaInicial--invisivel")

    var secao_adicionar = document.querySelector(".telaJogar--invisivel")
    secao_adicionar.classList.remove("telaJogar--invisivel")
    secao_adicionar.classList.add("telaJogar")

    desenharLinhas()
}

function iniciar(){
    testeTelaJogar = true
    
    var secao_inicial = document.querySelector(".telaAdicionarPalavra")
    secao_inicial.classList.remove("telaAdicionarPalavra")
    secao_inicial.classList.add("telaAdicionarPalavra--invisivel")

    var secao_adicionar = document.querySelector(".telaJogar--invisivel")
    secao_adicionar.classList.remove("telaJogar--invisivel")
    secao_adicionar.classList.add("telaJogar")

    desenharLinhas()
}