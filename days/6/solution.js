"use strict";

// apply to original input string:
//    .split('\t')
//    .map(string => parseInt(string));

const exampleInput = [0, 2, 7, 0]

const getMostBlocksBank = (memoryAreaBanks) =>
    memoryAreaBanks.map(
            (bankBlocks, index) => ({blocks: bankBlocks, index})
        ).sort(
            (a, b) => b.blocks - a.blocks
        )[0]

const redistribute = (memoryAreaBanks) => {
    const mostBlocksBank = getMostBlocksBank(memoryAreaBanks)

    let blocksToRedistribute = mostBlocksBank.blocks

    // removes all of the blocks from the selected bank
    const memoryAreaBanksTmp = [...memoryAreaBanks]

    memoryAreaBanksTmp[mostBlocksBank.index] = 0

    // moves to the next (by index) memory bank and inserts one of the blocks
    let blockToRedistributeIndex = mostBlocksBank.index + 1 

    while (blocksToRedistribute) {
        let bankBlocks = memoryAreaBanksTmp[blockToRedistributeIndex]

        if (typeof bankBlocks !== 'number') {
            blockToRedistributeIndex = 0
        }

        memoryAreaBanksTmp[blockToRedistributeIndex] += 1

        blocksToRedistribute -= 1

        blockToRedistributeIndex += 1
    }

    return memoryAreaBanksTmp
}

const getRedistributionsCount = (memoryAreaBanks) => {
    const initialHash = JSON.stringify(memoryAreaBanks)

    let redistributionHash

    let redistributedMemoryAreaBanks
    
    let redistributionsCount = 0

    const redistributions = {}

    while (!redistributions[redistributionHash]) {
        // skips initial empty hash
        if (redistributionHash) redistributions[redistributionHash] = true

        redistributedMemoryAreaBanks = redistribute(redistributedMemoryAreaBanks || memoryAreaBanks)

        redistributionHash = JSON.stringify(redistributedMemoryAreaBanks)

        redistributionsCount += 1
    }

    return redistributionsCount
}

console.log(getRedistributionsCount(exampleInput))
