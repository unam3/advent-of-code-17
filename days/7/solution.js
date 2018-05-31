"use strict";

const exampleInput = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`

const getBottomProgramName = (input) => {
    const stringArray = input.split('\n')

    const branchesWithChildren = stringArray.filter(
        string => string.includes('->')
    )

    const branchesWithoutWeight = branchesWithChildren.map(
        branchWithChildren => {
            const [programNameWithWeight, children] = branchWithChildren.split('-> ')

            return [
                programNameWithWeight.split(' ')[0],
                children.split(', ')
            ]
        }
    )

    /*
    [ [ 'fwft', [ 'ktlj', 'cntj', 'xhth' ] ],
      [ 'padx', [ 'pbga', 'havc', 'qoyq' ] ],
      [ 'tknk', [ 'ugml', 'padx', 'fwft' ] ],
      [ 'ugml', [ 'gyxo', 'ebii', 'jptl' ] ] ]
    */
    //return branchesWithoutWeight

    const [rootProgramName] = branchesWithoutWeight.find(
        ([programName, programsAbove]) =>
			!branchesWithoutWeight.find(
				([anotherProgramName, anotherProgramsAbove]) =>
					anotherProgramsAbove.indexOf(programName) !== -1
			)
    )

    return rootProgramName
}

console.log(getBottomProgramName(exampleInput))
