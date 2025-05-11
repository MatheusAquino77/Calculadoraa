class Calculadora { 
    constructor(resultador, calcOpera) { 
        this.resultador = resultador;  // Display de resultado
        this.calcOpera = calcOpera;   // Display da operação
        this.valorAtual = '';
        this.valorAnterior = ''; 
        this.operacao = undefined; 
        this.finalizado = false; 
    }

     // Adiciona um número ao valor atual
    adicionarNumero(numero) {
        if (numero === '.' && this.valorAtual.includes('.')) return;

        if (this.finalizado) {  
            this.limpar();  
            this.finalizado = false; 
        }
        if (numero === '.' && (this.valorAtual === '' || this.valorAtual === '0')) {
            this.valorAtual = '0.';
            
        } else {
            this.valorAtual += numero;
        }

        this.atualizarDisplay(); 
    }

    // Define a operação matemática selecionada
    escolherOperacao(operacao) {
        if (this.valorAtual === '') return;  
        if (this.finalizado) { 
            this.finalizado = false 
        }else if (this.valorAnterior !== '') { 
            this.calcular(); 
        }
        if (this.valorAtual === '0.'){
            this.valorAtual = '0';
            this.atualizarDisplay();
        }
        
        this.operacao = operacao; 
        this.valorAnterior = this.valorAtual; 
        this.valorAtual = ''; 
        this.atualizarDisplay2(); 
    }

    // Realiza o cálculo com base na operação selecionada
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
        console.log(resultado);
        
    }

    // Limpa todos os valores da calculadora
    limpar() { 
        this.valorAtual = ''; 
        this.valorAnterior = ''; 
        this.operacao = undefined; 
        this.atualizarDisplay(); 
        this.atualizarDisplay2() 
    }

    // Remove o último dígito do valor atual
    apagarumnumero(){ 
        if(this.finalizado){
            this.limpar();
            this.finalizado = false;
        }else{
            this.valorAtual = this.valorAtual.slice(0,-1);
            this.atualizarDisplay();
            this.atualizarDisplay2()
        }
    
    }
    
    // Atualiza o display do resultado
    atualizarDisplay() { 
        this.resultador.textContent = this.valorAtual || '0'; 
    }
    // Atualiza o display da operação
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
console.log(btnNumero);

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