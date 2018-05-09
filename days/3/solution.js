// code doesn't designed to work for n = 1

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
        halfSqrtRounded : halfSqrtRounded + 1
}


// how many digits in square
const getSquareNumbersCount = (squareNumber) => (squareNumber - 1) * 8

//const getSquareSideNumbersCount = (squareNumbersCount) => (squareNumbersCount / 4) + 1 // whole side
const getSquareSideNumbersCount = (squareNumbersCount) => squareNumbersCount / 4


const getBiggestNumberInSquare = (squareNumber) => Math.pow((2 * (squareNumber - 1) + 1), 2)


const getNumberPositionInSquare = (number, squareNumbersCount, biggestNumberInSquare, sideNumbersCount) => {
    const numberPosition = squareNumbersCount - (biggestNumberInSquare - number)

    // shift because of the right side first number is actually biggest number in square
    const shiftPosition = numberPosition < sideNumbersCount

    return {
        shiftPosition,
        number: shiftPosition ? (numberPosition + 1) : numberPosition
    }
}


const getStepsToSideMiddle = (numberPositionInSquare, sideNumbersCount, shiftPosition) => {
    const numberPositionInSquareSide = numberPositionInSquare / sideNumbersCount

    console.log('numberPositionInSquareSide', numberPositionInSquareSide)

    // if number isn't the second ending number in the right side and numberPositionInSquareSide hasn't fractional part 
    // then n located at the square corner
    if (!(shiftPosition) && !String(numberPositionInSquareSide).split('.')[1]) {
        return sideNumbersCount / 2
    } else {
        // 0 right, 1 top, 2 left, 3 and 4 floor (except biggest in the side)
        let side = Math.floor(numberPositionInSquareSide)

        if (side === 4) side = 3

        console.log('side', side)

        return Math.round(
            Math.abs(
                (sideNumbersCount / 2) + (shiftPosition ? 1 : 0) -
                (!(shiftPosition && numberPositionInSquare === sideNumbersCount) ?
                    numberPositionInSquareSide - side
                    : 1
                ) * sideNumbersCount
            )
        )
    }

    return stepsToSideMiddle
}

const getStepsToAccessPort = (n) => {
    console.log('n', n)

    // let's find out the number of numbers square in which our number is
    const squareNumber = getSquareNumber(n)
    console.log('squareNumber', squareNumber)

    // let's find out position of the number relative to the square side middle
    const squareNumbersCount = getSquareNumbersCount(squareNumber)
    console.log('squareNumbersCount', squareNumbersCount)

    const sideNumbersCount = getSquareSideNumbersCount(squareNumbersCount)
    console.log('sideNumbersCount', sideNumbersCount)

    const biggestNumberInSquare = getBiggestNumberInSquare(squareNumber)
    console.log('biggestNumberInSquare', biggestNumberInSquare)

    const {number: numberPositionInSquare, shiftPosition} = getNumberPositionInSquare(
        n,
        squareNumbersCount,
        biggestNumberInSquare,
        sideNumbersCount
    )
    console.log('numberPositionInSquare', numberPositionInSquare, 'shiftPosition', shiftPosition)

    const stepsToSideMiddle = getStepsToSideMiddle(numberPositionInSquare, sideNumbersCount, shiftPosition)
    console.log('stepsToSideMiddle', stepsToSideMiddle)

    return stepsToSideMiddle + (squareNumber - 1)
}

//console.log('stepsToAccessPort', getStepsToAccessPort())
