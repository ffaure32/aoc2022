const scores = new Map<string, number>([
    ["A X", 3+1],
    ["A Y", 6+2],
    ["A Z", 0+3],
    ["B X", 0+1],
    ["B Y", 3+2],
    ["B Z", 6+3],
    ["C X", 6+1],
    ["C Y", 0+2],
    ["C Z", 3+3],
]);
const scoresPart2 = new Map<string, number>([
    ["A X", 0+3],
    ["A Y", 3+1],
    ["A Z", 6+2],
    ["B X", 0+1],
    ["B Y", 3+2],
    ["B Z", 6+3],
    ["C X", 0+2],
    ["C Y", 3+3],
    ["C Z", 6+1],
]);

function computeScore(result: Array<string>, scoresToMap: Map<string, number>) {
    return result.filter((s) => s !== '')
        .map((s) => scoresToMap.get(s) || 0)
        .reduce((acc, current) => {return acc + current;}, 0);
}

export function computePartOne(result:Array<string>) {
    return computeScore(result, scores);
}
export function computePartTwo(result:Array<string>) {
    return computeScore(result, scoresPart2);
}
