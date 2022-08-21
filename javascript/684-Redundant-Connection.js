var findRedundantConnection = function (edges) {
    let n = edges.length,
        par = new Array(n + 1).fill(0).map((_, index) => index);
    let rank = new Array(n + 1).fill(1);

    function findParent(node) {
        let p = par[node];
        while (p != par[p]) {
            par[p] = par[par[p]];
            p = par[p];
        }
        return p;
    }

    function union(n1, n2) {
        let p1 = findParent(n1),
            p2 = findParent(n2);
        if (p1 == p2) return false;

        if (rank[p1] > rank[p2]) {
            par[p2] = p1;
            rank[p1] += rank[p2];
        } else {
            par[p1] = p2;
            rank[p2] += rank[p1];
        }
        return true;
    }

    for (let [n1, n2] of edges) {
        if (!union(n1, n2)) return [n1, n2];
    }
};
