function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {
    const adjList = new Map<number, number[]>(
        Array.from({ length: numCourses }, (_, i) => [i, []]),
    );
    for (let [a, b] of prerequisites) {
        adjList.get(b).push(a);
    }

    const cache = new Map<number, Set<number>>();
    function dfs(node: number) {
        if (!cache.has(node)) {
            cache.set(node, new Set());

            for (let target of adjList.get(node)) {
                const result = dfs(target);
                for (let v of result) {
                    cache.get(node).add(v);
                }
            }
        }

        cache.get(node).add(node);
        return cache.get(node);
    }

    for (let i = 0; i < numCourses; i++) {
        dfs(i);
    }

    return queries.map(([a, b]) => cache.get(b).has(a));
};
