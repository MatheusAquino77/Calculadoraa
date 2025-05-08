class Calculadora {
    constructor(resultador) {
        this.resultador = resultador;
        this.valorAtual = '';
        this.valorAnterior = '';
        this.operacao = undefined;
    }

    adicionarNumero(numero) {
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
    }

    calcular() {
        let resultado;
        const anterior = parseFloat(this.valorAnterior);
        const atual = parseFloat(this.valorAtual);
        if (isNaN(anterior) || isNaN(atual)) return;

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
        this.operacao = undefined;
        this.valorAnterior = '';
        this.atualizarDisplay(); 
    }

    limpar() {
        this.valorAtual = '';
        this.valorAnterior = '';
        this.operacao = undefined;
        this.atualizarDisplay();
    }

    apagarumnumero(){
        this.valorAtual = this.valorAtual.slice(0,-1); 
        this.atualizarDisplay();

    }
    

    atualizarDisplay() {
        this.resultador.textContent = this.valorAtual || '0';
    }
}


const resultado = document.getElementById('resultado');
const btnNumero = document.querySelectorAll('.numeros');
const btnOperadores = document.querySelectorAll('.botao-calculo');
const btnIgual = document.getElementById('btnIgual');
const btnLimpar = document.getElementById('btnLimpar');
const btnApagar = document.getElementById('btnApagar');



const calculadora = new Calculadora(resultado);


btnNumero.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.adicionarNumero(botao.dataset.num);
    });
});


btnOperadores.forEach(botao => {
    if (botao !== btnIgual) {
        botao.addEventListener('click', () => {
            calculadora.escolherOperacao(botao.dataset.op);
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