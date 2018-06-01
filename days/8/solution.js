"use strict";

const exampleInput = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`

const parseInstructionString = (str) => {
    const [register, operation, amount, ifWord, conditionRegister, conditionOperator, number] = str.split(' ')

    return {
        register,
        operation,
        amount: parseInt(amount),
        conditionRegister,
        conditionOperator,
        number: parseInt(number)
    }
}

const registers = {}

const conditionOperators = {
    '>': (a, b) => a > b,
    '>=': (a, b) => a >= b,
    '<': (a, b) => a < b,
    '<=': (a, b) => a <= b,
    '==': (a, b) => a === b,
    '!=': (a, b) => a !== b
}

const interpret = ({register, operation, amount, conditionRegister, conditionOperator, number}) => {
    //console.log(registers[conditionRegister], registers)

    if (conditionOperators[conditionOperator](registers[conditionRegister] || 0, number)) {
        if (typeof registers[register] === 'undefined') {
            registers[register] = 0
        }

        //if (operation === 'dec') {
        //    registers[register] -= amount
        //} else {
        //    registers[register] += amount
        //}
        registers[register] += operation === 'dec' ? -amount : amount

        //console.log(registers[register], registers)
    }
}

const getLargestRegisterValue = (input) => {
    const instructions = input.split('\n')

    instructions.map(instruction => parseInstructionString(instruction))
        .forEach(parsedInstruction => interpret(parsedInstruction))

    return Object.keys(registers)
        .map(register => [register, registers[register]])
        .sort((a, b) => b[1] - a[1])[0][1]
}

console.log(getLargestRegisterValue(exampleInput))
