class Game {

    constructor(teclado, palavra, forca) {
        String.prototype.replaceAt=function(index, replacement) {
            return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
        }

        this.teclado = document.getElementById('teclado');
        this.palavra = document.getElementById('palavra');
        this.forca = document.querySelector('#forca img');
        this.vidas = document.getElementById('vida');

        this.state = {
            palavra: '',
            palavraDescobrindo: '',
            vidas: 7
        }
    }

    init() {
        this.state.palavra = this.escolherPalavra();
        this.state.palavraDescobrindo = this.esconder(this.state.palavra);
        this.state.vidas = 7;

        this.printarVidas();
        this.printarTeclado();
        this.printarPalavra();
        this.printarForca();
    }

    escolherPalavra() {
        let palavra = '';
        while(!palavra) {
           palavra = prompt('Escolha a palavra');
        }
        return palavra.toUpperCase();
    }

    esconder() {
        const palavra = this.state.palavra;

        let palavraEscondida = ''
        for (let i = 0; i < palavra.length; i++) {
            palavraEscondida += palavra[i] === ' ' ? ' ' : palavra[i] === '-' ? '-' :  '_';
        }
        return palavraEscondida;
    }

    printarVidas() {
        this.vidas.innerText = this.state.vidas;
    }

    printarForca() {
        let erros = 7 - this.state.vidas;
        this.forca.src = `forca-${erros}.png`;
    }

    printarPalavra() {
        let palavraOutput = '';
        const palavraDescobrindo = this.state.palavraDescobrindo;

        for (let i = 0; i < palavraDescobrindo.length; i++) {
            palavraOutput += `<div class="letra">${palavraDescobrindo[i]}</div>`
        }

        this.palavra.innerHTML = palavraOutput;
    }

    printarTeclado() {
        this.teclado.innerHTML = '';
        for (let i = 0; i < 26; i++) {
            let letra = String.fromCharCode(65 + i)
            let tecla = document.createElement('button');

            tecla.addEventListener('click', this.handleChute.bind(this));
            tecla.classList.add('tecla');
            tecla.innerText = letra;

            this.teclado.appendChild(tecla);
        }
    }

    handleChute(event) {
        const palavra = this.state.palavra;
        const tecla = event.target;
        const letra = tecla.innerText;
        let acertou = false;

        tecla.disabled = 'disabled';
        for (let i = 0; i < palavra.length; i++) {
            if (palavra[i] == letra) {
                this.state.palavraDescobrindo = this.state.palavraDescobrindo.replaceAt(i, letra);
                acertou = true;
            }
        }
        this.printarPalavra();

        if (acertou) {
            tecla.classList.add('acertou');
        } else {
            tecla.classList.add('errou');
            this.state.vidas--;
            this.printarVidas();
            this.printarForca();
        }
        
        if (this.state.vidas <= 0) {
            this.perdeu();
        } else if (this.state.palavraDescobrindo === palavra) {
            this.ganhou();
        }
    }

    ganhou() {
        setTimeout(() => {
            alert('Ganhou!');
            this.init();
        }, 100);
    }

    perdeu() {
        setTimeout(() => {
            alert('Perdeu!');
            this.init();
        }, 100);
    }
}