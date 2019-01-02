//Classe Calculator que implementa a calculadora e todas as suas funcionalidades

//Imports
import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Buttons'
import Display from '../components/Display'

// Estado inicial
const initialState = {
    displayValue : '0', // valor a ser exibido
    operation : null, // operador atual 
    clearDisplay : false, // necessário limpar o display?
    current: 0, // operando atual que está sendo trabalhado
    values: [0, 0], // vetor de operandos
}


export default class Calculator extends Component {

    //Construtor da classe que define o estado inicial e da bind no this para a execução das funções
    constructor (props) {
        super(props)
        this.state = {...initialState}
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory () { //função que retorna a calculadora ao estado inicial (AC)
       this.setState({...initialState})
    }

    setOperation (operation) { // Configuração da operação, recebe um operando como string
        if(this.state.current === 0) { 
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            try {
                if(!currentOperation.match(/[*/+-=]/) || currentOperation === operation) {
                    return // verificação de operando inválido ou repetido
                }
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) 
            } catch (e) {
                values[0] = this.state.values[0] // reseta o prmeiro oeprador em caso inválido
            }
            
            values[1] = 0 

            this.setState({
                displayValue: values[0].toFixed(4),
                operation : equals ? null : operation,
                current : equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
            
        }
       
    }

    addDigit(n) { // adiciona o digito na tela
        if (n === '.' && this.state.displayValue.includes('.')) {
            return // verificação de ponto repetido
        }
        

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay : false})

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue.toFixed(4)
            this.setState({ values })
            console.log(values)

        }
    }


    render () {
       
        return (
            <div className="calculator">
                    <Display value={this.state.displayValue} />
                    <Button label="AC"click={this.clearMemory} triple />
                    <Button label="/" click={this.setOperation} operation/>
                    <Button label="7" click={this.addDigit}/>
                    <Button label="8" click={this.addDigit}/>
                    <Button label="9" click={this.addDigit}/>
                    <Button label="*" click={this.setOperation} operation/>
                    <Button label="4" click={this.addDigit}/>
                    <Button label="5" click={this.addDigit}/>
                    <Button label="6" click={this.addDigit}/>
                    <Button label="-" click={this.setOperation} operation/>
                    <Button label="1" click={this.addDigit}/>
                    <Button label="2" click={this.addDigit}/>
                    <Button label="3" click={this.addDigit}/>
                    <Button label="+" click={this.setOperation} operation/>
                    <Button label="0" click={this.addDigit} double/>
                    <Button label="." click={this.addDigit}/>
                    <Button label="=" click={this.setOperation} operation/>

                
            </div>
        )
    }
}