function generate(numRows: number): number[][] {
    let res = [[1]];

    for (let i = 0; i < numRows - 1; i++) {
        let temp = [0, ...res.at(-1), 0];
        let row = [];
        for (let j = 0; j < res.at(-1).length + 1; j++) {
            row.push(temp[j] + temp[j + 1]);
        }
        res.push(row);
    }
    return res;
}
