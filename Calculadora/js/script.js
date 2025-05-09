class Calculadora {
    constructor(resultador, calcOpera) {
        this.resultador = resultador;
        this.calcOpera = calcOpera;
        this.valorAtual = '';
        this.valorAnterior = '';
        this.operacao = undefined;
        this.finalizado = false;
    }

    adicionarNumero(numero) {
        if (this.finalizado) {
            this.limpar(); 
            this.finalizado = false;
        }
        this.valorAtual += numero;
        this.atualizarDisplay();
    }

    escolherOperacao(operacao) {
        if (this.valorAtual === '') return;
        if (this.valorAnterior !== '') {
            this.calcular();
        }
        this.operacao = operacao;
        this.valorAnterior = this.valorAtual;
        this.valorAtual = '';
        this.atualizarDisplay2();
    }

    calcular() {
        let resultado;
        const anterior = parseFloat(this.valorAnterior);
        const atual = parseFloat(this.valorAtual);
        if (isNaN(anterior) || isNaN(atual)) return;

        const valorAnteriorTemp = this.valorAnterior;
        const valorAtualTemp = this.valorAtual;
        const operacaoTemp = this.operacao;

       
        switch (this.operacao) {
            case '+':
                resultado = anterior + atual;
            
                break;
            case '-':
                resultado = anterior - atual;
                
                break;
            case '*':
                resultado = anterior * atual;
                
                break;
            case '/':
                resultado = anterior / atual;
                break;
            default:
                return;
        }
        this.valorAtual = resultado.toString();
        this.calcOpera.textContent = `${valorAnteriorTemp} ${operacaoTemp} ${valorAtualTemp} =`;
        this.operacao = undefined;
        this.valorAnterior = '';
        this.atualizarDisplay();
        this.finalizado = true; 
        
    }

    limpar() {
        this.valorAtual = '';
        this.valorAnterior = '';
        this.operacao = undefined;
        this.atualizarDisplay();
        this.atualizarDisplay2()
    }

    apagarumnumero(){
        this.valorAtual = this.valorAtual.slice(0,-1); 
        this.atualizarDisplay();
        this.atualizarDisplay2()

    }
    

    atualizarDisplay() {
        this.resultador.textContent = this.valorAtual || '0';
    }

    atualizarDisplay2(){
        this.calcOpera.textContent = `${this.valorAnterior} ${this.operacao || ''}`;
        
    }
}

const calcOpera = document.querySelector('.calcOpera');
const resultado = document.getElementById('resultado');
const btnNumero = document.querySelectorAll('.numeros');
const btnOperadores = document.querySelectorAll('.botao-calculo');
const btnIgual = document.getElementById('btnIgual');
const btnLimpar = document.getElementById('btnLimpar');
const btnApagar = document.getElementById('btnApagar');



const calculadora = new Calculadora(resultado, calcOpera);


btnNumero.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.adicionarNumero(botao.dataset.num);
    });
});


btnOperadores.forEach(botao => {
    if (botao !== btnIgual) {
        botao.addEventListener('click', () => {
            calculadora.escolherOperacao(botao.dataset.op);
            calculadora.atualizarDisplay2();
        });
    }
    
});


btnIgual.addEventListener('click', () => {
    calculadora.calcular();
    
});

btnLimpar.addEventListener('click', () => {
    calculadora.limpar();
});
btnApagar.addEventListener('click', () => {
    calculadora.apagarumnumero();
});