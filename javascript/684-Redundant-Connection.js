/**
 * @param {number[][]} edges
 * @return {number[]}
 */
 var findRedundantConnection = function(edges) {
	const parents = [];
	const rank = new Array(edges.length).fill(1);
	for (let i = 0; i < edges.length; i++) {
		parents[i] = i;
	};

  function find(n) {
    let parent = parents[n];
    while (parent !== parents[parent]) {
			parents[parent] = parents[parents[parent]];
      parent = parents[parent];
    }
    return parent;
  }

	function join(vertex1, vertex2) {
		const parent1 = find(vertex1);
		const parent2 = find(vertex2);
		if (parent1 == parent2) return false;
		
		if (rank[parent1] > rank[parent2]) {
			parents[parent2] = parent1;
      rank[parent1] += rank[parent2];
		} else {
      parents[parent1] = parent2;
      rank[parent2] += rank[parent1];
		};
		return true;
	};

	for (const edge of edges) {
		if (!join(edge[0]-1, edge[1]-1)) return edge;
	};
};