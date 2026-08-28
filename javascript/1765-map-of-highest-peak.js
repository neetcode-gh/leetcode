/**
 * Graph | BFS
 * Time O(n*m) | Space O(n*m)
 * https://leetcode.com/problems/map-of-highest-peak/
 * @param {number[][]} isWater
 * @return {number[][]}
 */
var highestPeak = function(isWater) {
        
    isWater = isWater.map((row) => {
        return row.map((cell) => {
            if (!cell) return 1;
            return 0;
        });
    });

    const q = new Queue();
    const ROW = isWater.length;
    const COL = isWater[0].length;
    const directions = [[1,0], [-1,0], [0,1], [0,-1]];
    const visited = new Set();

    const isOutOfBound = (row, col) => {
        if (row === ROW) return true;
        if (col === COL) return true;
        if (row < 0) return true;
        if (col < 0) return true;

        return false;
    } 

    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (!isWater[i][j]) {
                q.enqueue([i,j]);
                visited.add(`${i}-${j}`);
            };
        }
    }

    while (!q.isEmpty()) {

        const [row, col] = q.dequeue();
        const hash = `${row}-${col}`;

        for (let i = 0; i < directions.length; i++) {
            
            const [rd, cd] = directions[i];
            const nextRow = row+rd;
            const nextCol = col+cd;
            const hash = `${nextRow}-${nextCol}`;

            if (isOutOfBound(nextRow, nextCol)) continue;
            if (visited.has(hash)) continue;

            visited.add(hash);
            isWater[nextRow][nextCol] = isWater[row][col] + 1;
            q.enqueue([nextRow, nextCol]);
        }
    }

    return isWater;
};
