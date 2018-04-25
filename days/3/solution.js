const puzzleInput = 312051

// найти на какой стороне (top/right/bottom/left) распологается число
// найти положение ~ центра стороны (количество шагов до центра)
// + найти положение ~ 1
// сложить расстояния

const n = 46

console.log('n', n)

/*
square number   range of numbers    sqrt of the max number in range
first                   1                       1
second                  2-9                     3
third                   10-25                   5
fourth                  26-49                   7
fifth                   50-81                   9
sixth                   82-121                  11
seventh                 122-169                 13
*/

const getSquareNumber = (n) => {
    const halfSqrt = Math.sqrt(n) / 2

    const halfSqrtRounded = Math.round(halfSqrt)

    // for the south-east corner digit
    return (halfSqrt - Math.floor(halfSqrt)) === 0.5 ? 
        halfSqrtRounded - 1 : halfSqrtRounded
}

const squareNumber = getSquareNumber(n)

console.log('squareNumber', squareNumber)

// how many digits in square
// also this is the number of steps to the middle
const numberOfSquareDigits = (squareNumber) => squareNumber * 8

const nosd =  numberOfSquareDigits(squareNumber)

console.log('nosd', nosd)

const digitsAtSide = (nosd) => nosd / 4

const dat = digitsAtSide(nosd)

console.log('dat', dat)

const biggestNumberInSquare = (squareNumber) => Math.pow((2 * squareNumber + 1), 2)

const bnis = biggestNumberInSquare(squareNumber)

console.log('bnis', bnis)

const numberInSquare = nosd - (bnis - n)

console.log('numberInSquare', numberInSquare)

const contin = numberInSquare / dat

console.log('contin', contin)

// 0 right, 1 top, 2 left, 3 and 4 floor (except biggest in the side)
let side = Math.floor(contin)

if (side = 4) side = 3

console.log('side', side)

// check this and below
const sidePosition = contin - side

console.log('sidePosition', sidePosition)

let stepsToTheMiddle = dat / sidePosition

// SE number
if (sidePosition === 1) {
    stepsToTheMiddle = dat / 2
} else if (sidePosition < 0.5) {

}

console.log('stepsToTheMiddle', stepsToTheMiddle)
