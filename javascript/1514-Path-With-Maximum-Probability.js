/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
var maxProbability = function(n, edges, succProb, start, end) {
    const genAdjList = () => {
        /***
        {
            0: [[1, 0.5], [2, 0.2]],
            1: [[0, 0.5], [2, 0.5]],
            2: [[1, 0.5], [0, 0.2]],
        }
        ***/
        let list = {};
        for(let i = 0; i < n; i++) {
            list[i] = [];
        }
        for(let i = 0;  i < edges.length; i++) {
            const [v1, v2] = edges[i];
            const p = succProb[i];
            list[v1].push([v2, p]);
            list[v2].push([v1, p]);
        }
            
        return list;
    }
    const graph = genAdjList();
    const queue = new MaxPriorityQueue();
    const visited = new Set();
    
    queue.enqueue([start, 1], 1);
    
    while(!queue.isEmpty()) {
        const [n1, p1] = queue.dequeue().element;
        if(visited.has(n1)) continue;
        visited.add(n1);
        if(n1 === end) return p1;
        
        for(const [n2, p2] of graph[n1]) {
            if(visited.has(n2)) continue;
            const val = p1 * p2;
            queue.enqueue([n2, val], val);
        }
    }
    if(visited.size !== n) return 0;
};
