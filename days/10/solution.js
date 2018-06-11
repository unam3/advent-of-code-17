"use strict";

const lengths = [3, 4, 1, 5];
//const lengths = str.split(',').map(str => parseInt(str));

// To achieve this, begin with a list of numbers from 0 to 255, a current position which begins at 0 (the first element in the list), a skip size (which starts at 0), and a sequence of lengths (your puzzle input). Then, for each length:
let list = [];
let i = 0;

//while (i < 256) {
while (i < 5) {
    list[i] = i;

    i += 1;
}

//console.log(list)

let currentPosition = 0
let skipSize = 0

//The list is circular; if the current position and the length try to reverse elements beyond the end of the list, the operation reverses using as many extra elements as it needs from the front of the list. If the current position moves past the end of the list, it wraps around to the front.
lengths.forEach(
    length => {
        //console.log('current length is', length)
        //console.log('element in current position', currentPosition, ' is', list[currentPosition])

        // Lengths larger than the size of the list are invalid.
        if (length > list.length) return

        const delta = list.length - (currentPosition + length)

        // not a word about zero length in a task; legth of 1 is noop
        if (length !== 0 && length !== 1) {
            //Reverse the order of that length of elements, starting with the element at the current position.
            if (delta >= 0) {
                const reversedSection = list.slice(currentPosition, currentPosition + length).reverse()

                const beforeReversed = list.slice(0, currentPosition)

                const afterReversed = list.slice(currentPosition + length)

                list = [...beforeReversed, ...reversedSection, ...afterReversed]
            } else {
                const positiveCorrectedDelta = Math.abs(delta)

                const rightSublist = list.slice(currentPosition)

                const leftSublist = list.slice(0, positiveCorrectedDelta)

                const reversedSection = [...rightSublist, ...leftSublist].reverse()

                //console.log(rightSublist, leftSublist, reversedSection)

                const notToReverseSublist = list.slice(positiveCorrectedDelta, currentPosition)

                const newLeftSection = reversedSection.slice(reversedSection.length - (positiveCorrectedDelta))

                const newRightSection = reversedSection.slice(0, reversedSection.length - (positiveCorrectedDelta))

                //console.log(
                //    positiveCorrectedDelta,
                //    newLeftSection,
                //    notToReverseSublist,
                //    newRightSection
                //)

                list = [
                    ...newLeftSection,
                    ...notToReverseSublist,
                    ...newRightSection
                ]
            }
        }

        //Move the current position forward by that length plus the skip size.
        currentPosition += length + skipSize

        if (currentPosition >= list.length) {
            currentPosition = currentPosition - list.length
        }

        //Increase the skip size by one.
        skipSize += 1

        console.log(currentPosition, skipSize, JSON.stringify(list))
    }
)

//Once this process is complete, what is the result of multiplying the first two numbers in the list?
console.log(list[0] * list[1])
