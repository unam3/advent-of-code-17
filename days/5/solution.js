"use strict";

const input = `0
3
0
1
-3`

const offsets = input.split('\n')
    .map(
        offsetStr => parseInt(offsetStr)
    )

//// in the modern nodejs we doesn't have tco, so code below will crash
//const countStepsToExit = (offsets, offset, stepsCount = 0) => {
//    const instruction = offsets[offset]
//
//    if (typeof instruction !== 'undefined') {
//        offsets[offset] += 1
//
//        console.log(stepsCount, offset, instruction)
//
//        return countStepsToExit(offsets, offset + instruction, stepsCount + 1)
//    } else {
//        return stepsCount
//    }
//}

// implents same idea with loop
let offset = 0
let stepsCount = 0

const countStepsToExit = () => {
    const instruction = offsets[offset]

    offsets[offset] += 1

    offset += instruction
}

while (typeof offsets[offset] !== 'undefined') {
    countStepsToExit()
    
    stepsCount += 1
}

console.log('stepsCount:', stepsCount)
