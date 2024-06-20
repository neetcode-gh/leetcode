function getDistance(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function minCostConnectPoints(points: number[][]): number {
    const n = points.length;
    const visited = new Set<string>();
    const minHeap = new MinPriorityQueue({ priority: (a) => a[2] });

    visited.add(points[0].join(','));
    for (let point of points) {
        if (visited.has(point.join(','))) continue;
        
        minHeap.enqueue([points[0], point, getDistance(points[0], point)]);
    }

    let result = 0;
    while (visited.size < n) {
        const { element: minEdge } = minHeap.dequeue();
        if (visited.has(minEdge[1].join(','))) continue;

        visited.add(minEdge[1].join(','));
        result += minEdge[2];

        for (let point of points) {
            if (visited.has(point.join(','))) continue;
            minHeap.enqueue([minEdge[1], point, getDistance(minEdge[1], point)]);
        }
    }

    return result;
};
