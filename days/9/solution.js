"use strict";

const getTotalScore = (str) => {
	let i = 0
	let level = 0
	let groupsCount = 0
	let score = 0
	let garbageAhead = false

	
	let symbol = str[i]

	while (typeof symbol !== 'undefined') {
		//console.log(symbol, level)

		if (symbol === '{' && !garbageAhead) {
			level += 1

			groupsCount += 1
			
			score += level
		} else if (symbol === '}' && !garbageAhead) {
			level -= 1
		} else if (symbol === '<' && !garbageAhead) {
			garbageAhead = true
		} else if (symbol === '>' && garbageAhead) {
			garbageAhead = false
		} else if (symbol === '!' && garbageAhead) {
			// skip next symbol
			i += 1
		}

		i += 1
		
		symbol = str[i]
	}

	return {groupsCount, score}
}

const garbageSamples = [
    '<>',
    '<rand chars>',
    '<<<<>',            // because the extra < are ignored.
    '<{!>}>',           // because the first > is canceled.
    '<!!>',             // because the second ! is canceled, allowing the > to terminate the garbage.
    '<!!!>>',           // because the second ! and the first > are canceled.
    '<{o"i!a,<{i<a>'    // which ends at the first >.
]

const groupWithGarbage = '{' + garbageSamples.join(',') + '}'


const streamSamples = [
    //'{{<a>,{},{<a>}},{<a>},{<a>},{<a>}}',    // 5 groups.
    '{}',                           // 1 group.
    '{{{}}}',                       // 3 groups.
    '{{},{}}',                      // also 3 groups.
    '{{{},{},{{}}}}',               // 6 groups.
    '{<{},{},{{}}>}',               // 1 group (which itself contains garbage).
    '{<a>,<a>,<a>,<a>}',            // 1 group.
    '{{<a>},{<a>},{<a>},{<a>}}',    // 5 groups.
    // -> '{{},{},{},{}}',
    '{{<!>},{<!>},{<!>},{<a>}}'     // 2 groups (since all but the last > are canceled).
    // -> '{{<},{<},{<},{<a>}}'
    // -> '{{}}'
]


const scoreCountSamples = [
    ['{}', 1],                              //score of 1.
    ['{{{}}}', 6],                          //score of 1 + 2 + 3 = 6.
    ['{{},{}}', 5],                         //score of 1 + 2 + 2 = 5.
    ['{{{},{},{{}}}}', 16],                 //score of 1 + 2 + 3 + 3 + 3 + 4 = 16.
    ['{<a>,<a>,<a>,<a>}', 1],               //score of 1.
    ['{{<ab>},{<ab>},{<ab>},{<ab>}}', 9],   //score of 1 + 2 + 2 + 2 + 2 = 9.
    ['{{<!!>},{<!!>},{<!!>},{<!!>}}', 9],   //score of 1 + 2 + 2 + 2 + 2 = 9.
    ['{{<a!>},{<a!>},{<a!>},{<ab>}}', 3],   //score of 1 + 2 = 3.
]


const doTests = () => {
    console.log(
        'all garbage samples was processed correctly:',
        getTotalScore(groupWithGarbage).groupsCount === 1
    )

    console.log(
        'all stream samples was processed correctly:',
        streamSamples.map(
            stream => getTotalScore(stream).groupsCount
        ).join(', ') === '1, 3, 3, 6, 1, 1, 5, 2'
    )

	console.log(
		'all scrore count samples was processed correctly:',
		scoreCountSamples.filter(
			([stream, referenceScore]) =>
				getTotalScore(stream).score !== referenceScore
			).length === 0
	)
}

doTests()
