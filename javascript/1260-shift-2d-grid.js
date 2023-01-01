var shiftGrid = function(grid, k) {
    const M = grid.length, N = grid[0].length;
    
    let posToVal = (r, c) =>
        r * N + c;
    let valToPos = (v) =>
        [Math.floor(v / N), v % N];
    
    res = [];
    for(let i = 0; i < M; i++)
        res.push([]);
    for(let r = 0; r < M; r++)
        for(let c = 0; c < N; c++) {
            let newVal = (posToVal(r, c) + k) % (M * N);
            let newRC = valToPos(newVal);
            res[newRC[0]][newRC[1]] = grid[r][c];
        }
    return res;
};
