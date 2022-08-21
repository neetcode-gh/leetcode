function uniquePaths(m, n) {
    let row = new Array(n).fill(1);

    for (let i = 0; i < m - 1; i++) {
        let newRow = new Array(n).fill(1);

        for (let j = n - 2; j > -1; j--) {
            newRow[j] = newRow[j + 1] + row[j];
        }

        row = newRow;
    }

    return row[0];
}
