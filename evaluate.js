#!/usr/bin/env node

// This program (evaluate function) evaluates a mathematical expression in form of an string with the following considerations:
// - parentheses will always be closed properly
// - you will never be asked to divide by 0
// - operators will always be preceded and followed by numbers

function evaluate(expression) {
  const outputs = [] // stack of numbers and outputs
  const operators = [] // stack of operators

  const solveTopOfStacks = () => outputs.push(operate(operators.pop(), outputs.pop(), outputs.pop()))
  for (const char of expression) {
    switch (char) {
      case ' ': continue
      case '*':
      case '/':
      case '+':
      case '-':
        // while if operator on top of stack has higher or same precedence over the current operator
        while (operators.length && hasHigherOrSamePrecedence(operators[operators.length - 1], char)) {
          solveTopOfStacks()
        }
      case '(':
        operators.push(char)
        break
      case ')':
        // calculate the whole sub-expression up to the starting parantheses
        while (operators[operators.length - 1] != '(') {
          solveTopOfStacks()
        }
        operators.pop()
        break
      default: // for all single digit numbers
        outputs.push(+char)
    }
  }

  // calculate the whole remainings of the expression
  while (operators.length > 0) {
    solveTopOfStacks()
  }

  // we should only have a single number remaining on outputs
  return outputs[0]
}

const operatorPrecedences = { '( ': 0, ')': 0, '*': 2, '/': 2, '+': 1, '-': 1 }
const hasHigherOrSamePrecedence = (operator1, operator2) => operatorPrecedences[operator1] >= operatorPrecedences[operator2]

function operate(operator, operand2, operand1) {
  switch (operator) {
    case '*': return operand1 * operand2
    case '/': return operand1 / operand2
    case '+': return operand1 + operand2
    case '-': return operand1 - operand2
    default: return 0
  }
}


const test = s => console.log(s, '=', evaluate(s))
test("1 + 2 * 5")
test("2*1 + 5*4*1 + 1")
test("2 * ( 2 + 1 ) / 4")
test("2 + 1*5/4 - 1")
test("(4 + 3) * 8 / 2 - 1")

const assert = require('assert')
assert.equal(evaluate('(4 + 3) * 8 / 2 - 1'), 27)

// also test with wrong precedence (like the given example output)
operatorPrecedences['/'] = 0
assert.equal(evaluate('(4 + 3) * 8 / 2 - 1'), 56)








/* the following was my first try, which hit a deadend, bcs I didn't take precedence into consideration at first

function evaluate2(expression, from=0) {
  let subExpression = { operand1: 0, operator: null, operand2: null }
  const subExpressionStack = [subExpression]
  // we calculate each subExpression as we scan through chars of the main complex expression, and whenever we reach a parantheses we
  // add a new subExpression to our expressionStack, pausing the old subExpression (like recursive evaluation)
  

  // the following way of scanning is a cooler way, but since it requires extra loops, we use the boring 'from' arg
  // for (const [i, char] of Object.entries(expression)) {

  // for (let i=from; i<=expression.length; i++) {
  //   const char = expression[i]

  for (const char of expression) {
    switch (char) {
      case ' ':
        continue
      case '*':
      case '/':
      case '+':
      case '-':
        subExpression.operator = char
        break
      case '(':
        subExpression = { operand1: 0, operator: null, operand2: null }
        subExpressionStack.push(subExpression)
        break
      default: // for all numbers and ')' chars (which are sub-expression end, and we treat them as numbers after calculation.)
        let number
        if (char === ')') {
          number = subExpression.operand1
          subExpressionStack.pop()
          subExpression = subExpressionStack[subExpressionStack.length-1]
        } else {
          number = +char
        }
        if (subExpression.operator) {
          // this number is the right-side operand for the previously stored operator
          subExpression.operand2 = number
          subExpression.operand1 = calcOperator(subExpression.operand1, subExpression.operator, operand2)
          subExpression.operator = null
        } else {
          // this number is the left-side operand for the possible next operator or a single number without any operator (same as result)
          subExpression.operand1 = number
        }
    }
  }

  return subExpression.operand1
}
function calcOperator(operand1, operator, operand2) {
  switch (operator) {
    case '*': return operand1 * operand2
    case '/': return operand1 / operand2
    case '+': return operand1 + operand2
    case '-': return operand1 - operand2
  }
}


*/