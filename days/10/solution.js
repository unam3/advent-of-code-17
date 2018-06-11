"use strict";

const lengths = [3, 4, 1, 5];

// To achieve this, begin with a list of numbers from 0 to 255, a current position which begins at 0 (the first element in the list), a skip size (which starts at 0), and a sequence of lengths (your puzzle input). Then, for each length:
let list = [];
let i = 0;

//while (i < 256) {
while (i < 5) {
    list[i] = i;

    i += 1;
}

let currentPosition = 0
let skipSize = 0

//The list is circular; if the current position and the length try to reverse elements beyond the end of the list, the operation reverses using as many extra elements as it needs from the front of the list. If the current position moves past the end of the list, it wraps around to the front.
lengths.forEach(
    length => {
        // Lengths larger than the size of the list are invalid.
        if (length > list.length) return

        const delta = list.length - (currentPosition + length - 1)

        //Reverse the order of that length of elements in the list, starting with the element at the current position.
        if (delta >= 0) {
            const reversedSection = list.slice(currentPosition, skipSize + length).reverse()

            const beforeReversed = list.slice(0, currentPosition)

            const afterReversed = list.slice(skipSize + length)

            list = [...beforeReversed, ...reversedSection, ...afterReversed]
        } else {
            const positiveDelta = Math.abs(delta)

            const rightSublist = list.slice(currentPosition)

            const leftSublist = list.slice(0, positiveDelta + 1)

            console.log(rightSublist, leftSublist)

            const reversedSection = [...rightSublist, ...leftSublist].reverse()

            const notToReverseSublist = list.slice(positiveDelta, currentPosition)

            list = [
                ...reversedSection.slice(0, positiveDelta + 1),
                ...notToReverseSublist,
                ...reversedSection.slice(reversedSection.length - positiveDelta)
            ]
        }

        //Move the current position forward by that length plus the skip size.
        currentPosition = length + skipSize

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
//console.log(get(exampleInput))
