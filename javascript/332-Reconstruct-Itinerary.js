/**
 * https://leetcode.com/problems/reconstruct-itinerary/
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = (tickets) => {
    tickets.sort();

    const graph = buildGraph(tickets);

    return dfs(tickets, graph);
};

const dfs = (tickets, graph, city = 'JFK', path = ['JFK']) => {
    const isBaseCase = (path.length === (tickets.length + 1));
    if (isBaseCase) return true;

    const queue = (graph.get(city) || []);

    const isEmpty = (queue.length === 0);
    if (isEmpty) return false;

    for (const nextCity of queue.slice()) {
        path.push(nextCity);
        queue.shift();

        if (dfs(tickets, graph, nextCity, path)) return path;

        path.pop();
        queue.push(nextCity);
    }

    return false;
};


const buildGraph = (tickets, graph = new Map()) => {
    for (const [ src, dst ] of tickets) {
        const edges = (graph.get(src) || []);

        edges.push(dst);
        graph.set(src, edges);
    }

    return graph;
}
