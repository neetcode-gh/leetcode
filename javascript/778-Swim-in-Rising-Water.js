/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
    
    let   time_passed = 0;
    const visit_set   = new Set();
    const min_heap    = new MinPriorityQueue();

    const max_rows   = grid.length - 1;
    const max_cols   = grid[0].length - 1;
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    min_heap.enqueue([0, 0], grid[0][0]);

    while (min_heap.size()) {

        const node   = min_heap.dequeue();
        const cost   = node.priority;
        const [x, y] = node.element;

        visit_set.add(grid[x][y]);
        time_passed = Math.max(cost, time_passed);

        if (x === max_rows && y === max_cols) return time_passed;

        for (const direction of directions) {
            let [new_x, new_y]  = direction;
            new_x          += x;
            new_y          += y;

            if (new_x > max_rows || new_y > max_cols || new_x < 0 || new_y < 0 || visit_set.has(grid[new_x][new_y])) continue;
            min_heap.enqueue([new_x, new_y], grid[new_x][new_y]);
        }
    }
};
