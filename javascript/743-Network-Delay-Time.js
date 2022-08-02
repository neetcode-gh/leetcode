/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {

	let   time_taken     = 0;
	const visited_set    = new Set();
	const min_heap       = new MinPriorityQueue();
	const node_edge_cost = new Map();

	for (const [node, edge, cost] of times) {
		let edges = [];
		if (node_edge_cost.has(node)) {
			edges = node_edge_cost.get(node);
		}
		edges.push([edge, cost]);
		node_edge_cost.set(node, edges);
	}

	min_heap.enqueue([k, 0], 0);

	while (min_heap.size()) {
        
		const [node, cost] = min_heap.dequeue().element;

		if (visited_set.has(node)) continue;
		visited_set.add(node);

		time_taken = Math.max(cost, time_taken);

		const node_edges = node_edge_cost.get(node) || [];

		for (const [edge_node, edge_cost] of node_edges) {
			if (!visited_set.has(edge_node)) {
				min_heap.enqueue([edge_node, edge_cost + cost], edge_cost + cost);
			}
		}
	}

	return visited_set.size === n ? time_taken : -1;
};
