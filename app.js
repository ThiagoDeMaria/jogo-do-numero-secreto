let numeroMaximo = 10;
let listaNumeroSorteado = [];
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();

// Monta os Textos Padroes
function exibeTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

//Exibe os Textos ao iniciar
function exibirMensagemInicial(){
    exibeTexto('h1','Número secreto');
    exibeTexto('p',`Escolha um número entre 1 e ${numeroMaximo}`);
}
exibirMensagemInicial();

// Valida o chute
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    //Acertou
    if(chute == numeroSecreto){
        exibeTexto('h1','Acertou!!');
        
        let palavraTentativas = tentativas > 1 ? 'tentativas':'tentativa';
        let mensagemTentativas = `Você acertou o numero secreto ${numeroSecreto} com ${tentativas} ${palavraTentativas}`;

        exibeTexto('p',mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
        
        // Errou   
    }else{
        if(chute > numeroSecreto){
            exibeTexto('p',`O número secreto é menor.`);
        }else{
            exibeTexto('p',`O número secreto é maior.`);
        }
        tentativas++;
        limparCampo();
    }
}

//Gera o Numero 'Aleatoriamente'
function gerarNumeroAleatorio(){
    let numeroEscolhido =  parseInt(Math.random() * numeroMaximo +1);
    let qtdElementosLista = listaNumeroSorteado.length;

    if(qtdElementosLista == numeroMaximo){
        listaNumeroSorteado = [];
    }
    if(listaNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumeroSorteado.push(numeroEscolhido);
        console.log(listaNumeroSorteado);
        return numeroEscolhido;
    }
}

//Limpa o input a cada chute
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

//reseta o Jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true)
}