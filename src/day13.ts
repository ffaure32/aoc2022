import "./extensions.ts";

function findIndex(validLines: any[], expectedValue: number): number {
    return validLines.findIndex(a => a.length === 1 && a[0].length === 1 && a[0][0] === expectedValue)+1;
}

export function orderLines(lines: Array<string>) {
    const dividers = [2,6];
    dividers.map(d => `[[${d}]]`).forEach(d => lines.push(d));
    const validLines = lines.filter(l => l !== '')
        .map(l => eval(l))
        .sort((left, right) => -compare(left, right));
    return dividers.reduce((prod, divider) => {return prod * findIndex(validLines, divider)}, 1);
}

export function sumValidLinesIndex(lines: Array<string>) {
    const validIndexes = new Array<number>();
    let index = 0;
    for (let i = 0; i < lines.length; i++) {
        index++;
        const left = eval(lines[i++]);
        const right = eval(lines[i++]);
        if(compare(left, right)>0) {
            validIndexes.push(index);
        }
    }
    return validIndexes.sum();
}
export function compare(left: Array<Object>, right: Array<Object>) {
    let result = 0;
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
        const leftValue = left[i];
        const rightValue = right[i];
        if(leftValue instanceof Array) {
            if(rightValue instanceof Array) {
                result = compare(leftValue, rightValue);
            } else {
                result = compare(leftValue, [rightValue])
            }
        } else if (rightValue instanceof Array) {
            result = compare([leftValue], rightValue);
        } else {
            result = Number(rightValue) - Number(leftValue);
        }
        if(result != 0) {
            return result;
        }
    }
    if(result == 0) {
        result = right.length - left.length;
    }
    return result;

}