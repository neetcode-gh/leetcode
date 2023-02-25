function letterCombinations(digits: string): string[] {
    let res: string[] = [];

    const digitToChar = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'qprs',
        '8': 'tuv',
        '9': 'wxyz',
    };

    function backtrack(i: number, curStr: string) {
        if (curStr.length === digits.length) {
            res.push(curStr);
            return;
        }

        for (const c of digitToChar[digits[i]]) {
            backtrack(i + 1, curStr + c);
        }
    }

    if (digits) {
        backtrack(0, '');
    }

    return res;
}
