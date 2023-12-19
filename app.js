let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

console.log("O número secreto é " + numeroSecreto);
mensagemDaTelaInicial()

// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do número secreto";

// let paragrafo = document.querySelector ("p");
// paragrafo.innerHTML = "Escolha um número entre 1 e 10";

// Toda essas quatro linhas anteriores podem ser substituidas por uma função para exibir textos em determinados campos;
function exibirTextoNaTela(tag,mensagem) {
    let campo = document.querySelector(tag);
    campo.innerHTML = mensagem;
    responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', {rate:1.2});
}

// Chamando a função de mensagem inicial;
function mensagemDaTelaInicial(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10:");
}

// Função para verificar o chute do usuário;
function verificarChute(){    
    let chute = document.querySelector("input").value;
    // console.log(chute == numeroSecreto); Para retornar true ou false;
    console.log("O botão foi clicado");
    if (chute == numeroSecreto){
        exibirTextoNaTela("h1", "Acertou");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Parabéns você acertou o número secreto com ${tentativas} ${palavraTentativa}!`; // Usei o ${...} na variável para não ter que adicionar um espaço na string para separar os itens;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela("p", "O número secreto é menor que " + chute);
        } else {
            exibirTextoNaTela("p", "O número secreto é maior que " + chute);
        }
        tentativas++;
        limparCampo()
    }
}

// Função para limpar o campo após clicar em "Novo Jogo";
function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

// Função para gerar um número aleatório;
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Função para reiniciar o jogo;
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemDaTelaInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}