function swimInWater(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;

    const heap = new MinPriorityQueue({ priority: (a) => a[0] });
    const visited = Array.from({ length: m }, () => Array.from({ length: n }, () => false));
    heap.enqueue([grid[0][0], 0, 0]);
    
    while (!heap.isEmpty()) {
        const { element: [weight, r, c ] } = heap.dequeue();

        if (r === m - 1 && c === n - 1) return weight;

        const edges = [
            [r - 1, c],
            [r, c + 1],
            [r + 1, c],
            [r, c - 1],
        ];
        for (let [nr, nc] of edges) {
            if (nr < 0 || nr >= m) continue;
            if (nc < 0 || nc >= n) continue;
            if (visited[nr][nc]) continue;

            visited[nr][nc] = true;
            heap.enqueue([Math.max(grid[nr][nc], weight), nr, nc]);
        }
    }

    return 0;
};
